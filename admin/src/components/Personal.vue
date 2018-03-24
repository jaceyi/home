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
  border-bottom: 1px solid #EEE;
  padding: 20px 0;

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
        <div class="work" v-for="(item, index) in workList" :key="index">
          <div class="row">
            <label class="name-label">
              名称：
            </label>
            <el-input v-model="item.name"></el-input>
            <i
              class="iconfont icon icon-add"
              @click="addWork"
              v-show="index === workList.length - 1"
            ></i>
            <i
              class="iconfont icon icon-del"
              @click="delWork(index)"
              v-show="workList.length !== 1"
            ></i>
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
        hometown,
        introduce,
        workList
      } = this

      const isNull = workList.find((item) => {
        return !item.name || !item.startDate || !item.endDate || !item.introduce
      })

      if (isNull) {
        this.$message({
          message: '请将内容填写完整',
          type: 'warning'
        })
        return
      }

      const _workList = workList.map(item => {
        return {
          ...item,
          startDate: this.formatDate(item.startDate, 'yyyy-MM-dd'),
          endDate: this.formatDate(item.endDate, 'yyyy-MM-dd')
        }
      })

      const _birthDate = this.formatDate(birthDate, 'yyyy-MM-dd')
      this.$http.post(this.$apis.setPersonal, {
        name,
        gender,
        birthDate: _birthDate,
        mobile,
        qqCode,
        weChat,
        address,
        hometown,
        introduce,
        workList: _workList
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
    },
    addWork () {
      const workList = this.workList
      if (workList.length >= 10) {
        this.$message({
          message: '太多了，不要在加了！',
          type: 'warning'
        })
        return
      }
      workList.push({
        name: '',
        startDate: '',
        endDate: '',
        introduce: ''
      })
    },
    delWork (index) {
      const workList = this.workList
      const startArr = workList.slice(0, index)
      const endArr = workList.slice(index + 1)
      this.workList = startArr.concat(endArr)
    }
  },
  mounted () {
    this.$http.get(this.$apis.getPersonal)
      .then(
        (data) => {
          const o = data.data
          if (o.code === 200) {
            const personal = o.data
            const myPersonal = personal[0]
            this.name = myPersonal.name
            this.address = myPersonal.address
            this.birthDate = myPersonal.birthDate
            this.mobile = myPersonal.mobile
            this.qqCode = myPersonal.qqCode
            this.weChat = myPersonal.weChat
            this.gender = myPersonal.gender
            this.hometown = myPersonal.hometown
            this.introduce = myPersonal.introduce

            const workList = JSON.parse(myPersonal.workList)
            if (workList.length) {
              this.workList = workList
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
