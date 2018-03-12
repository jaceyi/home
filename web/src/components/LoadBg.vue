<template>
  <div :class="`load-bg ${ isRotate ? 'rotate' : '' }`" @click="changeBgUrlNum">
    <i class="iconfont icon icon-refresh"></i>
    <span>换一张背景</span>
  </div>
</template>

<script>

export default {
  name: 'LoadBg',
  data () {
    return {
      isRotate: false,
      timer: null
    }
  },
  methods: {
    changeBgUrlNum: function () {
      this.isRotate = true
      clearInterval(this.timer)
      this.timer = setTimeout(() => {
        this.isRotate = false
      }, 1000)
      this.$store.commit('changeBgUrlNum')
    }
  }
}
</script>

<style lang="scss" scoped>
  @keyframes rotateIcon {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(-360deg)
    }
  }

  .load-bg {
    position: absolute;
    right: -85px;
    top: 80px;
    width: 115px;
    height: 32px;
    padding-left: 10px;
    line-height: 32px;
    font-size: 14px;
    color: #fff;
    background: rgba(0,0,0,0.4);
    border-radius: 16px 0 0 16px;
    transition: right 0.4s;
    cursor: pointer;
    z-index: 9;

    .icon {
      margin-right: 5px;
      transition: all 0.6s;
    }
    &:hover {
      right: 0;
    }

    &.rotate {
      .icon {
        animation: rotateIcon 0.36s linear infinite;
      }
    }
  }
</style>
