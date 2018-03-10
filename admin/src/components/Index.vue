<template>
  <el-container>
    <transition name="left-hide">
      <el-aside v-if="navIsShow" width="180px" class="container-list">
        <NavList />
      </el-aside>
    </transition>
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
  computed: {
    navIsShow () {
      return this.$store.state.navIsShow
    }
  },
  mounted () {
    this.$http.get(this.$apis.getLogin)
      .then(
        (data) => {
          const o = data.data
          if (!o.code === 200) {
            this.$message({
              message: o.msg,
              type: 'warning'
            })
            this.$router.push('/login')
          } else {
            this.$store.commit('setUserinfo', o.data)
          }
        }
      )
      .catch((error) => {
        this.hanbleFail(error)
      })
  }
}
</script>

<style scoped>
.container-list {
  flex-shrink: 0;
}
.left-hide-enter-active, .left-hide-leave-active {
  transition: transform .5s;
}
.left-hide-enter, .left-hide-leave-to{
  transform: translateX(-180px);
}
</style>
