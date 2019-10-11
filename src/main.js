// 入口文件
import Vue from 'vue'
// 导入并安装路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入并安装vuex
import Vuex from 'vuex'
Vue.use(Vuex)


var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: { 
    car: car 
  },
  mutations: { 
    addToCar(state, goodsinfo) {
      
      var flag = false

      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })

      
      if (!flag) {
        state.car.push(goodsinfo)
      }

      
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsinfo) {
      
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state, id) {
     
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true;
        }
      })
      
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
     
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: { // this.$store.getters.***
    
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0, // 勾选的数量
        amount: 0 // 勾选的总价
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})

// 导入时间格式化插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

// 导入vue-resource并安装
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 全局设置post时表单数据格式组织形式为：application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;


// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'


// 按需导入 Mint-UI 中的组件   
/* import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload); */
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


// 导入并安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


// 导入router.js路由模块
import router from './router.js'


// 导入App根组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router, 
  store
})