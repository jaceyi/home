<template>
  <div>
    <div class="head">
      技能管理
    </div>
    <div class="form">
      <div class="row" v-for="(item, index) in abilityList" :key="index">
          <el-input v-model="item.value" placeholder="请输入技能"></el-input>
          <el-slider v-model="item.number"></el-slider>
          <div class="del"
          v-if="abilityList.length !== 1"
          @click="delAbility(index)"
          title="点击删除技能">
            <i class="iconfont icon icon-del"></i>
          </div>
          <div class="add"
          v-if="index === abilityList.length - 1"
          @click="addAbility"
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
  name: 'Ability',
  data () {
    return {
      abilityList: [
        {
          value: '',
          number: 0
        }
      ]
    }
  },
  methods: {
    addAbility () {
      const length = this.abilityList.length
      if (length >= 10) {
        this.$message({
          message: '已达添加上限',
          type: 'warning'
        })
        return
      }
      this.abilityList.push({
        value: '',
        number: 0
      })
    },
    delAbility (index) {
      const abilityList = this.abilityList
      const startArr = abilityList.slice(0, index)
      const endArr = abilityList.slice(index + 1)
      this.abilityList = startArr.concat(endArr)
    },
    submit () {
      const abilityList = this.abilityList
      const isNull = abilityList.find((item) => {
        return !item.value || !item.number
      })
      if (isNull) {
        this.$message({
          message: '请将内容填写完整',
          type: 'warning'
        })
        return
      }
      this.$http.post(this.$apis.setAbility, {
        abilityList: abilityList
      })
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
    this.$http.get(this.$apis.getAbility)
      .then(
        (data) => {
          const o = data.body
          if (o) {
            const abilityList = o.data
            if (abilityList.length) {
              this.abilityList = abilityList
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

  .el-slider {
    width:180px;
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
