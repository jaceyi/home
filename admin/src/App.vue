<template>
  <div id="app">
    <el-container>
      <el-header class="container-header">
        <Top />
      </el-header>
      <el-container>
        <el-aside width="auto" class="container-list">
          <NavList />
        </el-aside>
        <el-main class="container-main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavList from '@/components/NavList'
import Top from '@/components/Top'
export default {
  name: 'App',
  components: {
    NavList,
    Top
  }
}
</script>

<style>
  @import '//at.alicdn.com/t/font_297360_ncis5slv86pnl8fr.css';
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  img {
    vertical-align: middle;
  }

  #app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  #app>.el-container {
    height: 100%;
  }

  .container-list {
    height: 100%;
  }

  .container-header{
    background-color: #EEE;
    border-bottom: 1px solid #ccc;
  }

  .container-main {
    background-color: #FFF;
  }
</style>
