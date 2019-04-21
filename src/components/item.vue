<template>
  <a class="daily-item">
    <!-- 文章图片 -->
    <div class="daily-img" v-if="data.images">
      <img :src="imgPath+data.images[0]">
    </div>
    <!-- 文章标题 -->
    <div class="daily-title"
      :class="{noImg: !data.images}"
    >{{data.title}}</div>
  </a>
</template>

<script>
  import $ from '../libs/util.js'

  export default {
    props: {
      data: {
        type: Object
      }
    },
    data(){
      return {
        imgPath: $.imgPath,
      }
    }  
  }
</script>