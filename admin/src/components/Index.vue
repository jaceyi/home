<template>
  <el-container>
    <el-aside width="auto" class="container-list">
      <NavList />
    </el-aside>
    <el-container>
      <el-header class="container-header">
        <Top />
      </el-header>
      <el-main class="container-main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavList from '@/components/NavList'
import Top from '@/components/Top'
export default {
  name: 'Index',
  components: {
    NavList,
    Top
  },
  mounted () {
    this.$http.get(this.$apis.getLogin)
      .then(
        (data) => {
          const o = data.body
          if (!o.code === 200) {
            this.$message({
              message: o.msg,
              type: 'warning'
            })
            this.$router.push('/login')
          } else {
            this.$store.commit('setUserInfo', o.data)
          }
        },
        (data) => {
          this.hanbleFail(data)
        }
      )
  }
}
</script>

<style scoped>

</style>
