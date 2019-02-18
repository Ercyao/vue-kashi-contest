<template>
  <footer class="footed-tab ">
    <!-- <div :class="phone? 'pnone-tab': 'pc-tab'"> -->
    <router-link v-for="item in tabs"
                 :key="item.id"
                 :to="item.path"
                 :class='{ active: selected == item.id }'
                 tag="span">{{item.title}}</router-link>
    <!-- </div> -->
  </footer>
</template>

<script>
import { isPhone } from '@/tools/common'
export default {
  name: 'footed-tab',
  props: {
    index: {
      default: 1,
      type: Number
    }
  },
  data() {
    return {
      selected: 1,
      tabs: [
        { id: 1, title: "大赛介绍", path: "/introduce" },
        { id: 4, title: "我要投票", path: "/vote" },
        { id: 2, title: "奖项设置", path: "/awards" },
        // { id: 3,title: "我要报名",path: "/enroll" }
      ],
      phone: false
    }
  },
  created() {
    this.selected = this.index
    this.phone = isPhone
    if (isPhone) {
      console.log("手机端", location)
    } else {
      console.log("pc端")
    }
    console.log('urlType', this.$route.query.urlType)
    // if (this.$route.query.urlType === 'vote') {
    //   this.tabs = [
    //     { id: 1, title: "大赛介绍", path: "/introduce" },
    //     { id: 4, title: "我要投票", path: "/vote" },
    //     { id: 2, title: "奖项设置", path: "/awards" },
    //   ]
    // }
    if (this.$route.query.urlType === 'enroll') {
      this.tabs = [
        { id: 1, title: "大赛介绍", path: "/introduce" },
        { id: 2, title: "奖项设置", path: "/awards" },
        { id: 3,title: "我要报名",path: "/enroll" }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/main.less";
.footed-tab {
  span {
    .tc;
    background-image: url(../../assets/img/footed/btn.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .active {
    color: #fff;
    background-image: url(../../assets/img/footed/btn-active.png);
  }
}

@media screen and (max-width: 767px) {
  .footed-tab {
    .sidebar(bottom);
    .flex-between;
    .lh(9.8vmin);
    .fz(32px);
    // .border-top(1px, #ccc);
    span {
      width: 33.4%;
      height: 100%;
      //   .size(33.4%,98px);
    }
  }
}
@media screen and (min-width: 768px) {
  .footed-tab {
    .sidebar(right, 20%, 70px);
    .fz(10px);
    span {
      //  width: 70rem;
      //   .lh(3rem);
      width: 100%;
      .lh(30px);
      margin: 5px 0;
    }
  }
}
</style>
