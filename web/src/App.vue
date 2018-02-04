<template>
  <div id="app" :style="{backgroundImage: 'url(/public/images/bg/'+ bgUrlNum +'.jpg)'}">
    <transition name="fade">
      <router-view class="container"></router-view>
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

<style lang="scss">
$mianColor: #00AEFF;
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

i {
  display: inline-block;
}

input, textarea, button {
  outline: none;
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: rgba(1, 136, 251, .5);
}

::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(1, 136, 251, .3);
}

.img {
  width: 100%;
}

.main-btn {
  height: 32px;
  min-width: 80px;
  border: 1px solid $mianColor;
  cursor: pointer;
  padding: 0 20px;
  line-height: 32px;
  color: #000;
  background: $mianColor;
  border-radius: 3px;
  transition: all 0.3s;

  &:hover {
    color: #fff;
  }
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
  max-width: 1400px;
  height: 88%;
  background: rgba(255,255,255,0.86);
  transform: translateX(-50%) translateY(-50%);
  z-index: 4;
  border-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  overflow: auto;
}

.container-shadow {
  background: rgba(255,255,255,0.5);
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

.page-head {
  height: 60px;
  font-size: 24px;
  background: #fff;
  line-height: 60px;
  padding-left: 36px;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;

  &::after {
    content: '';
    display: block;
    height: 22px;
    width: 5px;
    background: $mianColor;
    position: absolute;
    left: 20px;
    top: 19px;
  }
}
</style>
