<style lang="scss" scoped>

</style>

<template>
  <div ref="canvasFather">
    ability
  </div>
</template>

<script>
import LineFlashing from '../assets/js/LineFlashing'
import {
  bindDomResizeEvent
} from '../util/'

export default {
  name: 'Ability',
  data () {
    return {
      LineFlashing: {}
    }
  },
  mounted () {
    this.$store.commit('changeBgUrlNum', 11)
    const canvasFather = this.$refs.canvasFather

    this.LineFlashing = new LineFlashing(canvasFather, {
      className: 'canvas'
    })

    this.LineFlashing.init([
      {
        name: 'JavaScript',
        value: 55
      }
    ])

    bindDomResizeEvent(canvasFather, () => {
      this.LineFlashing.initSize()
    })
  }
}
</script>
