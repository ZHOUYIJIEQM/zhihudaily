<template>
  <div class="daily-article">
    <div class="daily-article-title">{{data.title}}</div>
    <div class="daily-article-content" v-html="data.body"></div>
    <div class="daily-comments" v-show="comments.length">
      <div class="daily-comment" v-for="comment in comments">
        <div class="daily-comment-avatar">
          <img :src="comment.avatar">
        </div>
        <div class="daily-comment-content">
          <div class="daily-comment-name">{{comment.author}}</div>
          <div class="daily-comment-time" v-time="comment.time"></div>
          <div class="daily-comment-text">{{comment.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Time from '../directives/time.js'
  import $ from '../libs/util.js'

  export default {
    directives: {Time},
    props: {
      id: {
        type: Number,
        default: 0
      }
    },
    data(){
      return {
        data: [],
        comments: [],
        /* data结构, 其中body是html
         [
          {
           "body": "<div class=\"main-wrap content-wrap\"></div>",
           "image_source": "Myriams-Fotos / CC0",
           "title": "体面提出和办理离职全流程指南",
           "image": "https://pic1.zhimg.com/v2-b0402f8a0bed2c3f9cb2106b80fbf3b8.jpg",
           "share_url": "http://daily.zhihu.com/story/9710422",
           "js": [],
           "ga_prefix": "042109",
           "images": [
            "https://pic3.zhimg.com/v2-6aaa50bf9242cbf7afe569ecfba88c06.jpg"
           ],
           "type": 0,
           "id": 9710422,
           "css": [
            "http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3"
           ]
          }
         ]
        */
        /* comments结构:
          [
           {
            "comments": 
             [
              {
               "author": "Imagineer",
               "content": "照顾到他人的感受，你就是个体面人。",
               "avatar": "http://pic1.zhimg.com/da8e974dc_im.jpg",
               "time": 1555830072,
               "id": 33108992,
               "likes": 1
              },
              {
               "author": "Summer",
               "content": "离职脱密期六个月如何潇洒？",
               "avatar": "http://pic2.zhimg.com/521b785d7739dc9b7c3433c3212444b1_im.jpg",
               "time": 1555820673,
               "id": 33108817,
               "likes": 0
              },
              {
               "author": "陈铭鸿-",
               "content": "小编这是想干嘛狗头",
               "avatar": "http://pic2.zhimg.com/033da493d_im.jpg",
               "time": 1555819671,
               "id": 33108776,
               "likes": 3
              },
              {
               "author": "好人",
               "content": "赞f**k you money",
               "avatar": "http://pic2.zhimg.com/69fa87c50d86b39058f7bbe724d02ad9_im.jpg",
               "time": 1555817114,
               "id": 33108716,
               "likes": 1
              }
             ]
           }
          ]
        */
      }
    },
    methods: {
      // 获取文章
      getArticle(){
        $.ajax.get('news/'+this.id)
        .then(res=>{
          // console.log('文章\n', JSON.stringify(res, null, ' '))
          res.body = res.body
            .replace(/src="https:\/\/pic/g, 'src="'+$.imgPath+'https://pic');
          res.body = res.body
            .replace(/src="http:\/\/pic/g, 'src="'+$.imgPath+'http://pic');
          this.data = res;
          window.scrollTo(0, 0);
          this.getComments();
        })
        .catch(()=>{
          console.log('文章获取出错！');
          alert('文章获取出错！');
        })
      },
      // 获取短评论
      getComments(){
        this.comments = [];
        $.ajax.get('story/'+this.id+'/short-comments')
        .then(res=>{
          // console.log('短评\n', JSON.stringify(res, null, ' '))
          this.comments = res.comments.map(comment=>{
            comment.avatar = $.imgPath + comment.avatar;
            return comment;
          })
        })
        .catch(()=>{
          console.log('短评获取出错！');
          alert('短评获取出错！')
        })
      },
    },
    watch: {
      id(val){
        if(val){
          this.getArticle();
        }
      }
    }
  }
</script>