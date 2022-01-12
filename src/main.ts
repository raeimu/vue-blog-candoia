import { createApp } from 'vue'
import App from './App.vue'
import './style/config.scss'
import './style/global.scss'
import './style/design/index.scss'
import {  useLight } from './utils/core'
useLight()
createApp(App).mount('#app')
