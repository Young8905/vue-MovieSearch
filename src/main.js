import { createApp } from 'vue';
import App from './App';
import router from './routes/index.js'
import store from './store' // index.js파일은 상위 경로까지만 작성하면 불러오기 가능 
import loadImage from './plugins/loadImage'

createApp(App)
.use(router) //$route, $router
.use(store) //$store
.use(loadImage) //$loadImage
.mount('#app');