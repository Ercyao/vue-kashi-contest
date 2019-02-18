<template>
  <div class="awards-content">
    <div class="fixedScoll">
      <div style="position: absolute;top: 10px;left: 0;width:30px;height: 30px;"
           @click="onClearVote"></div>
      <div class="body-bg">
        <img src="../../assets/img/head-title.png"
             class="head-img head-title">
        <img src="../../assets/img/head-bg.png"
             class="head-img">
        <div class="box">
          <list-box title="投票规则"
                    :content="vote.rules" />
        </div>
        <div class="vote-tabs-box">
          <span v-for="(item,index) in voteTabs"
                :key="index"
                class="vote-tab-item"
                :class="currentTab === index ? 'active':''"
                @click="changeTabs(item,index)">{{item.name}}</span>
        </div>
        <div class="vote-list-box">
          <ul>
            <li v-for="(item,index) in currentListData"
                :key="index"
                class="vote-list-item">
              <div class="item-cover"
                   :style="{backgroundImage:'url(' + item.image_path + ')'}"
                   @click="jumpVoteDetail(item,index)">
              </div>
              <div class="item-content">
                <div class="item-content-text">
                  <p class="text-title">{{item.name}}</p>
                  <p class="text-num"><span>投 票 数<span class="num">{{item.total_votes_count}}</span></span><span>名 次<span class="num">{{item.rank}}</span></span></p>
                </div>
                <div class="item-content-btn">
                  <!-- @click.native="onVote(item,index)" -->
                  <x-button class="vote-btn"
                            disabled>
                    <i class="vote-icon" />
                    投票结束</x-button>
                </div>
              </div>
            </li>
          </ul>
          <p class="bottom-tip"> {{voteListData[currentType] && voteListData[currentType].length > 0 ? '榜单到底了~' : '暂无数据~'}}</p>
        </div>
      </div>
    </div>

    <!-- 投票成功 -->
    <dialog-vote-tip title="投票成功"
                     confirm-button-text="继续投票"
                     type="success"
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
                     type="fail"
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
import ListBox from "@/components/list/list-box"
import { wxShare } from "@/tools/wxShare";
import { isPhone, wechatOauth } from "@/tools/common";
import { XButton } from "vux";
import { getLists, postVote, clearVote } from '@/api/api'

export default {
  components: {
    XButton,
    ListBox,
    FootedTab,
    DialogShareTip,
    DialogVoteTip,
  },
  data() {
    return {
      isChangeStatus: false,  //是否改变了投票状态
      nowDay: '',
      votesCount: 5,
      isShowVoteDialog: false,
      isShowTipDialog: false,
      isShowShareDialog: false,
      id: '',
      vote: {
        icon: '',
        rules: '<p>1、投票时间为2019年1月6日12:00AM-1月10日12:00AM；</p><p>2、每个微信号码每天限投5票；</p><p>3、禁止刷票，一经发现，立即取消比赛资格。</p>'
      },
      phone: false,
      voteListData: {
        craft: [
          { id: 1, type: 'food', display_type: '喀什美味1', number: '222', name: '喀什美味1', description: '项目故事', image_path: '', total_votes_count: '3', isLoad: false },
          { id: 2, type: 'food', display_type: '喀什美味2', number: '222', name: '喀什美味2', description: '项目故事', image_path: '', total_votes_count: '3', isLoad: false }
        ],
        food: [
          { id: 1, type: 'food', display_type: '喀什美味1', number: '222', name: '喀什美味1', description: '项目故事', image_path: '', total_votes_count: '3', isLoad: false },
          { id: 2, type: 'food', display_type: '喀什美味2', number: '222', name: '喀什美味2', description: '项目故事', image_path: '', total_votes_count: '3', isLoad: false }
        ]
      },
      currentTab: 0,
      currentType: 'food',
      currentListData: [],
      currentIndex: '',
      voteTabs: [{ name: '喀什美味', type: 'food' }, { name: '喀什手艺', type: 'craft' }, { name: '喀什文创', type: 'culture' }]
    }
  },
  async created() {
    window.wxShare();
    this.phone = isPhone;
    this.nowDay = this.getDate()

    console.log('当前时间', this.nowDay)

    await this.getListsApi()
    this.currentListData = this.voteListData.food
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
    jumpVoteDetail(item, index) {
      this.$router.push('/vote/detail?id=' + item.id)
    },
    changeTabs(item, index) {
      this.currentTab = index
      this.currentType = item.type
      this.currentListData = this.voteListData[item.type]
      this.getListsApi()
    },
    onVote(item, index) {
      this.id = item.id
      this.currentIndex = index
      this.postVoteApi()
    },
    async getListsApi() {
      try {
        const { data } = await getLists()
        this.voteListData = {
          craft: data.craft,
          food: data.food,
          culture: data.culture
        }
      } catch (e) {
        this._showToolTip(e)
      }
    },
    async postVoteApi() {
      this.showLoadTip()
      try {
        this.hideLoadTip()
        const { data } = await postVote({ id: this.id })
        console.log('投票状态', data.status, this.votesCount)
        if (data.status === 'success') {
          if (this.votesCount > 1) {
            this.votesCount--
            this.currentListData[this.currentIndex].total_votes_count++
            this.isShowVoteDialog = true
            this.isShowTipDialog = false
          } else {
            this.isShowTipDialog = true
            this.isShowVoteDialog = false
          }
        } else {
          this.votesCount = 5
          // this.votesCount = parseInt(this.votesCount) < 1 ? 5 : this.votesCount
          this.isShowTipDialog = true
          this.isShowVoteDialog = false
        }
        this.onSaveVotesCount()
      } catch (e) {
        this.hideLoadTip()
        this._showToolTip(e)
      }
    },
    async clearVoteApi() {
      try {
        await clearVote()
        console.log('清除票数')
      } catch (e) {
        this._showToolTip(e)
      }
    },
    onClearLocalStorage() {
      localStorage.clear();
    },
    onClearVote() {
      this.clearVoteApi()
      this.votesCount = 5
      this.onSaveVotesCount()
    },
    onGetVotesCount() {
      let isDate = localStorage.getItem(`jw_votes_count_${this.nowDay}`) != null
      this.votesCount = localStorage.getItem(`jw_votes_count_${this.nowDay}`) || 5
      let local = `jw_votes_count_${this.nowDay}`
      console.log("取剩余票数", this.votesCount, isDate)
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
.vote-tabs-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 5%;

  .vote-tab-item {
    width: 32%;
    height: 63px;
    line-height: 63px;
    text-align: center;
    background: #dbdbdb;
    border-radius: 20px;
  }
  .active {
    color: #fff;
    background: linear-gradient(90deg, rgb(255, 157, 50), rgb(247, 81, 27));
  }
}
.vote-list-box {
  margin: 20px 5%;
  .vote-list-item {
    width: 100%;
    min-height: 100px;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 5px;
    background: #fff;

    .item-cover {
      width: 100%;
      height: 300px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: #dbdbdb;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .item-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item-content-text {
        .text-title {
          color: red;
          margin-bottom: 20px;
        }
        .text-num {
          font-weight: 550;
          .num {
            font-size: 28px;
            min-width: 60px;
            margin: 0 15px;
            padding: 5px 10px 1px;
            text-align: center;
            color: #fff;
            background: red;
            border-radius: 20px;
          }
        }
        .text-btn {
        }
      }
      .item-content-btn {
        // width: 180px;

        .vote-icon {
          width: 40px;
          height: 35px;
          background: url(../../assets/img/vote-icon.png) no-repeat;
          background-size: 100% 100%;
          vertical-align: text-top;
          margin-right: 10px;
        }

        .vote-btn {
          padding: 0 20px;
          font-size: 34px;
          color: #fff;
          background: #888;
          box-shadow: inset 0 -1px 0 rgba(255, 255, 250, 0.6),
            inset 0 -2px 0 rgba(0, 0, 0, 0.1);
          // background: #7a5bf7;
          // box-shadow: 4px 6px 0 #5d37f3;
          // &:hover {
          //   background-color: #5d37f3;
          // }
          // &:active {
          //   background-color: #5d37f3;
          //   box-shadow: 0 5px #666;
          //   transform: translateY(4px);
          // }
        }
      }
    }
  }

  .bottom-tip {
    color: #999;
    text-align: center;
    line-height: 80px;
    margin-bottom: 50px;
  }
}
</style>
