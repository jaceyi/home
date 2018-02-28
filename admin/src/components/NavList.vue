<template>
  <div class="nav-list">
    <div class="nav-list-title" @click="handelClickGoToIndex">
      <img class="icon" src="../assets/images/yi.png" alt="">
      <span>admin</span>
    </div>
    <div class="nav-list-content">
      <el-menu
        :router="true"
        default-active="/personal">
        <el-menu-item
        v-for="(nav, index) in navList"
        class="nav-list--item"
        :key="index"
        :index="nav.path">
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
    path: '/personal',
    icon: 'icon icon-personal',
    text: '资料管理'
  },
  {
    path: '/ability',
    icon: 'icon icon-ability',
    text: '技能管理'
  },
  {
    path: '/write',
    icon: 'icon icon-write',
    text: '留言管理'
  },
  {
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
  methods: {
    handelClickGoToIndex () {
      this.$confirm('此操作将返回首页, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.location.href = '/'
      }).catch(() => {
        return false
      })
    },
    gotoPath (path) {
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
    width: 180px;

    .icon {
      font-size: 22px;
    }

    a {
      color: #333;
    }
  }
  .nav-list-title {
    height: 60px;
    font-size: 28px;
    line-height: 60px;
    background: -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0, #24C6DC), color-stop(1, #514A9D));
    text-align: left;
    padding: 0 20px;
    cursor: pointer;

    .icon {
      height: 25px;
      filter: invert(100%);
    }

    span {
      padding-right: 15px;
      color: #fff;
    }
  }
  .nav-list--item {
    border-bottom: 1px solid #EEE;

    span {
      padding-left: 20px;
      padding-right: 32px;
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
