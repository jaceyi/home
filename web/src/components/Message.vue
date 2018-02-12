<template>
  <div class="message">
    {{ content }}
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: ['options'],
  data () {
    return {
      content: this.options.content || '',
      time: this.options.time || 1600
    }
  },
  mounted () {
    setTimeout(() => {
      this.$store.commit('messageHide')
    }, this.time)
  }
}
</script>

<style lang="scss" scoped>
$mianColor: #00AEFF;
.message {
  position: absolute;
  left: 50%;
  top: 30vh;
  transform: translateX(-50%);
  width: 380px;
  padding: 15px 20px;
  background: rgba(0,0,0,0.5);
  border-radius: 5px;
  z-index: 98;
  text-align: center;
  color: #fff;
}
</style>
