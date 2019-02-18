<template>
  <div class="vote-content">
    <div class="fixedScoll">
      <div class="body-bg">
        <img :src="voteData.image_path"
             class="head-img">
        <div class="box">
          <p class="item-title">参赛信息</p>
          <div class="info-box">
            <p class="info-item"><span>组别：{{voteData.display_type}}</span><span>编号：{{voteData.number}}</span></p>
            <p class="info-item"><span>名称：{{voteData.name}}</span></p>
          </div>
        </div>
        <div class="box">
          <p class="item-title">排名信息</p>
          <div class="rank-box">
            <span class="rank-item">
              <p class="rank-top"><span class="num">{{voteData.total_votes_count}}</span>票</p>
              <p class="rank-bottom">当前票数</p>
            </span>
            <span class="rank-item">
              <p class="rank-top">第<span class="num">{{voteData.rank}}</span>名</p>
              <p class="rank-bottom">当前排名</p>
            </span>
          </div>
        </div>
        <div class="box">
          <p class="item-title">创意故事</p>
          <div class="story-box"
               v-html="voteData.description"></div>
        </div>
        <div class="vote-box">
          <!-- @click.native="onVote" 投TA一票-->
          <x-button class="vote-btn"
                    disabled>投票结束</x-button>
        </div>
      </div>
    </div>
    <div class="back-btn"
         @click="jumpBack">
      首页
    </div>

    <!-- 投票成功 -->
    <dialog-vote-tip title="投票成功"
                     confirm-button-text="继续投票"
                     @confirm="onCancelVoteDialog"
                     @close="isShowVoteDialog=false"
                     v-if="isShowVoteDialog">
      <div slot="content"
           class="content-container">
        <div class="line">当前剩余票数：<span class="score">{{votesCount}}</span> 票</div>
      </div>
    </dialog-vote-tip>

    <!-- 投票次数用完  -->
    <dialog-vote-tip title="提示"
                     confirm-button-text="分享"
                     type="error"
                     @confirm="onCancelTipDialog"
                     @close="isShowTipDialog=false"
                     v-if="isShowTipDialog">
      <div slot="content"
           class="content-container">
        <div class="line">
          <p>您今天的投票次数已用完 </p>
          <p>邀请好友来助力吧 </p>
        </div>
      </div>
    </dialog-vote-tip>

    <!-- 分享提示 -->
    <dialog-share-tip @close="isShowShareDialog=false"
                      v-if="isShowShareDialog"></dialog-share-tip>

    <footed-tab :index="4" />
  </div>
</template>

<script>
import DialogShareTip from '@/components/dialog/dialog-share' // 弹窗
import DialogVoteTip from '@/components/dialog/dialog-vote' // 弹窗
import FootedTab from "@/components/footed/footed-tab";
import { wxShare } from "@/tools/wxShare";
import { isPhone, wechatOauth } from "@/tools/common";
import { XButton } from "vux";
import { getLists, getVoteDetail, postVote } from '@/api/api'

export default {
  components: {
    XButton,
    FootedTab,
    DialogVoteTip,
    DialogShareTip
  },
  data() {
    return {
      nowDay: '',
      votesCount: 5,
      isShowVoteDialog: false,
      isShowTipDialog: false,
      isShowShareDialog: false,
      id: this.$route.query.id,
      phone: false,
      voteData: { id: 1, type: 'food', display_type: '喀什美味1', number: '222', name: '喀什美味1', image_path: '', total_votes_count: '3', description: '所谓国债逆回购，本质就是一种短期贷款。也就是说，个人通过国债回购市场把自己的资金借出去，获得固定的利息收益；而回购方，也就是借款人用自己的国债作为抵押获得这笔借款，到期后还本付息。通俗来讲，就是将资金通过国债回购市场拆出，其实就是一种短期贷款，即你把钱借给别人。', isLoad: false },
    }
  },
  created() {
    window.wxShare();
    this.phone = isPhone;
    this.nowDay = this.getDate()

    console.log('当前时间', this.nowDay)

    this.getVoteDetailApi()
    this.onGetVotesCount()
  },
  methods: {
    showLoadTip() {
      this.$vux.loading.show({ text: '投票中' })
    },
    hideLoadTip() {
      this.$vux.loading.hide()
    },
    _showToolTip(text, timeout = 2500) {
      this.$vux.toast.text(text)
    },
    getDate() {
      let date = new Date();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = date.getFullYear() + month + strDate;
      return currentdate;
    },
    // 继续投票
    onCancelVoteDialog() {
      this.postVoteApi()
    },
    // 提示分享
    onCancelTipDialog() {
      this.isShowTipDialog = false
      this.isShowVoteDialog = false
      this.isShowShareDialog = true
    },
    // 投票
    onVote() {
      this.postVoteApi()
    },
    // 返回首页
    jumpBack() {
      this.$router.push('/vote')
    },
    // 详情 接口
    async getVoteDetailApi() {
      try {
        const { data } = await getVoteDetail({ id: this.id })
        this.voteData = data
      } catch (e) {
        this._showToolTip(e)
      }
    },
    async postVoteApi() {
      this.showLoadTip()
      try {
        this.hideLoadTip()
        const { data } = await postVote({ id: this.id })
        if (data.status === 'success') {
          if (this.votesCount > 1) {
            this.votesCount--
            this.voteData.total_votes_count++
            this.isShowVoteDialog = true
            this.isShowTipDialog = false
          } else {
            this.isShowTipDialog = true
            this.isShowVoteDialog = false
          }
        } else {
          this.votesCount = 5
          this.isShowTipDialog = true
          this.isShowVoteDialog = false
        }
        this.onSaveVotesCount()
      } catch (e) {
        this.hideLoadTip()
        this._showToolTip(e)
      }
    },
    onGetVotesCount() {
      this.votesCount = localStorage.getItem(`jw_votes_count_${this.nowDay}`) || 5
      let local = `jw_votes_count_${this.nowDay}`
      console.log("取剩余票数", this.votesCount, local)
    },
    onSaveVotesCount() {
      localStorage.setItem(`jw_votes_count_${this.nowDay}`, this.votesCount)
      console.log("存剩余票数", this.votesCount)
    },
  }
}
</script>

<style lang="less">
@import "../../assets/style/main.less";
.vote-content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url(../../assets/img/bg.png);
  background-size: 100%;

  .body-bg {
    min-height: 100%;
    padding-bottom: calc(0.5rem + 9.8vmin);
    background: url(../../assets/img/body-bg.jpg);
    background-size: 100%;
  }

  .head-img {
    min-width: 90%;
    max-width: 90%;
    min-height: 485px;
    margin: 80px 5%;
    background: #dbdbdb;
  }
  .head-title {
    padding: 5% 5% 2%;
  }
  .box {
    margin: 0 45px 90px;
    .item-title {
      font-size: 35px;
      line-height: 35px;
      color: #e8553a;
      padding: 0 20px;
      margin: 25px 0;
      border-left: 3px solid #e8553a;
      opacity: 0.8;
    }
    .info-box {
      .info-item {
        display: flex;
        justify-content: space-between;
        font-size: 30px;
        span {
          flex: 1;
          line-height: 60px;
          &::before {
            content: "●";
            color: #e8553a;
            padding-right: 20px;
          }
        }
      }
    }
    .rank-box {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 195px;
      background: #fff;
      .rank-item {
        text-align: center;
        .rank-top {
          color: #e8553a;
          line-height: 70px;
          margin-bottom: 10px;
          border-bottom: 2px solid #313131;
          .num {
            font-size: 47px;
            padding: 0 5px;
          }
        }
      }
    }
    .story-box {
      font-size: 30px;
    }
  }
}
.vote-box {
  .vote-btn {
    width: 70%;
    height: 110px;
    border-radius: 30px;
    color: #fff;
    font-size: 39px;
    // background: #e8553a;
    margin: 120px 15% 130px;
    opacity: 0.95;

    background: #888;
    box-shadow: inset 0 -1px 0 rgba(255, 255, 250, 0.6),
      inset 0 -2px 0 rgba(0, 0, 0, 0.1);
  }
}
button.weui-btn /deep/ .weui-loading {
  width: 50px;
  height: 50px;
}

.back-btn {
  position: fixed;
  right: 20px;
  bottom: 30%;
  width: 102px;
  height: 102px;
  line-height: 90px;
  text-align: center;
  color: #fff;
  background: linear-gradient(
    -53deg,
    rgba(97, 185, 133, 1) 0%,
    rgba(234, 92, 67, 1) 0%,
    rgba(150, 201, 125, 1) 0%,
    rgba(242, 186, 67, 1) 0%,
    rgba(255, 221, 36, 1) 100%
  );
  border: 6px solid #e3dfdf;
  border-radius: 50%;
}
</style>
