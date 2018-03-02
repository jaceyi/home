<template>
  <div class="personal">
    <div class="page-head personal-head">
      <span>个人栈</span>
    </div>
    <div class="personal-content">
      <div class="left">
        <div class="row">
          <p><span>姓名</span>{{ personal.name }}</p>
          <p><span>年龄</span>{{ personal.age }}</p>
        </div>
        <div class="row">
          <p><span>性别</span>{{ personal.gender === '1' ? '男' : '女' }}</p>
          <p><span>手机号</span>易进春</p>
        </div>
        <div class="row">
          <p><span>QQ</span>{{ personal.qqCode }}</p>
          <p><span>所在地</span>{{ personal.address }}</p>
        </div>
        <div class="row">
          <p><span>故乡</span>{{ personal.hometown }}</p>
        </div>
        <div class="row">
          <p class="brief"><span>简介</span>{{ personal.brief }}</p>
        </div>
      </div>
    </div>
    <div class="page-head experiences-head">
      <span>过往</span>
    </div>
  </div>
</template>

<script>
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
        address: '上海 普陀',
        hometown: '陕西 西安',
        brief: '大家好啊大家好啊大家好啊大家好啊大家好啊大家好啊大家好啊大家好啊大家好啊大家好啊大家好啊大家好啊'
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
          name: '新华电脑软件学习',
          startDate: '2018-01-02',
          endDate: '2018-01-02'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$mianColor: #00AEFF;
.personal {
  background: #fff;
}
.personal-content {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #EEE;

  .left {
    width: 700px;
    padding: 60px 120px;

    p {
      margin-bottom: 10px;
      min-width: 50%;
      display: flex;
    }

    span {
      color: #666;
      min-width: 30px;
      display: inline-block;
      margin-right: 10px;
      font-size: 14px;
      padding-top: 2px;
    }

    .row {
      display: flex;
    }

    .brief {
      line-height: 26px;
      margin-top: 10px;
    }
  }
}

.experiences-head {
  box-shadow: none;
  font-size: 18px;
  padding-left: 50px;

  &::after {
    height: 18px;
    left: 34px;
    top: 21px;
  }
}
</style>
