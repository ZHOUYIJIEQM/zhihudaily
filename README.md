# 知乎日报 vue+axios

### 用知乎日报的api的数据接口, 使用vue和axios请求的数据,制作的一个网页版知乎日报

### 点击查看效果: [预览网页](https://zhouyijieqm.github.io/zhihudaily/dist/index.html) 
> 用了海外的vps做跨域代理,速度很慢,最好还是请本地运行  
预览可能因为证书问题没显示数据,可以考虑这样做：
![预览图片](https://zhouyijieqm.github.io/zhihudaily/preview/pv4.png)

### 知乎日报api: [参考](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)

### 由于知乎api跨域限制,前端不能直接用,需要先运行代理: 
> ***cd zhihudaily***   
***node proxy.js***

## 运行方式

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 效果预览：
![预览图片](https://zhouyijieqm.github.io/zhihudaily/preview/pv0.png)
![预览图片](https://zhouyijieqm.github.io/zhihudaily/preview/pv1.png)
![预览图片](https://zhouyijieqm.github.io/zhihudaily/preview/pv3.png)
