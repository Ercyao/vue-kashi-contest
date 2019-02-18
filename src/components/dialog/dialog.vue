<template>
  <section class="popup-wrapper">
    <div class="popup-container">
      <div v-if="showClose"
           class="icon-close"
           @click="onClose">x</div>
      <p class="title">
        <slot name="title">
          <p>{{ title }}</p>
        </slot>
      </p>
      <div class="text">
        <slot name="content">
          <div class="content-container">
            <p v-html="content" />
          </div>
        </slot>
      </div>
      <div v-if="confirmButtonText"
           class="confirm-button-container">
        <slot name="buttons">
          <span class="confirm-button"
                @click="onConfirm">{{ confirmButtonText }}</span>
        </slot>
      </div>
      <slot name="bottom-content">
        <div class="tip-text"
             v-if="tip">
          <div class="bottom-content-container">
            <p v-html="tip" />
          </div>
        </div>
      </slot>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  props: {
    showClose: {
      default: true,
      type: Boolean
    },
    title: {
      default: '',
      type: String
    },
    content: {
      default: '',
      type: String
    },
    tip: {
      default: '',
      type: String
    },
    confirmButtonText: {
      default: '',
      type: String
    }
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    onClose() {
      this.showClose = false
      this.$emit('close')
    },
    onConfirm() {
      this.$emit('confirm')
    },
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
  align-items: center;
  left: 0;
  top: 0;
  z-index: 10000;
  .size(100%, 100%);
  background: rgba(0, 0, 0, 0.5);
  .popup-container {
    position: relative;
    width: 500px;
    background: #fff;
    .border-radius(10px);
    padding: 40px;
    box-sizing: border-box;
    // font-size: 36px;
    font-size: @bgsize;
    animation: dialog-fadein 0.4s;
    .icon-close {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 300;
      width: 40px;
      height: 40px;
      .tc;
      line-height: 36px;
      .border-radius(50%);
      .color-bg(white, @orange);
    }
    .title {
      color: #444;
      .tc;
      .fz-fb(30px, bold);
    }
    .text {
      // font-size: 34px;
      font-size: @mdsize;
      color: #444;
      line-height: 64px;
      min-height: 80px;
      margin: 30px 0;
      .text-word;
    }
    .confirm-button-container {
      .tc;
      .confirm-button {
        display: inline-block;
        width: 300px;
        .fz-lh(20px,45px);
        .color-bg(white, #c30d23);
        margin: 0 auto;
        border-radius: 25px;
      }
    }
    .tip-text {
      // font-size: 30px;
      font-size: @smsize;
      margin: 0 0 20px 0;
      .to-text-btn {
        color: #e35924;
      }
    }
  }
}
</style>
