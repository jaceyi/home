<template>
  <div class="works">
    <div class="item-box" ref="mainSwiper">
      <div class="swiper-wrapper">
        <div
          v-for="item in worksList"
          :key="item.id"
          class="swiper-slide works-item"
          :style="`background-image: url(${ item.imgSrc })`"
        >
          <div class="item-content">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-date">{{ `${ item.startDate } — ${ item.endDate }` }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  bindDomResizeEvent
} from '@/util/'

export default {
  name: 'Works',
  data () {
    return {
      worksList: [
        {
          id: 1,
          name: '阿里巴巴',
          startDate: '0000-00-00',
          endDate: '0000-00-00',
          imgSrc: '//yijic.com/public/images/bg/12.jpg',
          describe: 'this is alibaba',
          type: '游戏'
        },
        {
          id: 2,
          name: '腾讯',
          startDate: '0000-00-00',
          endDate: '0000-00-00',
          imgSrc: '//yijic.com/public/images/bg/12.jpg',
          describe: 'this is alibaba',
          type: '游戏'
        }
      ],
      mainSwiper: {}
    }
  },
  mounted () {
    const mainSwiper = this.$refs.mainSwiper

    this.mainSwiper = new this.$Swiper(mainSwiper, {
      effect: 'coverflow',
      cubeEffect: {
        shadow: false
      }
    })

    bindDomResizeEvent(mainSwiper, () => {
      this.mainSwiper.update()
    })
  }
}
</script>

<style lang="scss" scoped>
$mianColor: #00AEFF;
.works {
  background: none;
  box-shadow: none;
}

.item-box {
  width: 100%;
  height: 100%;
}

.works-item {
  display: flex;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.item-content {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 30%;
  background: rgba(255, 255, 255, 0.8);
  padding: 80px 50px;
  transition: all 0.5s;

  .item-name {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .item-date {
    font-size: 18px;
    color: #666;
  }

  &:hover {
    width: 60%;
    background: #fff;
  }
}
</style>
