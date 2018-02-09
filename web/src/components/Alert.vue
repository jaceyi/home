<template>
  <div class="alert">
    <div class="alert-box">
      <div class="alert-header">
        <p>{{ title }}</p>
        <div class="close" @click="handleClose">
          <i class="icon iconfont icon-add"></i>
        </div>
      </div>
      <div class="alert-content">{{ content }}</div>
      <div class="alert-btns">
        <button v-if="btns[0]" class="main-btn alert-btn confirm" @click="handleConfirm">{{ btns[0] }}</button>
        <button v-if="btns[1]" class="main-btn alert-btn cancel" @click="handleCancel">{{ btns[1] }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['options'],
  data () {
    return {
      title: this.options.title || '提示',
      content: this.options.content || '',
      btns: this.options.btns || ['确认']
    }
  },
  methods: {
    handleClose: function () {
      const closeCb = this.options.closeCb
      if (closeCb) closeCb()
      this.$store.commit('alertHide')
    },
    handleConfirm: function () {
      const confirmCb = this.options.confirmCb
      if (confirmCb) confirmCb()
      this.$store.commit('alertHide')
    },
    handleCancel: function () {
      const cancelCb = this.options.cancelCb
      if (cancelCb) cancelCb()
      this.$store.commit('alertHide')
    }
  }
}
</script>

<style lang="scss" scoped>
$mianColor: #00AEFF;
.alert {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.36);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert-box {
  width: 420px;
  background-color: #fff;
  border-radius: 4px;
  vertical-align: middle;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,0,0,0.2)
}

.alert-header {
  padding: 15px;
  line-height: 1;
  font-size: 18px;
  color: #333;
  position: relative;

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    transform: rotate(45deg);
    cursor: pointer;
  }
}

.alert-content {
  position: relative;
  padding: 15px;
  color: #666;
  font-size: 14px;
}

.alert-btns {
  display: flex;
  justify-content: flex-end;
  padding: 5px 15px 10px;
}

.alert-btn {
  margin-left: 10px;

  &.confirm {
    background: $mianColor;
    color: #fff;
  }

  &.cancel {
    background: #f6f6f6;
    border-color: #DDD;

    &:hover {
      color: #000;
    }
  }
}
</style>
