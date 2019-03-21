import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from '@/utils/request' // axios 不建议引入到 Vue 原型链上

import './core/use'
import bootstrap from './core/bootstrap'
import '@/permission' // permission control
import '@/utils/filter' // global filter

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false

// 使用富文本编辑器
Vue.use(VueQuillEditor)

Vue.use(VueAxios, router)

new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
