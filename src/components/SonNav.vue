<template>
  <div class="son-nav">
    <div class="son-nav--item">
      个人栈<i class="iconfont icon icon-personal"></i>
    </div>
    <div class="son-nav--item">
      技能栈<i class="iconfont icon icon-ability"></i>
    </div>
    <div class="son-nav--item">
      留言板<i class="iconfont icon icon-write"></i>
    </div>
    <div class="son-nav--item">
      作品集<i class="iconfont icon icon-works"></i>
    </div>
    <div class="son-nav--item">
      技术分享<i class="iconfont icon icon-share"></i>
    </div>
    <div class="son-nav--item">
      返回主页<i class="iconfont icon icon-home"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SonNav',
  data () {
    return {
      nav: 'SonNav'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.son-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 92px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  color: #fff;
  flex-direction: column;

  .son-nav--item {
    height: 36px;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    line-height: 36px;
    margin: 1px 0;
    font-size: 12px;
    padding-left: 5px;
    border-radius: 0 4px 4px 0;
    position: relative;
    left: -56px;
    transition: all 0.6s;
    padding-right: 36px;
    text-align: center;

    &:hover {
      left: 0;
      color: #00AEFF;
    }
  }
  .icon {
    width: 36px;
    height: 36px;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-item: center;
  }
}
</style>
