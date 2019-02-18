<template>
  <div class="popup-wrapper"  @click="onClose">
    <div class="popup-container">
         <img class="guide-arrow"
           src="../../assets/img/guide-arrow.png"/>
       <p class="tip">请点击右上角菜单按钮</p>
      <p class="tip">转发让好友帮忙助力</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/main.less";
@keyframes dialog-fadein {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  25% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(0.95);
  }
  75% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.popup-wrapper {
  position: fixed;
  display: flex;
  justify-content: center;
  left: 0;
  top: 0;
  z-index: 10000;
  .size(100%, 100%);
  background: rgba(0, 0, 0, 0.5);
  .popup-container {
    position: relative;
    width: 100%;
    padding-top: 360px;
    font-size: 40px;
    color: #fff;
    text-align: center;
    .guide-arrow{
        position: absolute;
        top: 30px;
        right: 30px;
    }
}
}
</style>
