<template>
  <div class="awards-content">
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
          <list-box title="参赛分组" :content="awards.group"/>
          <list-box title="奖项设置" :content="awards.awards"/>
          <list-box title="评审规范" :content="awards.review"/>
        </div>
      </div>
    </div>
    <footed-tab :index="2"/>
  </div>
</template>

<script>
import FootedTab from "@/components/footed/footed-tab";
import ListBox from "@/components/list/list-box"
import { wxShare } from "@/tools/wxShare";
import { isPhone } from "@/tools/common";
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
      awards: {
        icon: "",
        group:
          "<p>根据喀什市旅游资源禀赋和文化内涵，本次大赛共设3组进行比赛，分别为：</p><p>（一）喀什美味组——体现和代表喀什特点的干果、鲜果、民族食品、民族药茶等农副食品及相关创意制品；</p><p>（二）喀什手艺组——民族传统手工艺品或体现鲜明地域文化元素和创新元素的手工艺品等；</p><p>（三）喀什文创组——其他能展现喀什风貌及民俗风情，体现文化创意，适宜进行量产和面向普通游客进行销售的旅游商品。</p>",
        awards:
          "<p>大赛根据产品类别，设置【喀什美味组】、【喀什手艺组】、【喀什文创组】共3个组别，每组各评选6个奖项，分别为：</p><p>一等奖1名，奖金10000元</p><p>二等奖2名，奖金6000元</p><p>三等奖3名，奖金3000元</p>",
        review:
          "<p>（一）评审原则</p><p>为遵循公开、公平、公正、竞争择优的原则，每位评委需签署评委承诺书，并接受社会监督。</p><p>（二）专家评委</p><p>大赛评委以“产品专家+旅游专家”组成，产品专家系新疆知名电商行业协会或电商企业负责人，具备较为丰富的旅游商品实践经验；旅游专家为从疆内高校旅游相关专业邀请的学者或旅游管理机构中熟悉喀什市旅游市场的专家。</p><p>（三）评审规则</p><p>大赛评审分为初赛、网络投票和决赛三个阶段。初赛采用线下实物评审+线上实时直播的模式，专家组根据评审指标，对参赛作品实物进行评选，按得分排名由高至低选出决赛入围项目。网络投票根据参赛作品网络投票排名，按10分制折算成得分，并计入决赛总分。决赛为“5+5”现场或线上路演+评委打分的形式，即参赛选手进行5分钟的陈述,评委与参赛选手进行5分钟的互动交流。选手陈述时可以根据自己的需要，采用多种形式表达。决赛邀请评委不少于5人，每名评委按照评审指标打分并写出评价意见和建议，去掉最高分和最低分，以其余评委的平均分作为参赛项目的评审得分。</p><p>（四）评审指标</p><p>根据本次大赛的主题，参赛商品应突出以下三个特点：</p><p>1、地域性：主题突出，充分体现喀什的民俗风情、文化特色、资源特点和特征。</p><p>2、创新性：产品设计创意新颖、独特，技艺或品种独创。具有时尚性，易被旅游者接受。传统工艺推陈出新，鼓励高新技术应用，具有自主知识产权。</p><p>3、市场性：产品特征符合市场需求，易于销售。</p>"
      },
      phone: false
    };
  },
  created() {
    window.wxShare();
    this.phone = isPhone;
  },
  methods: {

  }
};
</script>

<style lang="less">
@import "../../assets/style/main.less";
.awards-content {
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

.bg-main {
  width: 100%;
  height: auto;
  padding-bottom: calc(0.5rem + 9.8vmin);
  background: url(../../assets/img/bg-main.jpg);
  background-size: 100%;
}
</style>
