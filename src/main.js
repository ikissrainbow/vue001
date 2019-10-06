// 入口文件
import Vue from 'vue'
// 导入vue-router并安装
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入vue-resource并安装
import VueResource from 'vue-resource'
Vue.use(VueResource)


// 导入mui
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入mint-ui
import { Header, Swipe, SwipeItem  } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import router from './router.js'
import app from './App.vue'
var vm = new Vue({
    el: '#app',
    render:c => c(app),
    router
})