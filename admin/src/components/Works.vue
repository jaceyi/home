<template>
  <div>
    <div class="head">
      作品管理
    </div>
    <div class="form">
      <div class="row" v-for="(item, index) in worksList" :key="index">
        <el-input v-model="item.name" placeholder="请输入项目名称"></el-input>
        <el-input v-model="item.link" placeholder="请输入项目链接"></el-input>
        <el-select v-model="item.type" placeholder="请选择项目类型">
          <el-option
            v-for="item_ in itemTypeList"
            :key="item_"
            :value="item_">
          </el-option>
        </el-select>
        <div class="del"
        v-if="worksList.length !== 1"
        @click="delWorks(index)"
        title="点击删除技能">
          <i class="iconfont icon icon-del"></i>
        </div>
        <div class="add"
          v-if="index === worksList.length - 1"
          @click="addWorks"
          title="点击添加技能">
          <i class="iconfont icon icon-add"></i>
        </div>
      </div>
      <div class="row">
        <el-button
        class="submit"
        @click="submit"
        type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Works',
  data () {
    return {
      worksList: [
        {
          name: '',
          link: '',
          imgs: [],
          type: ''
        }
      ],
      itemTypeList: [
        '项目',
        '游戏'
      ]
    }
  },
  methods: {
    addWorks () {
      this.worksList.push(
        {
          name: '',
          link: '',
          imgs: [],
          type: ''
        }
      )
    },
    delWorks (index) {
      const worksList = this.worksList
      const startArr = worksList.slice(0, index)
      const endArr = worksList.slice(index + 1)
      this.worksList = startArr.concat(endArr)
    },
    submit () {
      this.$http.post(this.$apis.setWorks)
        .then(
          (data) => {
            const o = data.body
            this.$message(o.msg)
          },
          (data) => {
            console.log(data)
          }
        )
    }
  },
  mounted () {
    this.$http.get(this.$apis.getWorks)
      .then(
        (data) => {
          const o = data.body
          if (o) {
            const worksList = o.data
            if (worksList.length) {
              this.worksList = worksList
            }
          }
        },
        (data) => {
          console.log(data)
        }
      )
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

  .del {
    background:#409EFF;
    color: #fff;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    margin-right: 8px;
  }

  .submit {
    margin-top: 10px;
    width: 100px;
  }
}
</style>
