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
          :style="`background-image: url(${ item.imgSrc ? '//yijic.com' + item.imgSrc : defaultImgSrc })`"
        >
          <div class="item-content">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-date">{{ `${ item.startDate } — ${ item.endDate }` }}</div>
            <div class="item-describe" v-html="item.describe"></div>
            <div v-if="item.link" class="item-link">
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
      defaultImgSrc: '//yijic.com/public/images/bg/12.jpg',
      worksList: [],
      mainSwiper: {},
      page: 1
    }
  },
  watch: {
    worksList () {
      this.$nextTick(() => {
        this.mainSwiper.update()
      })
    }
  },
  mounted () {
    this.$http.get(this.$apis.getWorks + '?page=' + this.page)
      .then(
        (data) => {
          const o = data.data
          if (o.code === 200) {
            const worksList = o.data
            if (worksList.length) {
              this.worksList = worksList
            }
          } else {
            this.message({
              content: o.msg
            })
          }
        }
      )
      .catch(() => {
        this.message({
          content: '获取作品列表失败，请重试'
        })
      })

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
