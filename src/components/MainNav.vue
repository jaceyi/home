<template>
  <div class="main-nav">
    <div class="main-nav--left">
      <div class="main-nav--item">
        个人栈
      </div>
    </div>
    <div class="main-nav--right">
      <div class="main-nav--item">
        技能栈
      </div>
      <div class="main-nav--item">
        留言板
      </div>
      <div class="main-nav--item">
        作品集
      </div>
      <div class="main-nav--item">
        技术分享
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainNav',
  data () {
    return {
      nav: 'MainNav'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main-nav {
  display: flex;
  width: 600px;
  height: 300px;
}

.main-nav--left {
  width: 300px;
  height: 300px;

  .main-nav--item {
    width: 300px;
    height: 300px;
    border: 1px solid rgba(255, 255, 255, 0.77);
    background: rgba(0,0,0,0.1);
    color: #fff;
    font-size: 32px;
    font-weight: 400;
    padding: 30px;
  }
}

.main-nav--right {
  width: 300px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;

  .main-nav--item {
    width: 150px;
    height: 150px;
    border: 1px solid rgba(255, 255, 255, 0.77);
    background: rgba(0,0,0,0.1);
    border-left: 0;
    color: #fff;
    font-size: 18px;
    font-weight: 400;
    padding: 10px 0 0 10px;

    &:first-child {
      border-bottom: 0;
    }

    &:nth-child(2) {
      border-bottom: 0;
      width: 130px;
      height: 130px;
      margin-top: 20px;
    }
  }
}
</style>
