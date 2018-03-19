<style lang="scss" scoped>
  .ability {
    display: flex;
    color: #fff;
    justify-content: space-around;
    border-bottom: 3px solid rgba(255,255,255,0.5);
  }

  .ability-item {
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;

    .line {
      height: 0%;
      width: 40px;
      background: rgba(255,255,255,0.5);
    }

    span {
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <div class="ability">
    <div
      class="ability-item"
      v-for="item in abilityList"
      :key="item.id"
    >
      <div class="line" :style="`height:${ item.value }%`"></div>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ability',
  data () {
    return {
      abilityList: [
        {
          id: 1,
          name: 'JavaScript',
          value: 66
        },
        {
          id: 2,
          name: 'Vue',
          value: 88
        },
        {
          id: 3,
          name: 'React',
          value: 77
        },
        {
          id: 4,
          name: 'Photoshop',
          value: 77
        },
        {
          id: 5,
          name: 'HTML&CSS',
          value: 66
        },
        {
          id: 6,
          name: 'jQuery',
          value: 66
        },
        {
          id: 7,
          name: 'Node.js',
          value: 66
        }
      ]
    }
  },
  mounted () {
    this.$store.commit('changeBgUrlNum', 11)
  }
}
</script>
