<template>
  <div id="app">
    <router-view class="router-container"/>
    <MainNav />
    <SonNav />
  </div>
</template>

<script>
import MainNav from '@/components/MainNav'
import SonNav from '@/components/SonNav'

export default {
  name: 'App',
  components: {
    MainNav,
    SonNav
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: url('//yijic.com/images/bg/13.jpg') no-repeat center;
  background-size: cover;
}

.router-container {
  width: 1000px;
  height: 800px;
  display: none;
}
</style>
