<template>
  <div id="app" :style="{backgroundImage: 'url(//yijic.com/images/bg/'+ bgUrlNum +'.jpg)'}">
    <transition name="fade">
      <transition :name="transitionName"><router-view class="container"></router-view></transition>
    </transition>
      <transition name="fade">
      <div v-if="shadowShow" @click="goHome" class="container-shadow"></div>
    </transition>
    <MainNav />
    <SonNav />
    <LoadBg />
  </div>
</template>

<script>
import MainNav from '@/components/MainNav'
import SonNav from '@/components/SonNav'
import LoadBg from '@/components/LoadBg'

export default {
  name: 'App',
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {
    '$route' (to, from) {
      // console.log(to, from)
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'container-hide' : 'container-show'
    }
  },
  computed: {
    bgUrlNum: function () {
      return this.$store.state.bgUrlNum
    },
    shadowShow: function () {
      return this.$store.state.shadowShow
    }
  },
  methods: {
    goHome: function () {
      this.$router.push('/')
    }
  },
  components: {
    MainNav,
    SonNav,
    LoadBg
  }
}
</script>

<style>
@import "//at.alicdn.com/t/font_297360_ncis5slv86pnl8fr.css";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-position: center;
  background-size: cover;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.container {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 88%;
  max-width: 1200px;
  height: 88%;
  background: rgba(255,255,255,0.88);
  transform: translateX(-50%) translateY(-50%);
  z-index: 4;
  border-radius: 5px;
}

.container-shadow {
  background: rgba(0,0,0,0.66);
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;

}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
