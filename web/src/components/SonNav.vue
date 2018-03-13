<template>
  <div class="son-nav">
    <div v-for="nav in navArr" :key="nav.id" :class="'son-nav--item ' + (activeNav === nav.id ? 'active' : '')">
      <router-link :to="nav.path">{{ nav.text }}<i :class="'iconfont icon ' + nav.icon"></i></router-link>
    </div>
  </div>
</template>

<script>
const navArr = [
  {
    id: 0,
    text: '个人栈',
    icon: 'icon-personal',
    path: '/personal'
  },
  {
    id: 1,
    text: '技能栈',
    icon: 'icon-ability',
    path: '/ability'
  },
  {
    id: 2,
    text: '留言板',
    icon: 'icon-write',
    path: '/write'
  },
  {
    id: 3,
    text: '作品集',
    icon: 'icon-works',
    path: '/works'
  },
  {
    id: 4,
    text: '技术分享',
    icon: 'icon-share',
    path: '/'
  },
  {
    id: 5,
    text: 'Home',
    icon: 'icon-home',
    path: '/'
  }
]
export default {
  name: 'SonNav',
  data () {
    return {
      navArr: navArr
    }
  },
  computed: {
    activeNav: function () {
      return this.$store.state.activeNav
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.son-nav {
  position: fixed;
  top: 50%;
  left: 0;
  width: 36px;
  height: 228px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  color: #fff;
  flex-direction: column;
  z-index: 5;

  .son-nav--item {
    height: 36px;
    width: 92px;
    background: rgba(0, 0, 0, 0.4);
    line-height: 36px;
    margin: 1px 0;
    font-size: 12px;
    padding-left: 5px;
    border-radius: 0 4px 4px 0;
    position: relative;
    left: -30px;
    transition: all 0.6s;
    padding-right: 36px;
    text-align: center;

    a {
      color: #fff;
      transition: all 0.6s;
      text-decoration: none;
      display: block;
      height: 100%;
    }

    &.active {
      color: #00AEFF;
      a {
        color: #00AEFF;
      }
    }

    &:hover {
      left: 28px;

      a {
        color: #00AEFF;
      }
    }
  }

  .icon {
    width: 36px;
    height: 36px;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 20px;
  }
}
</style>
