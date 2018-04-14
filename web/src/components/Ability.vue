<style lang="scss" scoped>
  .ability {
    display: flex;
    color: #fff;
    justify-content: space-around;
    border-bottom: 3px solid rgba(255,255,255,0.5);
  }

  .title {
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 10%;
    color: #fff;
    font-size: 14px;
    width: 1000px;
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
    <div class="title">{{ introduce }}</div>
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
      abilityList: [],
      introduce: ''
    }
  },
  mounted () {
    this.$store.commit('changeBgUrlNum', 11)

    this.$http.get(this.$apis.getAbility)
      .then(
        (data) => {
          const o = data.data
          if (o.code === 200) {
            const myData = JSON.parse(o.data)
            let {
              introduce,
              abilityList
            } = myData

            if (abilityList.length) {
              this.abilityList = abilityList
            }

            this.introduce = introduce || ''
          } else {
            this.message({
              content: o.msg
            })
          }
        }
      )
      .catch(() => {
        this.message({
          content: '获取技能列表失败，请重试'
        })
      })
  }
}
</script>
