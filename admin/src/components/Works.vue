<template>
  <div>
    <div class="head">
      作品管理
    </div>
    <div class="form">
      <div class="row" v-for="(item, index) in worksLists" :key="item.id">
        <el-input v-model="item.name" placeholder="请输入项目名称"></el-input>
        <el-input v-model="item.link" placeholder="请输入项目链接"></el-input>
        <el-select v-model="item.type" placeholder="请选择项目类型">
          <el-option
            v-for="item_ in itemTypeLists"
            :key="item_"
            :value="item_">
          </el-option>
        </el-select>
        <div class="add"
          v-if="index === worksLists.length - 1"
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
      worksLists: [
        {
          id: 0,
          name: '',
          link: '',
          imgs: [],
          type: ''
        }
      ],
      itemTypeLists: [
        '项目',
        '游戏'
      ]
    }
  },
  methods: {
    addWorks () {
      const id = this.worksLists.length
      this.worksLists.push(
        {
          id: id,
          name: '',
          link: '',
          imgs: [],
          type: ''
        }
      )
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

  .el-select  {
    width: 150px;
    margin-right: 20px;
  }

  .add {
    background:#409EFF;
    color: #fff;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    margin-right: -32px;
  }
}
</style>
