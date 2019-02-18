<template>
    <div class="notfound">
        <img src="../../assets/img/logo.png">
        <div class="msg-text">{{ msg }}</div>
        <div class="contest-text">哎呀呀， 页面找不到了！</div>
        <div class="btn-text">
            <span @click="onClickBack">返回首页</span>
            <span @click="onClickRefresh">刷新网页</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'error-notfound',
    data() {
        return {
            msg: '404',
        }
    },
    methods: {
        onClickRefresh() {
            window.location.reload()
        },
        onClickBack() {
            this.$router.push({ path: '/introduce' });
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/main.less";
.notfound {
  text-align: center;
  .contest-text {
    min-height: 120px;
  }
  .btn-text {
    margin: 0 auto;
    .flex-between;
    span {
      .box-shadow;
      .border-radius(5px);
      padding: 5px 10px;
      color: rgba(65, 184, 131, 1);
    }
  }
}
@media screen and (max-width: 779px) {
  .notfound {
    img {
      width: 50%;
    }
    .msg-text {
      // font-size: 120px;
      .fz-calc(5.5vmin);
    }
    .contest-text {
      // font-size: 40px;
      font-size: @bgsize;
    }
    .btn-text {
      // font-size: 34px;
      font-size: @mdsize;
      width: 400px;
    }
  }
}
@media screen and (min-width: 780px) {
  .notfound {
    img {
      transform: rotate(180deg);
      .sidebar(left, 185px, 120px, 2, 42%);
    }
    .msg-text {
      // font-size: 100px;
      .fz-calc(5vmin);
    }
    .contest-text {
      // font-size: 26px;
      font-size: @minisize;
    }
    .btn-text {
      // font-size: 24px;
      .fz-calc(1.2vmin);
      width: 400px;
    }
  }
}
</style>
