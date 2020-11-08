<template>
    <div class="Index">
        <div class="container">
            <!--首页轮播位-->
            <div class="swiper-box">
                <!--首页轮播菜单-->
                <nav class="nav-menu">
                    <ul class="menu-wrap">
                        <!--菜单列表-->
                        <li class="menu-item">
                            <a href="#">手机 电话卡</a>
                            <!--菜单内容-->
                            <div class="children">
                                <!--循环菜单内容-->
                                <ul v-for="(item, i) in menuList" v-bind:key="i">
                                    <li v-for="(sub, j) in item" v-bind:key="j">
                                        <a v-bind:href="sub ? '/#/product/' + sub.id : ''">
                                            <img v-bind:src="sub ? sub.img : '/imgs/digital/menuList-1.png'"
                                                alt="">
                                            <span>{{sub ? sub.name : '小米9'}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="menu-item">
                            <a href="#">电视 盒子</a>
                        </li>
                        <li class="menu-item">
                            <a href="#">笔记本 平板</a>
                        </li>
                        <li class="menu-item">
                            <a href="#">家电 插线板</a>
                        </li>
                        <li class="menu-item">
                            <a href="#">出行 穿戴</a>
                        </li>
                        <li class="menu-item">
                            <a href="#">智能 路由器</a>
                        </li>
                        <li class="menu-item">
                            <a href="#">电源 配件</a>
                        </li>
                        <li class="menu-item">
                            <a href="#">生活 箱包</a>
                        </li>
                        <li class="menu-item">
                            <a href="#">耳机 音箱</a>
                        </li>
                        <li class="menu-item">
                            <a href="#">健康 儿童</a>
                        </li>
                    </ul>
                </nav>
                <!--轮播幻灯片-->
                <swiper v-bind:options="swiperOption">
                    <!--循环幻灯片-->
                    <swiper-slide v-for="(item, index) in slideList" v-bind:key="index">
                        <a v-bind:href="'/#/product/'+item.id">
                            <img v-bind:src="item.img">
                        </a>
                    </swiper-slide>
                    <!--分页器-->
                    <div class="swiper-pagination" slot="pagination"></div>
                    <!--左箭头-->
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <!--右箭头-->
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
            <!--首页广告位-->
            <div class="advertising-box">
                <!--六个活动-->
                <div class="six-activity">
                    <ul class="activity-list clearFix">
                        <li class="activity-1">
                            <a href="#"><img src="/imgs/icon/icon-activity-1.png"></a>
                        </li>
                        <li class="activity-2">
                            <a href="#"><img src="/imgs/icon/icon-activity-2.png"></a>
                        </li>
                        <li class="activity-3">
                            <a href="#"><img src="/imgs/icon/icon-activity-3.png"></a>
                        </li>
                        <li class="activity-4">
                            <a href="#"><img src="/imgs/icon/icon-activity-4.png"></a>
                        </li>
                        <li class="activity-5">
                            <a href="#"><img src="/imgs/icon/icon-activity-5.png"></a>
                        </li>
                        <li class="activity-6">
                            <a href="#"><img src="/imgs/icon/icon-activity-6.png"></a>
                        </li>
                    </ul>
                </div>
                <!--三个活动-->
                <a class="three-activity" v-bind:href="'/#/product/'+item.id" v-for="(item, index) in adsList"
                   v-bind:key="index">
                    <img v-bind:src="item.img" alt="">
                </a>
            </div>
        </div>
        <!--首页数码产品位-->
        <div class="DigitalProducts-box">
            <div class="container">
                <!--手机商品位-->
                <div class="phone-box">
                    <!--手机列表-->
                    <div class="phone-list">
                        <div class="list-title">
                            <!--左侧标题-->
                            <h2>手机</h2>
                            <!--右侧查看全部-->
                            <a class="look-all">
                                <span class="look-title">查看全部</span>
                                <!--圆点背景色-->
                                <span class="look-bg">
                                    <!--右箭头图标-->
                                    <i></i>
                                </span>
                            </a>
                        </div>
                        <div class="list-wrapper">
                            <!--左侧广告位-->
                            <div class="banner-left">
                                <a href="/#/product/35">
                                    <img src="/imgs/digital/phoneList-2.jpg" alt="">
                                </a>
                            </div>
                            <!--右侧手机商品-->
                            <div class="list-box">
                                <!--循环手机商品内容-->
                                <div class="list" v-for="(arr, i) in phoneList" v-bind:key="i">
                                    <div class="item" v-for="(item, j) in arr" v-bind:key="j">
                                        <!--标签-->
                                        <span v-bind:class="{'new-pro' : j%2==0}">新品</span>
                                        <!--商品图片-->
                                        <div class="item-img">
                                            <img v-lazy="item.mainImage" alt="">
                                        </div>
                                        <div class="item-info">
                                            <!--商品名称-->
                                            <h3>{{item.name}}</h3>
                                            <!--商品描述-->
                                            <p class="describe">{{item.subtitle}}</p>
                                            <!--商品价格-->
                                            <p class="price" v-on:click="addCart(item.id)">{{item.price}}元</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--手机banner-->
                    <div class="phone-banner">
                        <div class="container">
                            <a href="/#/product/30">
                                <img src="/imgs/digital/phoneList-1.jpg" alt="">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ServiceBar></ServiceBar>
        <Modal
            title="提示信息"
            sureText="查看购物车"
            btnType="1"
            modalType="middle"
            v-bind:showModal="showModal"
            v-on:submit="goToCart"
            v-on:cancel="showModal=false"
        >
            <template v-slot:body>
                <p>商品添加成功！</p>
            </template>
        </Modal>
    </div>
</template>

<script>
    import ServiceBar from './../components/ServiceBar'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/swiper-bundle.css'
    import Modal from '../components/Modal'

    export default {
        name: 'Index',
        components: {
            ServiceBar,
            swiper,
            swiperSlide,
            Modal
        },
        data() {
            return {
                // 轮播幻灯片功能
                swiperOption: {
                    // 自动播放时间
                    autoplay: {
                        delay: 3000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true, // 操作swiper是否禁止自动播放。默认为true：停止。
                    },
                    // 无缝滚动
                    loop: true,
                    // 翻转效果
                    effect: 'cube',
                    cubeEffect: {
                        slideShadows: true,
                        shadow: true,
                        shadowOffset: 100,
                        shadowScale: 0.6
                    },
                    // 分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true, // 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
                    },
                    // 左右切换
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        // hideOnClick: true, // 点击slide时显示/隐藏按钮。
                    },
                },
                // 轮播幻灯片
                slideList: [
                    {
                        id: '42',
                        img: '/imgs/digital/slideList-1.jpg'
                    }, {
                        id: '45',
                        img: '/imgs/digital/slideList-2.jpg'
                    }, {
                        id: '46',
                        img: '/imgs/digital/slideList-3.jpg'
                    }, {
                        id: '',
                        img: '/imgs/digital/slideList-4.jpg'
                    }
                ],
                // 轮播菜单
                menuList: [
                    [{
                        id: 30,
                        img: '/imgs/digital/menuList-1.png',
                        name: '小米10 Pro'
                    }, {
                        id: 31,
                        img: '/imgs/digital/menuList-2.jpg',
                        name: 'Redmi K30 Pro'
                    }, {
                        id: 32,
                        img: '/imgs/digital/menuList-3.png',
                        name: 'Redmi 10X 5G'
                    }, {
                        id: 33,
                        img: '/imgs/digital/menuList-4.jpg',
                        name: 'Redmi 9A'
                    }],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ],
                // 首页广告位
                adsList: [
                    {
                        id: 33,
                        img: '/imgs/digital/adsList-1.jpg'
                    }, {
                        id: 48,
                        img: '/imgs/digital/adsList-2.jpg'
                    }, {
                        id: 45,
                        img: '/imgs/digital/adsList-3.jpg'
                    },
                ],
                // 手机商品位
                phoneList: [],
                // 模态框
                showModal: false
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            // 产品列表接口
            init() {
                this.axios.get('/products', {
                    params: {
                        categoryId: 100012,
                        pageSize: 14
                    }
                }).then((res) => {
                    res.list = res.list.slice(6, 14);
                    this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)]
                })
            },
            // 添加购物车接口
            addCart(id) {
                this.axios.post('/carts', {
                    productId: id,
                    selected: true
                }).then((res) => {
                    this.showModal = true;
                    this.$store.dispatch('saveCartCount', res.cartTotalQuantity);
                }).catch(() => {
                    this.showModal = true;
                })
            },
            // 添加购物车路由
            goToCart(){
                this.$router.push('/cart');
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/Mixin";

    .Index {
        /*首页轮播位*/
        .swiper-box {
            /*轮播菜单*/
            .nav-menu {
                position: absolute;
                width: 264px;
                height: 460px;
                z-index: 9;
                padding: 26px 0;
                background-color: rgba(105, 101, 101, .6);
                box-sizing: border-box;
                .menu-wrap {
                    /*菜单列表*/
                    .menu-item {
                        height: 42px;
                        line-height: 42px;
                        a {
                            display: block;
                            font-size: 14px;
                            color: #ffffff;
                            padding-left: 30px;
                            position: relative;
                            &:after {
                                position: absolute;
                                right: 30px;
                                top: 17.5px;
                                content: '';
                                @include bgImg(10px, 15px, '/imgs/icon/icon-arrow.png')
                            }
                        }
                        &:hover {
                            background-color: #FF6600;
                            .children {
                                display: block;
                            }
                        }
                        /*菜单内容*/
                        .children {
                            display: none;
                            width: 962px;
                            height: 460px;
                            background-color: #ffffff;
                            position: absolute;
                            top: 0;
                            left: 264px;
                            border: 1px solid #e5e5e5;
                            box-sizing: border-box;
                            ul {
                                display: flex;
                                justify-content: space-between;
                                height: 75px;
                                li {
                                    height: 75px;
                                    line-height: 75px;
                                    flex: 1;
                                    padding-left: 23px;
                                    a {
                                        display: inline-block;
                                        color: #333333;
                                        font-size: 14px;
                                        img {
                                            width: 42px;
                                            height: 35px;
                                            vertical-align: middle;
                                            margin-right: 15px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            /*轮播幻灯片*/
            .swiper-container {
                height: 460px;
                --swiper-navigation-size: 30px;
                --swiper-navigation-color: #666666;
                --swiper-pagination-color: #ffffff;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                }
                /*分页器*/
                .swiper-pagination {
                    position: absolute;
                    width: 200px;
                    height: 20px;
                    left: 1020px;
                    bottom: 25px;
                    .swiper-pagination-bullet {
                        width: 4px;
                        height: 4px;
                        opacity: 1;
                        border: 2px solid hsla(0, 0%, 100%, .5);
                    }
                }
                /*左箭头*/
                .swiper-button-prev {
                    left: 274px;
                }
                /*左右箭头默认隐藏*/
                .swiper-button-prev, .swiper-button-next {
                    display: none;
                }
                /*左右箭头进入轮播区域显示*/
                &:hover {
                    .swiper-button-prev, .swiper-button-next {
                        display: block;
                    }
                }
            }
        }
        /*首页广告位*/
        .advertising-box {
            @include flex();
            margin: 14px 0 31px 0;
            /*六个活动*/
            .six-activity {
                background-color: #333333;
                width: 265px;
                height: 167px;
                ul {
                    li {
                        float: left;
                        position: relative;
                        width: 88px;
                        height: 83px;
                        a {
                            display: inline-block;
                            width: 88px;
                            height: 83px;
                            img {
                                width: 24px;
                                height: 24px;
                                margin: 0 32px 4px;
                                padding-top: 18px;
                            }
                        }
                    }
                    li:hover {
                        opacity: 0.7;
                    }
                    /*插入伪类分割线*/
                    li:after, li:before {
                        content: "";
                        position: absolute;
                        background-color: #665e57;
                        z-index: 1;
                    }
                    /*竖分割线*/
                    li:after {
                        width: 1px;
                        height: 70px;
                        top: 5px;
                        left: 88px;

                    }
                    /*横分割线*/
                    li:before {
                        width: 70px;
                        height: 1px;
                        top: -1px;
                        left: 10px;
                    }
                    /*选择第一第三个元素*/
                    li:last-child:after, li:nth-child(3):after {
                        background: none
                    }
                    /*选择前几个元素*/
                    li:nth-child(-n+3):before {
                        background: none
                    }
                    /*a元素最后插入文字*/
                    .activity-1 > a:after,
                    .activity-2 > a:after,
                    .activity-3 > a:after,
                    .activity-4 > a:after,
                    .activity-5 > a:after,
                    .activity-6 > a:after {
                        color: #F5F5F5;
                        display: flex;
                        justify-content: center;
                        font-size: 12px;
                    }
                    .activity-1 > a:after {
                        content: '小米秒杀';
                    }
                    .activity-2 > a:after {
                        content: '企业团购';
                    }
                    .activity-3 > a:after {
                        content: 'F码通道';
                    }
                    .activity-4 > a:after {
                        content: '米粉卡';
                    }
                    .activity-5 > a:after {
                        content: '以旧换新';
                    }
                    .activity-6 > a:after {
                        content: '话费充值';
                    }
                }
            }
            /*三个活动*/
            .three-activity {
                width: 296px;
                height: 167px;
            }
        }
        /*首页数码产品位*/
        .DigitalProducts-box {
            background-color: #F5F5F5;
            padding: 30px 0 30px;
            /*手机商品位*/
            .phone-box {
                /*手机列表*/
                .phone-list {
                    .list-title {
                        @include flex();
                        color: #333333;
                        font-size: 16px;
                        height: 58px;
                        /*左侧标题*/
                        h2 {
                            height: 21px;
                            line-height: 21px;
                            font-weight: 200;
                        }
                        /*右侧查看全部*/
                        .look-all {
                            /*圆点背景色*/
                            .look-bg {
                                display: inline-block;
                                width: 20px;
                                height: 20px;
                                background-color: #C0C0C0;
                                border-radius: 50%;
                                margin-left: 5px;
                                /*右箭头图标*/
                                i {
                                    @include bgImg(16px, 16px, '/imgs/icon/icon-next.png');
                                    display: inline-block;
                                    padding-left: 5px;
                                    margin-top: -2px;
                                    vertical-align: middle;
                                }
                            }
                            &:hover {
                                color: #FF6600;
                                .look-bg {
                                    background-color: #FF6600;
                                }
                            }
                        }
                    }
                    .list-wrapper {
                        display: flex;
                        /*左侧广告位*/
                        .banner-left {
                            margin-right: 16px;
                            img {
                                width: 224px;
                                height: 619px;
                            }
                        }
                        /*右侧手机商品*/
                        .list-box {
                            .list {
                                @include flex();
                                width: 986px;
                                margin-bottom: 14px;
                                &:last-child {
                                    margin-bottom: 0;
                                }
                                .item {
                                    width: 236px;
                                    height: 302px;
                                    background-color: #ffffff;
                                    text-align: center;
                                    /*标签*/
                                    span {
                                        display: inline-block;
                                        width: 67px;
                                        height: 24px;
                                        line-height: 24px;
                                        font-size: 14px;
                                        color: #ffffff;
                                        &.new-pro {
                                            background-color: #7ecf68;
                                        }
                                        &.kill-pro {
                                            background-color: #e82626;
                                        }
                                    }
                                    /*商品图片*/
                                    .item-img {
                                        img {
                                            height: 195px;
                                            width: 100%;
                                        }
                                    }
                                    .item-info {
                                        /*商品名称*/
                                        h3 {
                                            font-size: 14px;
                                            color: #333333;
                                            line-height: 14px;
                                            font-weight: bold;
                                        }
                                        p {
                                            color: #999999;
                                            line-height: 13px;
                                            margin: 6px auto 13px;
                                        }
                                        /*商品描述*/
                                        .describe {
                                            font-size: 12px;
                                        }
                                        /*商品价格*/
                                        .price {
                                            color: #f20a0a;
                                            font-size: 14px;
                                            font-weight: bold;
                                            cursor: pointer;
                                            /*购物车图标*/
                                            &:after {
                                                content: '';
                                                margin-left: 5px;
                                                vertical-align: middle;
                                                @include bgImg(22px, 22px, '/imgs/icon/icon-cart-hover.png');
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                /*手机banner*/
                .phone-banner {
                    margin: 30px 0 20px 0;
                }
            }
        }
    }

</style>

