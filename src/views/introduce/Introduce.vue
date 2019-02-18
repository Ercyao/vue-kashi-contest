<template>
  <div class="introduce-content">
    <div class="fixedScoll">
      <div class="bg-main">
        <div v-if="ads.length > 0">
          <swiper
            :list="ads"
            :interval="3000"
            dots-class="custom-swiper-dots"
            loop
            :aspect-ratio="340/750"
          ></swiper>
        </div>
        <img src="../../assets/img/head-title.png" class="head-img head-title">
        <img src="../../assets/img/head-bg.png" class="head-img">
        <div class="box">
          <list-box title="大赛介绍" :content="introduceData.introduce"/>
          <list-box title="大赛主题" :content="introduceData.theme"/>
          <list-box title="组织机构" :content="introduceData.organization"/>
          <list-box title="赛程安排" :content="introduceData.flow"/>
        </div>
      </div>
    </div>
    <footed-tab :index="1"/>
  </div>
</template>

<script>
import FootedTab from "@/components/footed/footed-tab";
import ListBox from "@/components/list/list-box";
import { getRouterLink, isPhone } from "@/tools/common";
import { wxShare } from "@/tools/wxShare";
import { Swiper } from "vux";

export default {
  components: {
    Swiper,
    ListBox,
    FootedTab
  },
  data() {
    return {
      ads: [],
      introduceData: {
        icon: "",
        introduce:
          "为响应自治区旅游发展大会“旅游兴疆”战略，推动我市旅游商品品牌化、市场化、产业化的发展，引导、扶持社会资本投入旅游商品的研发、生产和销售，加大旅游商品设计、制作、宣传力度，培育我市旅游商品创意产业，打造我市旅游新的消费增长点，现决定举办首届“喀什礼物”旅游商品设计大赛。",
        theme: "<p style='text-align: center;'>“礼，为喀什代言”</p>",
        organization: "<p style='text-align: center;'>主办单位：喀什市旅游局 </p><p style='text-align: center;'>承办单位：匠玩旅行</p>",
        time: "<strong>大赛时间：</strong><p>2018年9月28日—11月25日</p><strong>大赛地点：</strong><p>初赛-喀什市古城景区</p><p>决赛-喀什市(详细地址另行通知)</p>",
        flow: '<p>赛程安排：2018年12月5日 - 2019年1月10日</p><p>（一）报名：2018年12月5日 - 2019年1月4日</p><p>2018年12月5日，大赛组委会正式发布通告，面向疆内外各类机构和个人征集参赛作品，征集日期截止至2019年1月4日。参赛单位和个人可登录“喀什礼物设计大赛报名平台”下载填写报名信息。大赛链接（移动端）：http://match.cugtrip.com</p><p>（二）初赛：2019年1月5日</p><p>海选征集结束后，邀请专家对参赛作品进行线下评审，每组选出前6名入围决赛。</p><p>（三）网络投票：2019年1月6日 - 1月10日</p><p>组委会将针对入围决赛的6个产品设置网络投票环节，网络投票排名按10分制折算成得分，如【喀什美味组】网络投票第一名得10分；第二名得9分，以此类推。网络投票得分计入决赛总成绩。</p><p>（四）决赛：2019年1月10日</p><p>决赛形式：现场或线上路演+专家现场打分。参赛者在线下现场或在线上直播平台讲解产品的设计理念、生产工艺、产品优势、营销推广方式等，同时专家评委进行现场打分。</p><p>（五）颁奖仪式：2019年1月10日</p><p>决赛当日结束后，现场颁奖。</p>'
      },
      phone: true
    };
  },
  created() {
    window.wxShare();
    this.phone = isPhone;

    let link = getRouterLink();
    console.log("地址", link);
  },
  methods: {
    async getAdsApi() {}
  }
};
</script>

<style lang="less">
@import "../../assets/style/main.less";
.introduce-content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url(../../assets/img/bg.png);
  background-size: 100%;

  .body-bg {
    padding-bottom: calc(0.5rem + 9.8vmin);
    background: url(../../assets/img/body-bg.jpg);
    background-size: 100%;
  }

  .head-img {
    width: 100%;
    padding: 2% 5%;
  }
  .head-title {
    padding: 5% 5% 2%;
  }
  .box {
    margin-bottom: 60px;
  }
}

.bg-left {
  position: absolute;
  left: 0;
  top: 0;
  .size(10px, 100%);
  background: url(../../assets/img/bg-l.png);
  background-size: 100% 100%;
}

.bg-right {
  position: absolute;
  right: 0;
  top: 0;
  .size(10px, 100%);
  background: url(../../assets/img/bg-r.png);
  background-size: 100% 100%;
}
.bg-main {
  width: 100%;
  height: auto;
  padding-bottom: calc(0.5rem + 9.8vmin);
  background: url(../../assets/img/bg-main.jpg);
  background-size: 100%;
}
</style>
