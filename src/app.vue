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
        strong.ml-2 10:40
  h2 今日内容
  ul
    li 9:00-9:10 准备直播
    li 9:10-9:50 录 Vue 全家桶 + Serverless 实战开发
    li 9:50-10:30 录浏览器扩展开发共享主页实战
    li 10:30-10:40 答疑

  h3.mt-auto 待回答问题
  ul
    li （静待提问）

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
