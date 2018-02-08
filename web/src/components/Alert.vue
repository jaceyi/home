<template>
  <div class="alert">
    <div class="alert-box">
      <div class="alert-title">{{ options.title }}</div>
      <div class="alert-content">{{ options.content }}</div>
      <div class="alert-btn--box">
        <div class="alert-btn">确认</div>
        <div class="alert-btn">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['options'],
  mounted () {
    console.log(this.options)
  }
}
</script>

<style lang="scss" scoped>
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
  width: 30%;
  background: #fff;
  border-radius: 6px;
}

.alert-title {
  padding: 6px 10px;
}

.alert-content {
  padding: 20px 10px;
  text-align: center;
}

.alert-btn--box {
  display: flex;
  justify-content: flex-end;
}

.alert-btn {
  padding: 10px 15px;
}
</style>
