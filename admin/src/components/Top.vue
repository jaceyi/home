<template>
  <div class="top">
    <div class="left"></div>
    <div class="right">
      <el-button class="logout" plain @click="handleClickLogout"> 登出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top',
  methods: {
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
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  .left {
    display: flex;
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
