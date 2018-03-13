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
              <p><span>年龄：</span>{{ personal.age }}</p>
              <p><span>性别：</span>{{ personal.gender === '1' ? '男' : '女' }}</p>
              <p><span>电话：</span>{{ personal.mobile }}</p>
              <p><span>QQ：</span>{{ personal.qqCode }}</p>
              <p><span>微信：</span>{{ personal.weChat }}</p>
              <p><span>地址：</span>{{ personal.address }}</p>
              <p><span>故乡：</span>{{ personal.hometown }}</p>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="info">
              <p>{{ personal.brief }}</p>
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
          <div class="swiper-slide">
            one
          </div>
          <div class="swiper-slide">
            two
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
      personal: {
        name: '易进春',
        age: '20',
        gender: '1',
        mobile: '18392866863',
        qqCode: '6498601',
        weChat: 'sg6498601',
        address: '上海 普陀',
        hometown: '陕西 西安',
        brief: 'Design is the method of putting form and content together. Design, just as art, has multiple definitions there is no single definition. Design can be art. Design can be aesthetics. Design is so simple, that\'s why it is so complicated.'
      },
      experiences: [
        {
          id: 1,
          name: '新华电脑软件学习',
          startDate: '2018-01-02',
          endDate: '2018-01-02'
        },
        {
          id: 2,
          name: '未英网络科技有限公司',
          startDate: '2018-01-02',
          endDate: '2018-01-02'
        }
      ],
      leftSwiper: {},
      rightSwiper: {},
      moveLeft: true,
      moveRight: false
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
  mounted () {
    const leftSwiper = this.$refs.leftSwiper
    const rightSwiper = this.$refs.rightSwiper

    this.leftSwiper = new this.$Swiper(leftSwiper, {
      loop: true,
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
      loop: true,
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
