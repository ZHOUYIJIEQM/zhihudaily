<template>
  <div class="daily">
    <!-- 左侧选项 -->
    <div class="daily-menu">
      <div class="daily-menu-item"
        :class="{on: type==='recommend'}"
        @click="handleToRecommend()"
      >每日推荐</div>
      <div class="daily-menu-item"
        :class="{on: type==='sections'}"
        @click="clickSections()"
      >日报栏目</div>
      <ul v-show="showSections">
        <li 
          v-for="item in sections"
          :class="{on: item.id===sectionsId && type==='sections'}"
          :title="item.name"
          @click="handleToSections(item.id)"> 
          <a>
            <div class="imgSec"><img :src="imgPath+item.thumbnail"></div>
            <span>{{item.name}}</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- 中间文章列 -->
    <div class="daily-list" ref="list">
      <!-- 每日推荐 -->
      <template v-if="type==='recommend'">
        <div v-for="list in recommendList">
          <!-- recommendList 的结构, 对象数组, 包含每天的日期和文章组成的对象数组, 在data处查看-->
          <div class="daily-date">{{formatDay(list.date)}}</div>
          <Item
            v-for="item in list.stories"
            :data="item"
            :key="item.id"
            :class="{click: item.id===clickId}"
            @click.native="handleListClick(item.id)"
          ></Item>
        </div>
        <!-- 加载提示 -->
        <div v-if="recommendFirstTime" class="firsttime">{{recommendMsg}}</div>
      </template>
      <!-- 日报栏目 -->
      <template v-if="type==='sections'">
        <!-- sectionsList 的结构 data处查看-->
        <Item
          v-for="item in sectionsList"
          :data="item"
          :key="item.id"
          :class="{click: item.id===clickId}"
          @click.native="handleListClick(item.id)"
        ></Item>
        <!-- 加载提示 -->
        <div v-if="sectionsFirstTime" class="firsttime" >{{sectionsMsg}}</div>
      </template>
    </div>
    <!-- 右侧文章 -->
    <daily-article :id="articleId"></daily-article>
  </div>
</template>

<script>
  
  import $ from './libs/util.js'
  import Item from './components/item.vue'
  import dailyArticle from './components/daily-article.vue'

  export default {
    components: {Item, dailyArticle},

    data(){
      return {
        imgPath: $.imgPath,
        type: 'recommend',
        recommendFirstTime: true,
        recommendMsg: '向下滚动加载更多！',
        sectionsMsg: '请选择一个栏目!',
        sectionsFirstTime: true,
        showSections: false,
        sectionsId: 0,
        recommendList: [],
        sections: [],
        sectionsList: [],
        isLoading: false,
        todayTime: $.getTodayTime(),
        clickId: 0,
        articleId: 0,
        /* recommendList的结构
         [  
          {
           "date": "20190420",
           "stories": [
            {
             "images": [
              "https://pic4.zhimg.com/v2-bf2653876d97b46ac2c58746a0be7fbb.jpg"
             ],
             "type": 0,
             "id": 9710470,
             "ga_prefix": "042016",
             "title": "腾讯确认代理国行版\r\n Switch，可能是件天大的好事"
            },
            {
             "images": [
              "https://pic4.zhimg.com/v2-b47fadfb18cd089bd948f98a91538bdf.jpg"
             ],
             "type": 0,
             "id": 9710416,
             "ga_prefix": "042009",
             "title": "维生素 D 和钙片长期服用会致癌？我读着读着眼泪都快下来了"
            },
            {
             "images": [
              "https://pic1.zhimg.com/v2-5f3666f4db43ef85defe814eb02aa89c.jpg"
             ],
             "type": 0,
             "id": 9710442,
             "ga_prefix": "042007",
             "title": "明知常态化 996 没意义，为什么老板们还乐此不疲？"
            },
            {
             "images": [
              "https://pic2.zhimg.com/v2-bf552b0c9d4cbc6a306edce4efaa7459.jpg"
             ],
             "type": 0,
             "id": 9710378,
             "ga_prefix": "042006",
             "title": "瞎扯 · 如何正确地吐槽"
            }
           ]
          }
         ]
        */
        /* sectionsList 的结构
         [
          {
           "description": "看别人的经历，理解自己的生活",
           "id": 1,
           "name": "深夜惊奇",
           "thumbnail": "http://pic3.zhimg.com/91125c9aebcab1c84f58ce4f8779551e.jpg"
          },
          {
           "thumbnail": "https://pic2.zhimg.com/v2-bf552b0c9d4cbc6a306edce4efaa7459.jpg",
           "description": "随便扯扯，也能很有深度",
           "name": "瞎扯",
           "id": 2
          },
          {
           "thumbnail": "https://pic2.zhimg.com/v2-0b95036377f778ad2e2802b8b1735cf9.jpg",
           "description": "",
           "name": "这里是广告",
           "id": 19
          },
         ] 
        */
      }
    },
    methods: {
      // 切换到每日推荐
      handleToRecommend(){
        this.type = 'recommend';
        this.recommendFirstTime = true;
        this.recommendList = [];
        this.todayTime = $.getTodayTime();
        this.showSections = false;
        this.getRecommendList();
      },
      // 点击日报栏目, 展开/收缩列表
      clickSections(){
        this.type = 'sections';
        this.showSections = !this.showSections;
      },
      // 切换到日报栏目
      handleToSections(id){
        this.sectionsFirstTime = false;
        this.sectionsId = id;
        this.type = 'sections';
        this.recommendFirstTime = false;
        this.$refs.list.scrollTop = 0;
        this.getSectionsList()
      },
      // 获取每日推荐, 添加到数组
      getRecommendList(){
        this.isLoading = true;
        var day = 0;
        // 每天早上8点才更新今天的推荐
        if(Date.now()-this.todayTime<=28800000){
          day = $.prevDay(this.todayTime);
          this.todayTime = this.todayTime -86400000;
          // console.log(day, '8点前')
        }else{
          day = $.prevDay(this.todayTime+86400000);
          // console.log(day, '8点后')
        }
        console.log(day)
        $.ajax.get('news/before/'+day)
        .then(res=>{
          this.recommendList.push(res);
          // console.log('每日推荐\n',JSON.stringify(res, null, ' '));
          this.isLoading = false;
        })
        .catch(()=>{
          console.log('每日推荐文章获取出错');
          alert('每日推荐文章获取出错');
        })
      },
      // 获取日报栏目
      getSections(){
        $.ajax.get('sections').then(res=>{
          this.sections = res.data;
          // console.log('栏目\n', JSON.stringify(res.data, null, ' '));
        })
        .catch(()=>{
          console.log('日报栏目获取出错');
          alert('日报栏目获取出错');
        })
      },
      // 获取日报栏目对应的文章
      getSectionsList(){
        $.ajax.get('section/'+this.sectionsId)
        .then(res=>{
          // console.log(JSON.stringify(res.stories, null, ' '))
          this.sectionsList = res.stories;
        })
        .catch(()=>{
          console.log('日报栏目下的文章获取出错');
          alert('日报栏目下的文章获取出错');
        })
      },
      // 将 20190410 格式转为 2019年4月10日 这样的格式
      formatDay(date){
        return $.formatDay(date);
      },
      // 获取点击的文章id
      handleListClick(id){
        this.clickId = id;
        this.articleId = id;
      },
      // 滚动加载
      handleScroll(){
        const $list = this.$refs.list;
        this.recommendFirstTime = false;
        if(this.type==='sections' || this.isLoading){
          return;
        }
        if($list.scrollTop+document.body.clientHeight>=$list.scrollHeight){
          this.todayTime -= 86400000;
          this.getRecommendList();
        }
      },


    },
    mounted(){
      // 初始化调用
      this.getRecommendList();
      this.getSections();
      var othis = this;
      this.$refs.list.addEventListener('scroll', function scroll(){
        othis.handleScroll();
      });
      this.$refs.list.addEventListener('mousewheel', function scroll(){
        othis.handleScroll();
      });
    }
  }

</script>