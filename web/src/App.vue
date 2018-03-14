<style lang="scss">
  $mainColor: #00AEFF;

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: #FFF;
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
    min-width: 60px;
    border: 1px solid $mainColor;
    cursor: pointer;
    padding: 0 20px;
    line-height: 32px;
    color: #000;
    background: $mainColor;
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
    transform: translateX(-50%) translateY(-50%);
    z-index: 4;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);

    &.ability {
      background: none;
      box-shadow: none;
    }
  }

  .works {
    width: 1000px;
    height: 600px;
  }

  .container-shadow {
    background: rgba(255,255,255,0.5);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;

    &.ability {
      opacity: 0;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .enlarge-enter-active, .enlarge-leave-active {
    transition: all .5s;
  }

  .enlarge-enter, .enlarge-leave-to {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .fade-top-enter-active, .fade-top-leave-active {
    transition: all 1s;
  }

  .fade-top-enter, .fade-top-leave-to {
    opacity: 0;
    transform: translateY(-1000px);
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
      background: $mainColor;
      position: absolute;
      left: 20px;
      top: 19px;
    }
  }

  @keyframes ZoomPagination {
    0% {
      box-shadow: 0 0 0 0 rgba(255,255,255,1);
    }
    100% {
      box-shadow: 0px 0px 0px 12px rgba(255,255,255,0.0);
    }
  }

  .swiper-container-horizontal {
    .swiper-pagination-bullets {
      .swiper-pagination-bullet {
        height: 10px;
        width: 10px;
        margin: 0 8px;
        background: #fff;
        transition: all 0.5s;
        opacity: 0.3;

        &.swiper-pagination-bullet-active {
          opacity: 1;
          background: #fff;
          box-shadow: 0 0 0 0 rgba(255,255,255,1);
          animation: ZoomPagination 1.5s infinite;
        }
      }
    }
  }
</style>

<template>
  <div id="app" :style="{backgroundImage: 'url(//yijic.com/public/images/bg/'+ bgUrlNum +'.jpg)'}">
    <transition name="enlarge">
      <router-view :class="`container ${ currentClass }`"></router-view>
    </transition>
    <transition name="fade">
      <div v-if="shadowShow" @click="goHome" :class="`container-shadow ${ currentClass }`"></div>
    </transition>
    <transition name="fade">
      <Alert v-if="isAlert" v-bind:options="alertOptions" />
    </transition>
    <transition name="fade">
      <Message v-if="isMessage" v-bind:options="messageOptions" />
    </transition>
    <transition name="fade-top">
      <MainNav v-if="mainNavShow"/>
    </transition>
    <transition name="fade">
      <SonNav v-if="shadowShow"/>
    </transition>
    <LoadBg />
  </div>
</template>

<script>
import MainNav from '@/components/MainNav'
import SonNav from '@/components/SonNav'
import LoadBg from '@/components/LoadBg'
import Alert from '@/components/Alert'
import Message from '@/components/Message'

export default {
  name: 'App',
  computed: {
    currentClass () {
      return this.$store.state.currentClass
    },
    bgUrlNum () {
      return this.$store.state.bgUrlNum
    },
    shadowShow () {
      return this.$store.state.shadowShow
    },
    isAlert () {
      return this.$store.state.isAlert
    },
    isMessage () {
      return this.$store.state.isMessage
    },
    alertOptions () {
      return this.$store.state.alertOptions
    },
    messageOptions () {
      return this.$store.state.messageOptions
    },
    mainNavShow () {
      return this.$store.state.mainNavShow
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
    LoadBg,
    Alert,
    Message
  }
}
</script>
