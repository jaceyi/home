<template>
  <div>
    <div class="write-head">
      留言板
    </div>
    <div class="write-form">
      <textarea class="write-form--text" name="textarea" rows="10"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Write'
}
</script>

<style lang="scss" scoped>
  .write-head {
    height: 60px;
    font-size: 24px;
    background: #fff;
    line-height: 60px;
    padding-left: 36px;
    position: relative;
    overflow: hidden;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 2;

    &::before {
      content: '';
      display: block;
      height: 22px;
      width: 5px;
      background: #00AEFF;
      position: absolute;
      left: 20px;
      top: 19px;
    }
  }

  .write-form {
    background: #fff;
    overflow: hidden;

    .write-form--text {
      width: 80%;
      display: block;
      margin: 30px auto;
      background: #fcfcfc;
      border-radius: 5px;
      resize: none;
      font-size: 18px;
      padding: 5px;
    }
  }
</style>
