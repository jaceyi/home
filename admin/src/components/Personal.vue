<style lang="scss" scoped>
.personal {
  min-width: 350px;
}
.head {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}

.form {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  min-width: 700px;

  .left {
    width: 45%;
    padding: 0 20px;

    .el-textarea {
      width: 240px;
    }
  }

  .right {
    width: 55%;
    padding: 0 20px;

    h2 {
      font-size: 18px;
      padding-left: 20%;
      font-weight: 500;
      margin-bottom: 10px;
    }

    .row {
      justify-content: flex-start;
    }

    .el-input--prefix {
      width: 180px;
    }

    .el-textarea {
      width: 367px;
    }
  }
}

.work {
  .icon {
    display: block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    color: #fff;
    background: #409EFF;
    line-height: 32px;
    text-align: center;
    margin-left: 10px;
    margin-top: 5px;
    cursor: pointer;
    flex-shrink: 0;
  }

  .icon-add {
    right: 40px;
  }
}

.row {
  display: flex;
  width: 100%;
  margin-bottom: 15px;
  justify-content: center;
  position: relative;

  label {
    width: 90px;
    line-height: 32px;
    font-size: 14px;
    color: #333;
    flex-shrink: 0;
  }

  .el-radio {
    width: 50%;
    margin-left: 0;
  }

  .el-input {
    width:240px;
    display: flex;
  }

  .submit {
    margin-top: 10px;
    width: 100px;
  }
}
</style>

<template>
  <div class="personal">
    <div class="head">
      资料管理
    </div>
    <div class="form">
      <div class="left">
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
          <div class="el-input">
            <el-radio v-model="gender" label="1">男</el-radio>
            <el-radio v-model="gender" label="2">女</el-radio>
          </div>
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
            微信：
          </label>
          <el-input v-model="weChat"></el-input>
        </div>
        <div class="row">
          <label class="name-label">
            出生日期：
          </label>
          <el-date-picker
            v-model="birthDate"
            type="date"
            :editable="false"
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
          <label class="name-label">
            个人介绍：
          </label>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="introduce">
          </el-input>
        </div>
      </div>
      <div class="right">
        <h2>经历</h2>
        <div class="work" v-for="item in workList" :key="item.id">
          <div class="row">
            <label class="name-label">
              名称：
            </label>
            <el-input v-model="item.name"></el-input>
            <i class="iconfont icon icon-add"></i>
            <i class="iconfont icon icon-del"></i>
          </div>
          <div class="row">
            <label class="name-label">
              起始时间：
            </label>
            <el-date-picker
              v-model="item.startDate"
              type="date"
              :editable="false"
              placeholder="选择日期">
            </el-date-picker>-
            <el-date-picker
              v-model="item.endDate"
              type="date"
              :editable="false"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="row">
            <label class="name-label">
              经历描述：
            </label>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="item.introduce">
            </el-input>
          </div>
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
  name: 'Personal',
  data () {
    return {
      name: '',
      gender: '1',
      birthDate: '',
      mobile: '',
      qqCode: '',
      weChat: '',
      address: '',
      hometown: '',
      introduce: '',
      workList: [{
        id: 1,
        name: '',
        startDate: '',
        endDate: '',
        introduce: ''
      }]
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
        weChat,
        address,
        hometown
      } = this

      const _birthDate = this.formatDate(birthDate, 'yyyy-MM-dd')
      this.$http.post(this.$apis.setPersonal, {
        name,
        gender,
        birthDate: _birthDate,
        mobile,
        qqCode,
        weChat,
        address,
        hometown
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
    this.$http.get(this.$apis.getPersonal)
      .then(
        (data) => {
          const o = data.data
          if (o.code === 200) {
            const personal = o.data
            if (personal.length) {
              const myPersonal = personal[0]
              this.name = myPersonal.name
              this.address = myPersonal.address
              this.birthDate = myPersonal.birthDate
              this.mobile = myPersonal.mobile
              this.qqCode = myPersonal.qqCode
              this.weChat = myPersonal.weChat
              this.gender = myPersonal.gender
              this.hometown = myPersonal.hometown
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
