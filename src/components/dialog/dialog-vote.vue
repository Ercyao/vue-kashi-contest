<template>
  <section class="popup-wrapper">
    <div style="width: 100%;height: 100%;position: absolute;"
         @click="onClose"></div>
    <div class="popup-container">
      <div class="img-box">
        <img src="../../assets/img/popup/vote-bg.png"
             class="popup-img">
        <i class="close-icon" @click="onClose"/>
        <i class="img-icon"
           :class="type === 'success' ? 'success-icon' : 'fail-icon'" />
      </div>
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
    },
    type: {
      default: 'success',
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
    // height: 730px;
    background: #fff;
    .border-radius(10px);
    box-sizing: border-box;
    font-size: @bgsize;
    animation: dialog-fadein 0.4s;
    .popup-img {
      width: 100%;
    }
    .title {
      color: #e86d44;
      .tc;
      .fz-fb(30px, normal);
    }
    .text {
      font-size: @mdsize;
      color: #444;
      line-height: 64px;
      min-height: 80px;
      margin: 60px 0 30px;
      .tc;
      .score {
        font-size: 38px;
        color: #ec6d44;
      }
    }
    .confirm-button-container {
      .tc;
      margin-bottom: 50px;
      .confirm-button {
        display: inline-block;
        width: 60%;
        .fz-lh(16px, 60px);
        color: #fff;
        background: linear-gradient(
          93deg,
          rgba(236, 109, 68, 0.98),
          rgba(249, 146, 46, 0.98)
        );
        border-radius: 44px;
      }
    }
    .tip-text {
      font-size: @smsize;
      margin: 0 0 20px 0;
      .to-text-btn {
        color: #e35924;
      }
    }
  }
}
.img-box {
  .img-icon {
    position: absolute;
    left: 50%;
    top: 30px;
    width: 130px;
    height: 130px;
    transform: translateX(-50%);
  }
  .success-icon {
    background: url(../../assets/img/popup/success.png);
    background-size: 100% 100%;
  }
  .fail-icon {
    background: url(../../assets/img/popup/fail.png);
    background-size: 100% 100%;
  }
  .close-icon {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 40px;
    height: 40px;
    background: url(../../assets/img/popup/close.png);
    background-size: 100% 100%;
  }
}
</style>
