<template>
  <div v-on:scroll="handleScroll">
    <div class="write-container" ref="content">
      <div class="page-head write-head">
        <span>留言板</span>
        <div class="portrait" v-if="portraitUrl" :style="`background-image: url(${portraitUrl})`"></div>
      </div>
      <div class="write-form">
        <textarea class="write-form--text" v-model="contentText" name="textarea" rows="10" maxlength="1024" placeholder="请输入留言内容"></textarea>
        <div class="write-form--box">
          <div class="left">
            <label>
              昵称：<input v-model="userName" type="text" placeholder="请输入昵称" maxlength="20">
            </label>
            <label>
              QQ号码：<input v-model="qqCode" type="number" placeholder="请输入QQ号码" maxlength="11" v-on:blur="getPortraitUrl">
            </label>
          </div>
          <div class="right">
            <label>
              <input type="number" v-model="checkCode" v-on:focus="focusCheck" :placeholder="checkPlacehoder" maxlength="2">
            </label>
            <button class="main-btn" @click="handleSubmit">提交</button>
          </div>
        </div>
      </div>
      <div class="write-list">
        <div class="head">
          总留言条数100条
        </div>
        <div class="list" v-for="write in writeList" :key="write.id">
          <div class="left">
            <img class="img" :src="write.img || defaultPortraitUrl" alt="">
          </div>
          <div class="right">
            <div class="list-title">
              <h2 class="name">{{ write.name }}</h2>
              <p class="time">{{ write.time }}</p>
            </div>
            <div class="list-content">
              {{ write.content }}
            </div>
            <div class="list-reply" v-for="reply in write.reply" :key="reply.id">
              <div class="name">{{ reply.name }}：</div>
              <div class="text">{{ reply.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Write',
  data () {
    return {
      qqCode: '',
      portraitUrl: '',
      defaultPortraitUrl: '//yijic.com/public/images/noimg.png',
      userName: '',
      contentText: '',
      checkCode: '',
      checkCodeTrue: '',
      checkPlacehoder: '获取验证码',
      writeList: [],
      page: 1,
      blocker: true
    }
  },
  methods: {
    getPortraitUrl () {
      const qqCode = this.qqCode
      if (qqCode && qqCode.length >= 5 && qqCode.length <= 11) {
        this.portraitUrl = 'http://q.qlogo.cn/headimg_dl?bs=qq&dst_uin=' + qqCode + '&spec=100'
      }
    },
    focusCheck () {
      const x = Math.floor(Math.random() * 10 + 1)
      const y = Math.floor(Math.random() * 10 + 1)
      const z = x + y
      this.checkCode = ''
      this.checkPlacehoder = x + '+' + y + '=?'
      this.checkCodeTrue = String(z)
    },
    handleScroll (e) {
      const dom = e.target
      const top = dom.scrollTop
      const height = dom.offsetHeight
      const height_ = this.$refs.content.offsetHeight
      const top_ = height_ * (1 - height / height_) - 100
      if (top >= top_ && this.blocker) {
        this.blocker = false
        this.page += 1
        this.getWordList()
      }
    },
    alert (options) {
      this.$store.commit('alert', options)
    },
    message (options) {
      this.$store.commit('message', options)
    },
    handleSubmit () {
      const name = this.userName
      const contentText = this.contentText
      const portraitUrl = this.portraitUrl
      const self = this

      if (!this.checkCode) {
        this.message({
          content: '请输入验证码'
        })
        return
      }
      if (this.checkCode !== this.checkCodeTrue) {
        this.message({
          content: '请输入验验证码输入错误证码'
        })
        return
      }
      if (!name) {
        this.message({
          content: '请输入昵称'
        })
        return
      }
      if (!contentText) {
        this.message({
          content: '请输入留言内容'
        })
        return
      }
      if (!portraitUrl) {
        this.alert({
          content: '你还没有输入QQ号获取头像，请确认是否提交',
          btns: ['确认', '取消'],
          confirmCb: () => {
            startRequest()
          }
        })
      } else {
        startRequest()
      }

      function startRequest () {
        self.$http.post(self.$apis.writeWord, {
          name: name,
          img: portraitUrl,
          content: contentText
        })
          .then(
            (data) => {
              const o = data.body
              this.message({
                content: o.msg
              })
              this.checkCode = ''
              if (o.code === 200) {
                self.writeList.unshift(o.data)
              }
            },
            (data) => {
              console.log(data)
              this.message({
                content: '留言失败，请重试'
              })
            }
          )
      }
    },
    getWordList () {
      this.$http.get(this.$apis.wordList + '?page=' + this.page)
        .then(
          (data) => {
            const o = data.body
            if (o) {
              this.writeList = this.writeList.concat(o.data)
              if (o.data.length) {
                this.blocker = true
              } else {
                this.message({
                  content: '已经加载完全部内容'
                })
              }
            }
          },
          (data) => {
            console.log(data)
          }
        )
    }
  },
  mounted () {
    this.getWordList()
  }
}
</script>

<style lang="scss" scoped>
  $borderStyle: 1px solid #CCC;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .write-head {
    position: relative;

    .portrait {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      position: absolute;
      top: 5px;
      right: 5px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border: 1px solid #ccc;
    }
  }

  .write-form {
    background: #fff;
    overflow: hidden;
  }

  .write-form--text {
    width: 80%;
    display: block;
    margin: 30px auto 20px;
    resize: none;
    font-size: 18px;
    padding: 5px;
    border: $borderStyle;
    font-family: '微软雅黑';
  }

  .write-form--box {
    width: 80%;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;

    input {
      height: 32px;
      padding: 0 5px;
      width: 160px;
      border: $borderStyle;
    }

    .left {
      display: flex;

      label {
        margin-right: 20px;
      }
    }

    .right {
      display: flex;

      input {
        width: 120px;
      }

      label {
        margin-right: 10px;
      }
    }
  }

  .write-list {
    margin-top: 30px;

    .head {
      padding: 10px 5%;
      font-size: 18px;
      background: #fff;
      border-bottom: $borderStyle;
    }

    .list {
      min-height: 150px;
      margin-bottom: 16px;
      background: #fff;
      display: flex;
      padding: 10px 5%;
    }

    .left {
      height: 60px;
      width: 60px;
      border-radius: 50%;
      overflow: hidden;
      border: $borderStyle;
      flex-shrink: 0;
    }

    .right {
      margin-left: 20px;
      display: flex;
      flex-wrap: wrap;
      flex-shrink: 1;
      flex-grow: 1;
    }
  }

  .list-title {
    width: 100%;
    padding: 5px 10px;

    h2 {
      font-size: 20px;
      font-weight: 400;
      width: 100%;
    }

    p {
      color: #666;
      width: 100%;
      margin-top: 5px;
      font-size: 14px;
    }
  }

  .list-content {
    width: 100%;
    padding: 20px 6%;
    text-align: center;
  }

  .list-reply {
    display: flex;
    width: 100%;
    padding: 10px;
    border-top: 1px solid #f3f3f3;

    .name {
      color: #333;
      flex-shrink: 0;
    }

    .text {
      padding: 0 5px;
      color: #666;
      font-size: 14px;
    }
  }
</style>
