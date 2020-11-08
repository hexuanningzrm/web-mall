// 插件
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 组件
// import env from './env'
import App from './App.vue'
import router from './router'
import store from './store'


// 根据前端的跨域方式做调整 /a/b : /api/a/b => /a/b
// axios.defaults.baseURL = 'https://www.fastmock.site/mock/4b6ca3cd7d90a5fe850f9d98e64900cb/api';
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000; // 超时时间

// 根据环境变量获取不同的请求地址
// axios.defaults.timeout = env.baseUrl;

// 接口错误拦截
axios.interceptors.response.use(function (response) {
    let res = response.data;
    // hash 属性是一个可读可写的字符串，该字符串是 URL 的锚部分（从 # 号开始的部分）
    let path = location.hash;
    if (res.status == 0) {
        return res.data;
    } else if (res.status == 10) {
        if (path != '#/index') {
            // href 属性是一个可读可写的字符串，可设置或返回当前显示的文档的完整 URL
            window.location.href = '/#/login';
            // 返回一个带有拒绝原因的Promise对象
            return Promise.reject(res);
        }
    } else {
        this.$message.warning(res.msg);
        // 返回一个带有拒绝原因的Promise对象
        return Promise.reject(res);
    }
    // 拦截http请求错误码
}, (error) => {
    let res = error.response;
    Message.error(res.data.message);
    return Promise.reject(error);
});





Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad,{
    loading:'/imgs/loading-svg/loading-bars.svg'
});
Vue.prototype.$message = Message;

new Vue({
    store: store,
    router: router,
    render: h => h(App),
}).$mount('#app');
