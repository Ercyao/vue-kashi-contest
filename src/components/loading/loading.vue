 <template>
  <div class="loading-content"
       v-if="isLoading">
    <div class="loading_container">
      <div class="file"></div>
      <span>Loading</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    }
  },
}
</script>

<style lang="less" scoped>
.loading-content {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 19999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  .loading_container {
    position: absolute;
    z-index: 99;
    width: 140px;
    height: 140px;
    line-height: 140px;
    color: #fff;
    font-weight: bold;
    border: 1px solid #4da7ee;
    border-radius: 50%;
    background: #4da7ee;
    overflow: hidden;

    span {
      position: absolute;
      z-index: 99;
      top: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      border-radius: 50%;
    }

    .file {
      position: absolute;
      z-index: 99;
      top: -100px;
      left: -40px;
      width: 180px;
      height: 180px;
      border-radius: 40%;
      background: rgba(255, 255, 255, 0.7);
      animation: file 3s ease infinite;
    }

    @keyframes file {
      0% {
        transform: translate(0%, 10px) rotateZ(0deg);
      }
      50% {
        transform: translate(-10%, -10px) rotateZ(180deg);
      }
      100% {
        transform: translate(5%, 10px) rotateZ(360deg);
      }
    }
  }
}
</style>
