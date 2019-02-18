<template>
    <header class="header-nav">
        <slot name="city"></slot>
        <slot name="search"></slot>
        <slot name="select"></slot>
        <span class="head_goback"
              v-if="goBack"
              @click="onClick">
            <x-icon type="ios-arrow-back"
                    size="30"></x-icon>
        </span>
        <span class="head_title"
              v-if="headTitle">{{headTitle}}</span>
        <span class="small_title"
              v-if="smallTitle">{{smallTitle}}</span>

    </header>
</template>

<script>
// import { XButton, Toast } from 'vux'
export default {
    name: 'header-nav',
    props: {
        goBack: {
            default: true,
            type: Boolean
        },
        headTitle: {
            default: '报名表',
            type: String
        },
        smallTitle: {
            default: '',
            type: String
        }
    },
    data() {
        return {
            selected: 1,
            tabs: [
                {
                    id: 1,
                    title: "大赛介绍",
                    path: "/introduce"
                }, {
                    id: 2,
                    title: "奖项设置",
                    path: "/awards"
                }, {
                    id: 3,
                    title: "我要报名",
                    path: "/enroll"
                }
            ]
        }
    },
    created() {
        this.selected = this.index
    },
    methods: {
        onClick(){
            this.$emit('close')
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/main.less";
.header-nav,
.vux-x-icon,
.small_title {
  position: absolute;
  top: 0;
  z-index: 199;
  .lh(8.4vmin,8vmin);
}
.header-nav {
  left: 0;
  width: 100%;
  font-size: @mdsize;
  .color-bg(white, #C30D23);
  .tc;
  .border-top(1px, #ccc);
  .vux-x-icon {
    left: 0;
    fill: #ffffff;
    vertical-align: middle;
  }
  .head_title {
    width: 80%;
    font-size: @bgsize;
    .ellipsis;
  }
  .small_title {
    right: 20px;
    font-size: @smsize;
  }
}
</style>
