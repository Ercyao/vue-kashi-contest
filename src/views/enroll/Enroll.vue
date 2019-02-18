<template>
  <div class="enroll-content">
    <header-nav @close="onBackIntroduce"></header-nav>
    <div class="fixedScoll top-header">
      <div class="block">
        <div class="form">
          <div class="form-item">
            <span>产品名称：</span><input type="text"
                   v-model="form.product_name"
                   placeholder="请输入产品名称" /></div>
          <div class="form-item">
            <span>联系人：</span><input type="text"
                   v-model="form.contact_name"
                   placeholder="请输入联系人姓名" /></div>
          <div class="form-item">
            <span>手机号：</span><input type="text"
                   v-model="form.phone"
                   placeholder="请输入手机号码" /></div>
          <div class="form-item">
            <span>邮箱：</span><input type="text"
                   v-model="form.email"
                   placeholder="请输入邮箱以便发送报名表" /></div>
        </div>
      </div>
      <div class="block">
        <div class="box-row">
          <span class="box-row-title">参赛对象</span>
          <div class="box-row-detail">
            <p>1. 疆内外干果、生鲜、农特、文创电商企业或工作室；</p>
            <p>2. 疆内外品牌设计机构、专业设计学院及营销策划机构；</p>
            <p>3. 独立职业设计师、对旅游商品研发感兴趣的社会人士、 民间手艺人等；</p>
            <p>4. 符合旅游商品特征的生产型或销售型企业；</p>
          </div>
        </div>
        <div class="box-row">
          <span class="box-row-title">报名要求</span>
          <div class="box-row-detail">
            <p>1. 参赛作品符合大赛主题和要求，喀什文化特色鲜明，能 够体现厚重的喀什地域文化</p>
            <p>2. 参赛作品需是已量产的成品或具备在喀什量产的条件。</p>
            <p>3. 所有参赛作品无版权纠纷，参赛作品知识产权仍然属于 原作者，大赛组委会拥有对大赛成果在公众媒体上宣传</p>
          </div>
        </div>
        <div class="box-row">
          <span class="box-row-title">大赛咨询</span>
          <div class="box-row-detail">
            <p>添加客服微信，咨询报名相关问题</p>
            <p>联系人：匠匠</p>
            <p>联系电话：18718673201(微信同号)</p>
          </div>
        </div>
        <div class="box-img">
          <img src="../../assets/img/code.png"
               class="code-img" />
        </div>

      </div>
    </div>
    <div class="fixebottom">
      <x-button class="enroll-submit-btn"
                :disabled="isDisabled"
                @click.native="onSubmit">提交</x-button>
    </div>
    <!-- <footed-tab :index="3" /> -->

    <!-- 报名成功 提示弹窗-->
    <dialog-tip title="提示"
                confirm-button-text="确定"
                @confirm="onCancelDialog"
                v-if="isShowDialog"
                @close="onCancelDialog">
      <div slot="content"
           class="content-container">
        <div class="line">报名成功 已将报名表发至邮箱 请注意查收~</div>
      </div>
    </dialog-tip>
    <!-- 报名成功 提示弹窗-->
  </div>
</template>

<script>
import DialogTip from '@/components/dialog/dialog' // 弹窗
import HeaderNav from '@/components/header/header'
import FootedTab from '@/components/footed/footed-tab'
import ListBox from '@/components/list/list-box'
import { XButton, Toast } from 'vux'
import { PostEnroll } from '@/api/api'
import { isEmail, isIntNumber, isPhone } from '@/tools/common'
import { wxShare } from '@/tools/wxShare'

export default {
  components: {
    XButton,
    Toast,
    ListBox,
    FootedTab,
    HeaderNav,
    DialogTip
  },
  data() {
    return {
      form: {},
      isDisabled: false,
      isShowDialog: false
    }
  },
  created() {
    window.wxShare()
    this.phone = isPhone
  },
  methods: {
    onBackIntroduce() {
      this.$router.push({ path: '/introduce' });
    },
    showLoadTip() {
      this.$vux.loading.show({ text: '提交中' })
    },
    hideLoadTip() {
      this.$vux.loading.hide()
    },
    _showToolTip(text, timeout = 2500) {
      this.$vux.toast.text(text)
    },
    formRules(form) {
      return new Promise((resolve, reject) => {
        if (!form.product_name) {
          reject("请输入产品名称")
        }
        if (!form.contact_name) {
          reject("请输入联系人")
        }
        if (!form.phone) {
          reject("请输入手机号")
        }
        if (!isIntNumber(form.phone)) {
          reject("手机号必须为数字")
        }
        if (form.phone.length < 11 || form.phone.length > 11) {
          reject("手机号需为11位数字")
        }
        if (!form.email) {
          reject("请输入邮箱")
        }
        if (!isEmail(form.email)) {
          reject("邮箱格式不正确！")
        }

        resolve("符合表单规则")
      })
    },
    onSubmit() {
      this.formRules(this.form).then((data) => {
        console.info("表单规则验证成功", data); // success

        let option = {
          ...this.form
        }
        this.postEnrollApi(option)
      }).catch((err) => {
        this._showToolTip(err)
        console.error("表单规则验证失败", err); // 不执行
      })

    },
    async postEnrollApi(option) {
      this.isDisabled = true
      try {
        const { data } = await PostEnroll(option)
        this.isDisabled = false
        this.hideLoadTip()
        this.isShowDialog = true
        console.log("提交报名成功", data)
      } catch (err) {
        this.isDisabled = false
        this._showToolTip(err)
        console.error("提交报名失败", err)
      }
    },
    onCancelDialog() {
      this.isShowDialog = false
      setTimeout(() => {
        this.$router.push({ path: '/introduce' });
      }, 500)
    }
  }
}
</script>

<style lang="less">
@import "../../assets/style/main.less";
.enroll-content {
  .bg(@tint);
  .size(100%, 100%);
  overflow-y: auto;
  background: #f5f5f5;
  .top-header {
    top: 10vmin !important;
  }
  .block {
    margin: 20px;
    padding: 30px 23px;
    background: #fff;
    // .border(20px, @tint);
    .border-radius(20px);
    border-bottom: 0;
    margin: 20px;
  }
  .form {
    padding: 0 0 20px;
    .form-item {
      font-size: @smsize;
      .lh(7vmin);
      span {
        width: 170px;
        text-align: right;
      }
      span:before {
        content: "*";
        color: #ff0000;
      }
      input[type="text"] {
        width: 65%;
        line-height: 6vmin;
        border: 0;
        .border-bottom(1px, #dbdbdb);
        padding: 0 10px;
        font-size: @smsize;
        color: #333;
      }
      input::-webkit-input-placeholder {
        color: #dbdbdb;
      }
      input:-ms-input-placeholder {
        color: #dbdbdb;
      }
      input:-moz-placeholder {
        color: #dbdbdb;
      }
      input::-moz-placeholder {
        color: #dbdbdb;
      }
    }
  }
  .box-row {
    margin-bottom: 20px;
    .box-row-title {
      height: 28px;
      .fz-fb(2.2vmin, 550);
      color: black;
    }
    .box-row-detail {
      width: 630px;
      //   .fz-fb(@minisize, 300);
      color: @gray;
      line-height: 44px;
      padding: 10px 0 10px 20px;
    }
  }
  .box-img {
    .tc;
  }
  .code-img {
    width: 35%;
    margin: 20px auto 120px;
  }
}
.popup-wrapper {
  z-index: 300 !important;
  .line {
    .tc;
  }
}
.fixebottom {
  .sidebar(bottom);
  width: 100%;
  .enroll-submit-btn {
    width: 80%;
    .lh(7.2vmin);
    .color-bg(white, #c30d23);
    font-size: @bgsize;
    margin: 20px auto;
    .tc;
    .border-radius(36px);
  }
}
</style>
