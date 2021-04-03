<template lang="pug">
#app
  header.row.mb-5
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

  .alert.alert-success.mb-1(hidden)
    h3 🎁 下播前有抽奖！🎁
    p 抽奖方式：
    p 从今天的弹幕中随机抽一位同学
    p 抽奖时必须在直播间

  h2 今日内容
  ul
    li 9:00-9:05 准备直播
    li 9:05-9:20 聊聊前端架构
    li 9:20-9:45 开发 BB 酱
    li 9:45-10:00 答疑

  h4.mt-auto 问题待聊
  ul
    li 肉大 顺便再谈谈 前端架构 前端有架构吗

  h4.mt-auto 招聘啦
  ul
    li 🎉 北京 每日优鲜 高级前端
      br
      | 🎉 薪资股票看水平 16薪

  footer.mt-auto 有问题请随时提出，我会不定时回答
    br
    | 小课堂 QQ群：628056148
    br
    | OR Nav 群：872388997
    br
    | 微信：wakabanga
    br
    | 微博：@meathill
    br
    | 博客：https://blog.meathill.com
</template>
