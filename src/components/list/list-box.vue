<template>
  <div class="list-box">
    <div class="title">{{title}}</div>
    <div class="content">
      <template v-if="isShow">
        <div v-html="content"
             :class="{'hidetxt':showSynopsis}">
        </div>
        <div class="show-more-tip"
             :class="{ 'close-detail': showSynopsis }"
             @click="onShowSynopsis">
          <div class="show-more"
               v-if="showSynopsis">
            展开全部
            <i class="icon-arrow arrow-down"></i>
          </div>
          <div class="show-more"
               v-else>
            收起全部
            <i class="icon-arrow arrow-up"></i>
          </div>
        </div>
      </template>
      <template v-else>

        <div v-html="content">
        </div>
      </template>

    </div>
  </div>
</template>

<script>
export default {
  name: 'list-box',
  props: {
    title: {
      default: '',
      type: String
    },
    content: {
      default: '',
      type: String
    },
    isShow: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      showSynopsis: true,
    }
  },
  created() {
  },
  methods: {
    onShowSynopsis() {
      this.showSynopsis = !this.showSynopsis
    }
  }
}
</script>

<style lang="less">
@import "../../assets/style/main.less";
.list-box {
  width: 100%;
  .title {
    width: 84%;
    // width: 282px;
    .tc;
    font-weight: 550;
    font-size: calc(0.5rem + 3vmin);
    height: calc(0.5rem + 80px);
    line-height: calc(0.5rem + 90px);
    margin: 100px auto 30px;
    background: url(../../assets/img/title-bg.png) no-repeat;
    background-size: 100% 100%;
  }
  .content {
    width: 84%;
    line-height: calc(0.5em + 5vmin);
    margin: 0 auto;
    .fz-fb(1.6vmin, 300);
    // .bg(white);
    // .border(10px, @yellow);
    // .border-radius(10px);
  }
  .hidetxt {
    .blur-text;
  }
  .show-more-tip {
    font-size: @smsize;
    padding-top: 10px;
    .tc;
  }
}
</style>


