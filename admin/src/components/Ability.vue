<template>
  <div>
    <div class="head">
      技能管理
    </div>
    <div class="form">
      <div class="row" v-for="(item, index) in abilityArr" :key="item.id">
          <el-input v-model="item.value" placeholder="请输入技能"></el-input>
          <el-slider v-model="item.number"></el-slider>
          <div class="add"
          v-if="index === abilityArr.length - 1"
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
      abilityArr: [
        {
          id: 0,
          value: '',
          number: 0
        }
      ]
    }
  },
  methods: {
    addAbility () {
      const id = this.abilityArr.length
      if (id > 10) {
        this.$message('已达添加上限')
      }
      this.abilityArr.push({
        id: id,
        value: '',
        number: ''
      })
    },
    submit () {
      console.log(this.abilityArr)
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

  .submit {
    margin-top: 10px;
    width: 100px;
  }
}
</style>
