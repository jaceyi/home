<template>
  <div class="top">
    <div class="left">
      <el-button
      :class="`tab-nav-show  ${navIsShow ? 'el-icon-arrow-left' : 'el-icon-arrow-right'}`"
      @click="handleClickTabNavShow"></el-button>
    </div>
    <el-popover
      ref="layer"
      placement="bottom-start"
      width="260"
      popper-class="user-info"
      trigger="click">
      <div class="main" v-if="userinfo.name">
        <p>用户名：<span>{{ userinfo.name }}</span></p>
        <p>操作权限：<span>{{ userinfo.level }}</span></p>
      </div>
      <div class="footer">
        <el-button type="danger" class="logout" plain @click="handleClickLogout">登出</el-button>
      </div>
    </el-popover>
    <div class="right">
      <div v-popover:layer class="user-img">
        <img v-if="userinfo.img" :src="userinfo.img" alt="用户头像">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top',
  computed: {
    userinfo () {
      return this.$store.state.userinfo
    },
    navIsShow () {
      return this.$store.state.navIsShow
    }
  },
  methods: {
    handleClickTabNavShow () {
      this.$store.commit('tabNavShow')
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
      }).catch(() => {
        return false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    margin: 0 -20px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left {
    display: flex;
  }

  .right {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  .user-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    border: 1px solid #ccc;

    img {
      width: 100%;
    }
  }

  .user-info {
    .main {
      padding-bottom: 5px;

      p {
        font-size: 14px;
        margin-bottom: 5px;
      }

      span {
        color: #409EFF;
      }
    }
    .footer {
      border-top: 1px solid #EEE;
      padding-top: 10px;
      display: flex;
      justify-content: flex-end;
    }
    .logout {
      font-size: 14px;
      padding: 8px 15px;
    }
  }

  .tab-nav-show {
    height: 50px;
    width: 50px;
    text-align: center;
    padding: 0;
    margin-left: 10px;
    font-size: 18px;
  }
</style>
