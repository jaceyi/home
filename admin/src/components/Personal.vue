<template>
  <div class="personal">
    <div class="head">
      资料管理
    </div>
    <div class="form">
      <div class="row">
        <label class="name-label">
          姓名：
        </label>
        <el-input v-model="name"></el-input>
      </div>
      <div class="row">
        <label class="name-label">
          性别：
        </label>
        <el-radio v-model="gender" label="1">男</el-radio>
        <el-radio v-model="gender" label="2">女</el-radio>
      </div>
      <div class="row">
        <label class="name-label">
          手机号码：
        </label>
        <el-input v-model="mobile"></el-input>
      </div>
      <div class="row">
        <label class="name-label">
          QQ：
        </label>
        <el-input v-model="qqCode"></el-input>
      </div>
      <div class="row">
        <label class="name-label">
          出生日期：
        </label>
        <el-date-picker
          v-model="birthDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="row">
        <label class="name-label">
          所在地：
        </label>
        <el-input v-model="address"></el-input>
      </div>
      <div class="row">
        <label class="name-label">
          故乡：
        </label>
        <el-input v-model="hometown"></el-input>
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
  name: 'Personal',
  data () {
    return {
      name: '',
      gender: '',
      birthDate: '',
      mobile: '',
      qqCode: '',
      address: '',
      hometown: ''
    }
  },
  methods: {
    submit: function () {
      const {
        name,
        gender,
        birthDate,
        mobile,
        qqCode,
        address,
        hometown
      } = this
      if (!name || !gender || !birthDate || !mobile || !qqCode || !address || !hometown) {
        this.$alert('请将内容填写完整', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.$http.post(this.$apis.setPersonal, {
        name,
        gender,
        birthDate,
        mobile,
        qqCode,
        address,
        hometown
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
    this.$http.get(this.$apis.getPersonal)
      .then(
        (data) => {
          const o = data.body
          const personal = o.data
          if (personal.length) {
            const myPersonal = personal[0]
            this.name = myPersonal.name
            this.address = myPersonal.address
            this.birthDate = myPersonal.birthDate
            this.mobile = myPersonal.mobile
            this.qqCode = myPersonal.qqCode
            this.gender = myPersonal.gender
            this.hometown = myPersonal.hometown
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

  label {
    width: 90px;
    line-height: 32px;
    font-size: 14px;
    color: #333;
  }

  .el-radio {
    width: 105px;
  }

  .el-input {
    width:240px;
  }

  .submit {
    margin-top: 10px;
    width: 100px;
  }
}
</style>
