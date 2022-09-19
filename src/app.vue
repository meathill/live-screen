<template lang="pug">
#app
  header.row
    .col-4
      img.img-thumbnail(
        src="@/assets/avatar.png",
      )
    .col-8
      h1.mb-2 肉山全栈小课堂
      p.leading.text-center 每周一至五
        span.text-muted （工作日）
        br
        strong 晚
        strong.mx-2 9:00
        | -
        strong.ml-2 10:00

  .alert.alert-success.mb-3(hidden)
    h3 🎁 周三弹幕抽奖！🎁
    p.mb-0 抽奖方式：
      br
      | 从弹幕中随机抽一位同学
      br
      | 送一本《CSS新世界》
      br
      | 直播期间任意弹幕均可

  h2 今日内容
  ul
    li Hackthon 颁奖典礼
    li 弹幕抽两本书，发送任意弹幕即可


  h2 免费线上研习班：Vue3 开发扫雷游戏
  h3 周日下午 3:00 - 5:00
  h3 有意者加微信：wakabanga


  h4.mt-auto 招聘啦，有意者请联系我
  div
    strong 🎉 Code.fun / API7 招聘前端
    br
    | 💰 薪资面议
    br
    | 📍 全职远程 / 深圳办公室
    br
    | 🎉 五险一金
    br
    | ✈️ 发展前景广阔


  footer.mt-auto 有问题请随时提出，我会不定时回答
    br
    | 小课堂 QQ群：628056148
    br
    | 微信号：wakabanga
    br
    | 微博：@meathill
    br
    | 博客：https://blog.meathill.com
</template>
