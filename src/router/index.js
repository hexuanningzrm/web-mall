import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Index from '../pages/Index'


Vue.use(Router);

export default new Router({
    routes: [
        {
            // 首页
            path: '/',
            name: 'home',
            component: Home,
            // 重定向默认路径
            redirect: '/Index',
            children: [
                {
                    // 商品主页
                    path: '/index',
                    name: 'Index',
                    component: Index
                }, {
                    // 商品详情
                    path: '/product/:id',
                    name: 'Product',
                    component: () => import('../pages/Product.vue')
                }, {
                    // 商品列表
                    path: '/detail/:id',
                    name: 'Detail',
                    component: () => import('../pages/Detail.vue')
                }
            ]
        }, {
            // 登录
            path: '/login',
            name: 'Login',
            component: () => import('../pages/Login.vue')
        }, {
            // 注册
            path: '/registered',
            name: 'Registered',
            component: () => import('../pages/Registered.vue')
        }, {
            // 购物车
            path: '/cart',
            name: 'Cart',
            component: () => import('../pages/Cart.vue')
        }, {
            // 订单
            path: '/order',
            name: 'Order',
            component: () => import('../pages/Order.vue'),
            children: [
                {
                    // 订单列表
                    path: 'list',
                    name: 'OrderList',
                    component: () => import('../pages/OrderList.vue')
                }, {
                    // 订单确认
                    path: 'confirm',
                    name: 'OrderConfirm',
                    component: () => import('../pages/OrderConfirm.vue')
                }, {
                    // 订单支付
                    path: 'pay',
                    name: 'OrderPay',
                    component: () => import('../pages/OrderPay.vue')
                }, {
                    // 支付宝支付跳转
                    path: 'aliPay',
                    name: 'OrderAliPay',
                    component: () => import('../pages/OrderAliPay.vue')
                }
            ]
        }
    ]
})
