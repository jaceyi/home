// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import apis from './apis'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Dialog,
  Menu,
  MenuItem,
  Input,
  Radio,
  Slider,
  Select,
  Option,
  Button,
  Form,
  FormItem,
  Table,
  TableColumn,
  DatePicker,
  Container,
  Header,
  Aside,
  Main,
  Loading,
  Message,
  MessageBox
} from 'element-ui'

Vue.use(VueResource)

Vue.use(Dialog)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Slider)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.prototype.$apis = apis
Vue.prototype.$store = store

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    hanbleFail (data) {
      // 处理请求失败
      const o = data.body
      if (typeof o === 'object') {
        if (o.code === 401) {
          this.$router.push('/login')
        }
        this.$message({
          message: o.msg,
          type: 'warning'
        })
      } else {
        this.$message({
          message: data.status,
          type: 'warning'
        })
      }
    },
    formatDate (myDate, format) {
      // 格式化时间 format yyyy-MM-dd hh:mm:ss
      myDate = new Date(myDate)
      const o = {
        'M+': myDate.getMonth() + 1,
        'd+': myDate.getDate(),
        'h+': myDate.getHours(),
        'm+': myDate.getMinutes(),
        's+': myDate.getSeconds(),
        'q+': Math.floor((myDate.getMonth() + 3) / 3),
        'S': myDate.getMilliseconds()
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (myDate.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return format
    },
    deleteItem (arr, index) {
      // 删除 数组内某一个元素
      const startArr = arr.slice(0, index)
      const endArr = arr.slice(index + 1)
      return startArr.concat(endArr)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
