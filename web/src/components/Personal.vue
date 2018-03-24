<style lang="scss" scoped>
  $mianColor: #00AEFF;

  .personal {
    display: flex;
    box-shadow: none;
    background: none;
  }

  .left {
    flex-grow: 1;
    width: 28%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    transition: width 0.6s;

    &.active {
      width: 72%;
    }

    .swiper-slide {
      position: relative;
      background: url(../assets/images/12.jpg) no-repeat center;
    }

    .info {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);

      p {
        width: 100%;
        font-size: 14px;
        line-height: 2;
        color: #fff;
      }

      span {
        display: inline-block;
        width: 70px;
      }
    }
  }

  .right {
    flex-grow: 1;
    width: 28%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    transition: width 0.6s;

    &.active {
      width: 72%;
    }

    .swiper-slide {
      position: relative;
      background: url(../assets/images/14.jpg) no-repeat center;
      padding: 300px 20%;
    }

    .date {
      display: flex;
      flex-wrap: wrap;
      font-size: 32px;
      color: #fff;

      i {
        margin: 0 10px;
      }
    }

    .name {
      font-size: 24px;
      color: #fff;
      margin-top: 20px;
    }

    .introduce {
      margin-top: 30px;
      color: #fff;
      line-height: 2;
    }
  }

  .swiper-contaoner {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .left-swiper-pagination, .right-swiper-pagination {
    position: absolute;
    z-index: 2;
    text-align: center;
  }
</style>

<template>
  <div class="personal">
    <div
    :class="`left ${ moveLeft ? 'active': '' }`"
    v-on:mouseenter="handleMoveLeft">
      <div class="swiper-contaoner" ref="leftSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="info">
              <p><span>姓名：</span>{{ personal.name }}</p>
              <p><span>年龄：</span>{{ age }}</p>
              <p><span>性别：</span>{{ personal.gender && (Number(personal.gender) === 1 ? '男' : '女') }}</p>
              <p><span>电话：</span>{{ personal.mobile }}</p>
              <p><span>QQ：</span>{{ personal.qqCode }}</p>
              <p><span>微信：</span>{{ personal.weChat }}</p>
              <p><span>地址：</span>{{ personal.address }}</p>
              <p><span>故乡：</span>{{ personal.hometown }}</p>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="info">
              <p>{{ personal.introduce }}</p>
            </div>
          </div>
        </div>
        <div class="left-swiper-pagination"></div>
      </div>
    </div>
    <div
    :class="`right ${ moveRight ? 'active': '' }`"
    v-on:mouseenter="handleMoveRight">
      <div class="swiper-contaoner" ref="rightSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in workList" :key="index">
            <div class="date">
              <span>{{ item.startDate }}</span><i>-</i>
              <span>{{ item.endDate }}</span>
            </div>
            <div class="name">{{ item.name }}</div>
            <div class="introduce">{{ item.introduce }}</div>
          </div>
        </div>
        <div class="right-swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  bindDomResizeEvent
} from '@/util/'

export default {
  name: 'Personal',
  data () {
    return {
      personal: {},
      leftSwiper: {},
      rightSwiper: {},
      moveLeft: true,
      moveRight: false,
      workList: []
    }
  },
  methods: {
    handleMoveLeft () {
      this.moveRight = false
      this.moveLeft = true
    },
    handleMoveRight () {
      this.moveLeft = false
      this.moveRight = true
    }
  },
  computed: {
    age () {
      const birthDate = this.personal.birthDate
      if (birthDate) {
        const oldYear = new Date(birthDate).getFullYear()
        const yeay = new Date().getFullYear()
        return yeay - oldYear
      }
    }
  },
  watch: {
    workList () {
      this.$nextTick(() => {
        this.rightSwiper.update()
      })
    }
  },
  mounted () {
    this.$http.get(this.$apis.getPersonal)
      .then(
        (data) => {
          const o = data.data
          const workList = JSON.parse(o.data[0].workList)
          this.personal = {
            ...o.data[0]
          }
          this.workList = workList
        }
      )
      .catch((error) => {
        console.log(error)
      })

    const leftSwiper = this.$refs.leftSwiper
    const rightSwiper = this.$refs.rightSwiper

    this.leftSwiper = new this.$Swiper(leftSwiper, {
      effect: 'cube',
      mousewheel: true,
      speed: 600,
      cubeEffect: {
        shadow: false
      },
      pagination: {
        el: '.left-swiper-pagination',
        clickable: true
      }
    })
    this.rightSwiper = new this.$Swiper(rightSwiper, {
      effect: 'cube',
      speed: 600,
      mousewheel: true,
      cubeEffect: {
        shadow: false
      },
      pagination: {
        el: '.right-swiper-pagination',
        clickable: true
      }
    })
    bindDomResizeEvent(leftSwiper, () => {
      this.leftSwiper.update()
      this.leftSwiper.pagination.render()
      this.leftSwiper.pagination.update()
    })
    bindDomResizeEvent(rightSwiper, () => {
      this.rightSwiper.update()
      this.rightSwiper.pagination.render()
      this.rightSwiper.pagination.update()
    })
  }
}
</script>
