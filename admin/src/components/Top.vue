<template>
  <div class="top">
    <div class="top-title" @click="isGoToIndex">
      <img class="icon" src="../assets/images/yi.png" alt="">
      <span v-if="!isCollapse">admin</span>
    </div>
    <div class="top-option" @click="tabNavCollapse">
      <i class="iconfont icon icon-option"></i>
    </div>
    <el-dialog
      title="提示"
      width="26%"
      :visible.sync="dialogVisible">
      <span>确认返回主页？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="goToIndex">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Top',
  data () {
    return {
      dialogVisible: false
    }
  },
  computed: {
    isCollapse: function () {
      return this.$store.state.navIsCollapse
    }
  },
  methods: {
    ...mapMutations([
      'tabNavCollapse'
    ]),
    isGoToIndex: function () {
      this.dialogVisible = true
    },
    goToIndex: function () {
      window.location.href = 'http://yijic.com'
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    margin: 0 -20px;
    display: flex;
  }
  .top-title {
    height: 60px;
    font-size: 28px;
    line-height: 60px;
    color: #fff;
    background: #333;
    text-align: left;
    padding: 0 20px;
    cursor: pointer;

    .icon {
      height: 25px;
      filter: invert(100%);
    }

    span {
      padding-left: 8px;
      padding-right: 35px;
      color: #fff;
    }
  }
  .top-option {
    background: #d6d6d6;
    width: 70px;
    height: 60px;
    text-align: center;
    line-height: 60px;

    .icon {
      font-size: 32px;
      color: #fff;
    }
  }
</style>
