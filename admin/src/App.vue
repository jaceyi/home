<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: #409EFF;
}

img {
  vertical-align: middle;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .el-container {
    height: 100%;
  }
}

.container-header{
  background-color: #EEE;
  border-bottom: 1px solid #ccc;
}

.container-main {
  background-color: #FFF;
}
</style>
