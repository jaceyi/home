<style lang="scss" scoped>
.ability {
  min-width: 500px;
}

.head {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
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


  .el-textarea {
    width: 430px;
  }
}

.introduce {
  margin-top: 50px;
}

</style>

<template>
  <div class="ability">
    <div class="head">
      技能管理
    </div>
    <div class="form">
      <div class="row" v-for="(item, index) in abilityList" :key="index">
          <el-input v-model="item.name" placeholder="请输入技能"></el-input>
          <el-slider v-model="item.value"></el-slider>
          <div class="del"
          v-show="abilityList.length !== 1"
          @click="delAbility(index)"
          title="点击删除技能">
            <i class="iconfont icon icon-del"></i>
          </div>
          <div class="add"
          v-show="index === abilityList.length - 1"
          @click="addAbility"
          title="点击添加技能">
            <i class="iconfont icon icon-add"></i>
          </div>
      </div>
      <div class="row introduce">
        <label class="name-label">
          描述：
        </label>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="introduce">
        </el-input>
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
          name: '',
          value: 0
        }
      ],
      introduce: ''
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
        name: '',
        value: 0
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
        return !item.name || !item.value
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
            const o = data.data
            if (o.code === 200) {
              this.$message({
                message: o.msg,
                type: 'success'
              })
            } else {
              this.$message({
                message: o.msg,
                type: 'warning'
              })
            }
          }
        )
        .catch((error) => {
          this.hanbleFail(error)
        })
    }
  },
  mounted () {
    this.$http.get(this.$apis.getAbility)
      .then(
        (data) => {
          const o = data.data
          if (o.code === 200) {
            const abilityList = o.data
            if (abilityList.length) {
              this.abilityList = abilityList
            }
          } else {
            this.$message({
              message: o.msg,
              type: 'warning'
            })
          }
        }
      )
      .catch((error) => {
        this.hanbleFail(error)
      })
  }
}
</script>
