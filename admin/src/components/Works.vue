<template>
  <div>
    <div class="head">
      作品管理
    </div>
    <div class="form">
      <div class="row" v-for="(item, index) in worksArr" :key="item.id">
        <el-input v-model="item.name" placeholder="请输入项目技能"></el-input>
        <el-input v-model="item.link" placeholder="请输入项目链接"></el-input>
        <div class="add"
        v-if="index === worksArr.length - 1"
        @click="addWorks"
        title="点击添加技能">
          <i class="iconfont icon icon-add"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Works',
  data () {
    return {
      worksArr: [
        {
          id: 0,
          name: '',
          link: '',
          imgs: [],
          type: ''
        }
      ]
    }
  },
  methods: {
    addWorks () {
      console.log(this.worksArr.length)
    }
  }
}
</script>

<style lang="scss" scoped>
.head {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

.form {
  margin-top: 20px;
}

.row {
  display: flex;
  margin-bottom: 15px;
  justify-content: center;

  .el-input {
    width:240px;
    margin-right: 20px;
  }
}
</style>
