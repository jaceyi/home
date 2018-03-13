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

  .swiper-pagination {
    margin-bottom: -50px;
  }

  .item-content {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 36%;
    background: rgba(255, 255, 255, 0.8);
    padding: 80px 50px;
    transition: all 0.5s;

    .item-name {
      font-size: 24px;
      margin-bottom: 20px;
      transition: all 0.5s;
    }

    .item-date {
      font-size: 18px;
      color: #666;
    }

    .item-describe {
      margin-top: 30px;
      font-size: 14px;
      color: #333;
      line-height: 2;
      transition: all 0.5s;
      height: 260px;
      overflow: auto;
    }

    .item-link {
      margin-top: 30px;
      display: flex;
      flex-direction: row-reverse;

      a {
        height: 40px;
        line-height: 40px;
        padding: 0 17px;
        width: 140px;
        border-radius: 20px;
        background: #3CD3AD;
        font-size: 12px;
        transition: all 0.5s;
      }

      .icon {
        font-size: 14px;
        margin-left: 2px;
      }
    }

    &:hover {
      width: 60%;
      background: #fff;

      .item-name {
        font-size: 32px;
      }

      .item-describe {
        font-size: 16px;
      }

      .item-link {
        a {
          background: #4CB8C4;
        }
      }
    }
  }
</style>

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
            <div class="item-describe">
              {{ item.describe }}
            </div>
            <div class="item-link">
              <a :href="item.link" title="跳转到项目地址">
                跳转到项目地址
                <i class="icon iconfont icon-share"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
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
          describe: 'Design is the method of putting form and content together. Design, just as art, has multiple definitions there is no single definition. Design can be art. Design can be aesthetics. Design is so simple, that\'s why it is so complicated.',
          type: '游戏',
          link: '//baidu.com'
        },
        {
          id: 2,
          name: '腾讯',
          startDate: '0000-00-00',
          endDate: '0000-00-00',
          imgSrc: '//yijic.com/public/images/bg/12.jpg',
          describe: 'Design is the method of putting form and content together. Design, just as art, has multiple definitions there is no single definition. Design can be art. Design can be aesthetics. Design is so simple, that\'s why it is so complicated.',
          type: '游戏',
          link: '//baidu.com'
        }
      ],
      mainSwiper: {}
    }
  },
  mounted () {
    const mainSwiper = this.$refs.mainSwiper

    this.mainSwiper = new this.$Swiper(mainSwiper, {
      effect: 'coverflow',
      speed: 800,
      mousewheel: true,
      cubeEffect: {
        shadow: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    })

    bindDomResizeEvent(mainSwiper, () => {
      this.mainSwiper.update()
    })
  }
}
</script>
