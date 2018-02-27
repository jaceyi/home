<template>
  <div class="login">
    <div class="form">
      <p class="title">admin</p>
      <p>
        <el-input class="input" v-model="username" placeholder="请输入用户名"></el-input>
      </p>
      <p>
        <el-input class="input" type="password" v-model="password" placeholder="请输入密码"></el-input>
      </p>
      <p class="text">
        游客：账号<span>123456</span> / 密码<span>123456</span>
      </p>
      <p class="btn-box">
        <el-button type="primary" @click="handleClickLogin">
          Login
        </el-button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleClickLogin () {
      const {
        username,
        password
      } = this
      if (!username) {
        this.$message({
          message: '请输入用户名',
          type: 'warning'
        })
        return
      }
      if (!password) {
        this.$message({
          message: '请输入密码',
          type: 'warning'
        })
        return
      }
      this.$http.post(this.$apis.login, {
        username,
        password
      })
        .then(
          (data) => {
            const o = data.body
            if (o.code === 200) {
              this.$store.commit('setUserInfo', o.data)
              this.$router.push('/')
              this.$message({
                message: '登录成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: o.msg,
                type: 'warning'
              })
            }
          },
          (data) => {
            this.hanbleFail(data)
          }
        )
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url('http://yijic.com/public/images/bg/11.jpg') no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  width: 420px;
  padding: 20px 30px;
  background: rgba(255, 255, 255, 0.88);
  border-radius: 5px;

  .title {
    line-height: 1.2;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
  }

  p {
    margin-bottom: 10px;

    span {
      color: #409EFF;
    }
  }

  .text {
    font-size: 14px;
    margin-bottom: 20px;
    color: #333;
  }

  .btn-box {
    text-align: center;
  }
}
</style>
