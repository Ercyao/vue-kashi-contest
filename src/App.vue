<template>
  <div id="app">
    <a id="entry" />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <loading/>
  </div>
</template>

<script>
import alloylever from 'alloylever' 
import Loading from '@/components/loading/loading' // loading
export default {
  name: 'App',
  components: {
        Loading
    },
  mounted () {
    alloylever.entry('#entry')// 请点击这个DOM元素6次召唤vConsole
  }
}

</script>

<style lang="less" scoped>
#app {
    width: 100%;
    height: 100%;
    color: #333;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    font-size: calc(1em + 1.6vmin);

      #entry {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9999;
    width: 60px;
    height: 30px;
    background: transparent;
  }
}
</style>
