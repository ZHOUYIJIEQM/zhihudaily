webpackJsonp([1],{NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("7+uW"),n=i("mtWM"),a=i.n(n),o={imgPath:"https://103.114.162.64:8011/img/",apiPath:"https://103.114.162.64:8010/",getTodayTime:function(){var t=new Date;return t.setHours(0),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),t.getTime()},prevDay:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Date.now(),e=new Date(t);return e.getFullYear()+""+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+(e.getDate()+1<10?"0"+(e.getDate()+1):e.getDate())},formatDay:function(t){return t.substr(0,4)+"年"+("0"===t.substr(4,2).substr(0,1)?t.substr(4,2).substr(1,1):t.substr(4,2))+"月"+("0"===t.substr(6,2).substr(0,1)?t.substr(6,2).substr(1,1):t.substr(6,2))+"日"}};o.ajax=a.a.create({baseURL:o.apiPath}),o.ajax.interceptors.response.use(function(t){return t.data});var c=o,r={props:{data:{type:Object}},data:function(){return{imgPath:c.imgPath}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("a",{staticClass:"daily-item"},[t.data.images?i("div",{staticClass:"daily-img"},[i("img",{attrs:{src:t.imgPath+t.data.images[0]}})]):t._e(),t._v(" "),i("div",{staticClass:"daily-title",class:{noImg:!t.data.images}},[t._v(t._s(t.data.title))])])},staticRenderFns:[]},m=i("VU/8")(r,l,!1,null,null,null).exports,d={getUnix:function(){return Date.now()},getTodayUnix:function(){var t=new Date;return t.setHours(0),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),t.getTime()},getYearUnix:function(){var t=new Date;return t.setMonth(0),t.setDate(1),t.setHours(0),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),t.getTime()},getLastDate:function(t){var e=new Date(t),i=e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1,s=e.getDate()<10?"0"+e.getDate():e.getDate();return e.getFullYear()+"-"+i+"-"+s},getFormatTime:function(t){var e=(this.getUnix()-t)/1e3;return e>=0&&e<60?"刚刚":e<3600?Math.floor(e/60)+"分钟前":e>=3600&&e<86400?Math.floor(e/3600)+"小时前":e>=86400&&e/86400<=31?Math.floor(e/86400)+"天前":this.getLastDate(t)}},u={directives:{Time:{bind:function(t,e){t.innerHTML=d.getFormatTime(1e3*e.value),t.__timeout__=setInterval(function(){t.innerHTML=d.getFormatTime(1e3*e.value)},6e4)},unbind:function(t,e){clearInterval(t.__timeout__),delete t.__timeout__}}},props:{id:{type:Number,default:0}},data:function(){return{data:[],comments:[]}},methods:{getArticle:function(){var t=this;c.ajax.get("news/"+this.id).then(function(e){e.body=e.body.replace(/src="http/g,'src="'+c.imgPath+"http"),e.body=e.body.replace(/src="https/g,'src="'+c.imgPath+"https"),t.data=e,window.scrollTo(0,0),t.getComments()}).catch(function(){console.log("文章获取出错！")})},getComments:function(){var t=this;this.comments=[],c.ajax.get("story/"+this.id+"/short-comments").then(function(e){t.comments=e.comments.map(function(t){return t.avatar=c.imgPath+t.avatar,t})}).catch(function(){console.log("短评获取出错！")})}},watch:{id:function(t){t&&this.getArticle()}}},h={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"daily-article"},[i("div",{staticClass:"daily-article-title"},[t._v(t._s(t.data.title))]),t._v(" "),i("div",{staticClass:"daily-article-content",domProps:{innerHTML:t._s(t.data.body)}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.comments.length,expression:"comments.length"}],staticClass:"daily-comments"},t._l(t.comments,function(e){return i("div",{staticClass:"daily-comment"},[i("div",{staticClass:"daily-comment-avatar"},[i("img",{attrs:{src:e.avatar}})]),t._v(" "),i("div",{staticClass:"daily-comment-content"},[i("div",{staticClass:"daily-comment-name"},[t._v(t._s(e.author))]),t._v(" "),i("div",{directives:[{name:"time",rawName:"v-time",value:e.time,expression:"comment.time"}],staticClass:"daily-comment-time"}),t._v(" "),i("div",{staticClass:"daily-comment-text"},[t._v(t._s(e.content))])])])}),0)])},staticRenderFns:[]},v={components:{Item:m,dailyArticle:i("VU/8")(u,h,!1,null,null,null).exports},data:function(){return{imgPath:c.imgPath,type:"recommend",recommendFirstTime:!0,recommendMsg:"向下滚动加载更多！",sectionsMsg:"请选择一个栏目!",sectionsFirstTime:!0,showSections:!1,sectionsId:0,recommendList:[],sections:[],sectionsList:[],isLoading:!1,todayTime:c.getTodayTime(),clickId:0,articleId:0}},methods:{handleToRecommend:function(){this.type="recommend",this.recommendFirstTime=!0,this.recommendList=[],this.todayTime=c.getTodayTime(),this.showSections=!1,this.getRecommendList()},clickSections:function(){this.type="sections",this.showSections=!this.showSections},handleToSections:function(t){this.sectionsFirstTime=!1,this.sectionsId=t,this.type="sections",this.recommendFirstTime=!1,this.$refs.list.scrollTop=0,this.getSectionsList()},getRecommendList:function(){var t=this;this.isLoading=!0;var e=c.prevDay(this.todayTime+864e5);c.ajax.get("news/before/"+e).then(function(e){t.recommendList.push(e),t.isLoading=!1}).catch(function(){console.log("每日推荐文章获取出错")})},getSections:function(){var t=this;c.ajax.get("sections").then(function(e){t.sections=e.data}).catch(function(){console.log("日报栏目获取出错")})},getSectionsList:function(){var t=this;c.ajax.get("section/"+this.sectionsId).then(function(e){t.sectionsList=e.stories}).catch(function(){console.log("日报栏目下的文章获取出错")})},formatDay:function(t){return c.formatDay(t)},handleListClick:function(t){this.clickId=t,this.articleId=t},handleScroll:function(){var t=this.$refs.list;this.recommendFirstTime=!1,"sections"===this.type||this.isLoading||t.scrollTop+document.body.clientHeight>=t.scrollHeight&&(this.todayTime-=864e5,this.getRecommendList())}},mounted:function(){this.getRecommendList(),this.getSections();var t=this;this.$refs.list.addEventListener("scroll",function(){t.handleScroll()}),this.$refs.list.addEventListener("mousewheel",function(){t.handleScroll()})}},g={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"daily"},[i("div",{staticClass:"daily-menu"},[i("div",{staticClass:"daily-menu-item",class:{on:"recommend"===t.type},on:{click:function(e){return t.handleToRecommend()}}},[t._v("每日推荐")]),t._v(" "),i("div",{staticClass:"daily-menu-item",class:{on:"sections"===t.type},on:{click:function(e){return t.clickSections()}}},[t._v("日报栏目")]),t._v(" "),i("ul",{directives:[{name:"show",rawName:"v-show",value:t.showSections,expression:"showSections"}]},t._l(t.sections,function(e){return i("li",{class:{on:e.id===t.sectionsId&&"sections"===t.type},attrs:{title:e.name},on:{click:function(i){return t.handleToSections(e.id)}}},[i("a",[i("div",{staticClass:"imgSec"},[i("img",{attrs:{src:t.imgPath+e.thumbnail}})]),t._v(" "),i("span",[t._v(t._s(e.name))])])])}),0)]),t._v(" "),i("div",{ref:"list",staticClass:"daily-list"},["recommend"===t.type?[t._l(t.recommendList,function(e){return i("div",[i("div",{staticClass:"daily-date"},[t._v(t._s(t.formatDay(e.date)))]),t._v(" "),t._l(e.stories,function(e){return i("Item",{key:e.id,class:{click:e.id===t.clickId},attrs:{data:e},nativeOn:{click:function(i){return t.handleListClick(e.id)}}})})],2)}),t._v(" "),t.recommendFirstTime?i("div",{staticClass:"firsttime"},[t._v(t._s(t.recommendMsg))]):t._e()]:t._e(),t._v(" "),"sections"===t.type?[t._l(t.sectionsList,function(e){return i("Item",{key:e.id,class:{click:e.id===t.clickId},attrs:{data:e},nativeOn:{click:function(i){return t.handleListClick(e.id)}}})}),t._v(" "),t.sectionsFirstTime?i("div",{staticClass:"firsttime"},[t._v(t._s(t.sectionsMsg))]):t._e()]:t._e()],2),t._v(" "),i("daily-article",{attrs:{id:t.articleId}})],1)},staticRenderFns:[]},f=i("VU/8")(v,g,!1,null,null,null).exports;i("pTlp");s.a.config.productionTip=!1,new s.a({el:"#app",components:{App:f},template:"<App/>"})},pTlp:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.fef82dec2411953661ef.js.map