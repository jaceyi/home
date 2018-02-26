<template>
  <div class="top">
    <div class="left">
      <div class="top-title" @click="handelGoToIndex">
        <img class="icon" src="../assets/images/yi.png" alt="">
        <span v-if="!isCollapse">admin</span>
      </div>
      <div class="top-option" @click="tabNavCollapse">
        <i class="iconfont icon icon-option"></i>
      </div>
    </div>
    <div class="right">
      <el-button class="logout" plain @click="handleClickLogout"> 登出</el-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Top',
  computed: {
    isCollapse: function () {
      return this.$store.state.navIsCollapse
    }
  },
  methods: {
    ...mapMutations([
      'tabNavCollapse'
    ]),
    handelGoToIndex () {
      this.$confirm('此操作将返回首页, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.goToIndex()
      })
    },
    goToIndex () {
      window.location.href = '/'
    },
    handleClickLogout () {
      this.$confirm('此操作将登出, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(this.$apis.logout)
          .then(
            (data) => {
              this.$router.push('/login')
              this.$message({
                message: '登出成功',
                type: 'success'
              })
            },
            (data) => {
              this.hanbleFail(data)
            }
          )
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    margin: 0 -20px;
    display: flex;
    justify-content: space-between;
  }
  .left {
    display: flex;
  }
  .top-title {
    height: 60px;
    font-size: 28px;
    line-height: 60px;
    color: #fff;
    background: #333;
    text-align: left;
    padding: 0 20px;
    cursor: pointer;

    .icon {
      height: 25px;
      filter: invert(100%);
    }

    span {
      padding-left: 8px;
      padding-right: 35px;
      color: #fff;
    }
  }
  .top-option {
    background: #d6d6d6;
    width: 70px;
    height: 60px;
    text-align: center;
    line-height: 60px;

    .icon {
      font-size: 32px;
      color: #fff;
    }
  }
  .right {
    display: flex;
    align-items: center;
    padding: 0 10px;

    .logout {
      font-size: 16px;
      height: 40px;
    }
  }
</style>
