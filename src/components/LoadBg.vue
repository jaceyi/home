<template>
  <div class="load-bg" @click="changeBgUrlNum">
    <i class="iconfont icon icon-refresh"></i><span>换一张背景</span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'LoadBg',
  methods: {
    ...mapMutations(['changeBgUrlNum'])
  }
}
</script>

<style lang="scss" scoped>
  .load-bg {
    position: absolute;
    right: -85px;
    top: 80px;
    width: 115px;
    height: 32px;
    padding-left: 10px;
    line-height: 32px;
    font-size: 14px;
    color: #fff;
    background: rgba(0,0,0,0.4);
    border-radius: 16px 0 0 16px;
    transition: right 0.4s;
    cursor: pointer;

    .icon {
      margin-right: 10px;
    }
    &:hover {
      right: 0;
    }
  }
</style>
