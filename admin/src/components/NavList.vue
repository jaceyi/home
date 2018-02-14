<template>
  <div class="nav-list">
    <div class="nav-list-content">
      <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-menu-item
        v-for="nav in navList"
        :class="`nav-list--item ${ nav.id === navActive ? 'is-active' : '' }`"
        :key="nav.id"
        :index="nav.path"
        @click="gotoPath(nav.path)"
        >
          <span slot="title">{{ nav.text }}</span>
          <i :class="`iconfont icon ${nav.icon}`"></i>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="nav-list--title">
      yijic.com - 2018年
    </div>
  </div>
</template>

<script>
const navList = [
  {
    id: 0,
    path: '/',
    icon: 'icon icon-home',
    text: '首页'
  },
  {
    id: 1,
    path: '/personal',
    icon: 'icon icon-personal',
    text: '资料管理'
  },
  {
    id: 2,
    path: '/ability',
    icon: 'icon icon-ability',
    text: '技能管理'
  },
  {
    id: 3,
    path: '/write',
    icon: 'icon icon-write',
    text: '留言管理'
  },
  {
    id: 4,
    path: '/works',
    icon: 'icon icon-works',
    text: '作品管理'
  }
]
export default {
  name: 'NavList',
  data () {
    return {
      navList: navList
    }
  },
  computed: {
    isCollapse: function () {
      return this.$store.state.navIsCollapse
    },
    navActive: function () {
      return this.$store.state.navActive
    }
  },
  methods: {
    gotoPath: function (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav-list {
    height: 100%;
    background: #f9f9f9;
    position: relative;
    border-right: 1px solid #ccc;

    .icon {
      font-size: 22px;
    }

    a {
      color: #333;
    }
  }
  .nav-list--item {
    border-bottom: 1px solid #EEE;

    span {
      padding-left: 25px;
      padding-right: 55px;
    }
  }
  .nav-list--title {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 36px;
    font-size: 12px;
    color: #fff;
    background: #999;
    line-height: 36px;
    text-align:  center;
    display: none;
  }
</style>
