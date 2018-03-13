<template>
  <div class="main-nav">
    <div class="main-nav--left" ref="navLeft">
      <router-link to="/personal">
        <i class="iconfont icon icon-personal"></i>个人栈
      </router-link>
    </div>
    <div class="main-nav--right">
      <router-link to="/ability">
        <i class="iconfont icon icon-ability"></i>技能栈
      </router-link>
      <router-link to="/write">
        <i class="iconfont icon icon-write"></i>留言板
      </router-link>
      <router-link to="/works">
        <i class="iconfont icon icon-works"></i>作品集
      </router-link>
      <a href="#">
        <i class="iconfont icon icon-share"></i>技术分享
      </a>
    </div>
  </div>
</template>

<script>
import CreateLine from '@/assets/js/line.js'

const line = new CreateLine()

export default {
  name: 'MainNav',
  data () {
    return {
      nav: 'MainNav'
    }
  },
  mounted: function () {
    line.init({
      parent: this.$refs.navLeft,
      pointNum: 52,
      pointDist: 60,
      lineMax: 1,
      isMouse: true
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main-nav {
  display: flex;
  width: 600px;
  height: 300px;
}

.main-nav--left {
  width: 300px;
  height: 300px;
  position: relative;

  a {
    display: block;
    width: 300px;
    height: 300px;
    border: 1px solid rgba(255, 255, 255, 0.77);
    background: rgba(0,0,0,0.1);
    color: #fff;
    font-size: 32px;
    font-weight: 400;
    padding: 20px;
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    transition: all 0.4s;
    text-decoration: none;

    .icon {
      font-size: 72px;
      margin-right: 10px;
      transition: all 0.4s;
    }
    &:hover {
      background: rgba(0,0,0,0.2);

      .icon {
        font-size: 88px;
      }
    }
  }
}

.main-nav--right {
  width: 300px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  position: relative;

  a {
    display: block;
    width: 150px;
    height: 150px;
    border: 1px solid rgba(255, 255, 255, 0.77);
    background: rgba(0,0,0,0.1);
    border-left: 0;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    padding: 10px 0 0 10px;
    transition: all 0.4s;
    text-decoration: none;

    &:first-child {
      border-bottom: 0;
    }

    &:nth-child(2) {
      border-bottom: 0;
      width: 130px;
      height: 130px;
      margin-top: 20px;
    }

    .icon {
      font-size: 36px;
      margin-right: 6px;
      transition: all 0.4s;
    }

    &:hover {
      background: rgba(0,0,0,0.2);

      .icon {
        font-size: 46px;
      }
    }
  }
}
</style>
