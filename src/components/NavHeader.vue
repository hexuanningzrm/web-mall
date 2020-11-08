<template>
    <div class="NavHeader">
        <!--顶部导航条-->
        <div class="nav-topBar">
            <div class="container">
                <!--顶部菜单-->
                <div class="topBar-menu">
                    <a href="#">小米商城</a>
                    <a href="#">MIUI</a>
                    <a href="#">云服务</a>
                    <a href="#">金融</a>
                    <a href="#">有品</a>
                    <a href="#">小爱开放平台</a>
                    <a href="#">企业团购</a>
                    <a href="#">资质证照</a>
                    <a href="#">协议规则</a>
                    <a class="download-app" href="#">下载app
                        <!--app下载弹窗-->
                        <span class="app-code">
                            <img src="https://i1.mifile.cn/f/i/17/appdownload/download.png?1" alt="">
                        </span>
                    </a>
                    <a href="#">智能生活</a>
                    <a href="#">Select Location</a>
                </div>
                <!--顶部用户信息-->
                <div class="topBar-user">
                    <!--登录用户名-->
                    <a href="javascript:" v-if="username">{{username}}</a>
                    <a href="#" v-if="!username" v-on:click="login">登录</a>
                    <a href="javascript:" v-if="!username" v-on:click="registered">注册</a>
                    <a href="#" v-if="username" v-on:click="loginExit">退出</a>
                    <a href="javascript:" v-if="username" v-on:click="myOrder">我的订单</a>
                    <!--购物车-->
                    <a href="javascript:" class="user-cart" v-on:click="cart">
                        <div class="cart">
                            <!--购物车图标-->
                            <span class="cart-icon"></span>
                            <span>购物车</span>
                            <span>（{{cartCount}}）</span>
                        </div>
                        <!--购物车弹窗-->
                        <div class="cart-list">购物车中还没有商品，赶紧选购吧！</div>
                    </a>
                </div>
            </div>
        </div>
        <!--头部导航条-->
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <!--头部菜单-->
                <div class="header-menu">
                    <div class="item-menu">
                        <span>小米手机</span>
                        <!--菜单内容-->
                        <div class="children">
                            <ul>
                                <li class="product" v-for="(item, index) in phoneList" :key="index">
                                    <a v-bind:href="'/#/product/'+item.id" target="_blank">
                                        <div class="product-img">
                                            <img v-bind:src="item.mainImage" v-bind:alt="item.subtitle">
                                        </div>
                                        <div class="product-name">{{item.name}}</div>
                                        <div class="product-price">{{item.price | currency}}</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>RedMi红米</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu">
                        <span>电视</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu">
                        <span>笔记本</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu">
                        <span>家电</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu">
                        <span>路由器</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu">
                        <span>智能硬件</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu">
                        <span>服务</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu">
                        <span>社区</span>
                        <div class="children"></div>
                    </div>
                </div>
                <!--头部搜索-->
                <div class="header-search">
                    <div class="wrapper">
                        <!--搜索输入框-->
                        <input type="text" placeholder="小米10年献礼之作">
                        <a href="#">
                            <!--搜索图标-->
                            <span class="search-icon"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'NavHeader',
        data() {
            return {
                userName: '',
                phoneList: []
            }
        },
        computed: {
            // 登录用户名显示
            ...mapState(['username','cartCount'])
        },
        mounted() {
            this.getProductList();
        },
        methods: {
            // 产品列表接口
            getProductList() {
                this.axios.get('/products', {
                    params: {
                        categoryId: '100012',
                        // pageSize: 6
                    }
                }).then((res) => {
                    // 如果list数组数目大于6
                    if (res.list.length > 6) {
                        // 从已有的数组中返回选定0-6条
                        this.phoneList = res.list.slice(0, 6);
                    }
                })
            },
            // 退出登录接口
            loginExit() {
                this.axios.post('/user/logout').then(() => {
                    this.$message.success('退出成功！');
                    this.$cookie.set('userId', '', {expires: '-1'});
                    this.$store.dispatch('saveUserName', '');
                    this.$store.dispatch('saveCartCount', '0');
                })
            },
            // 购物车路由
            cart() {
                this.$router.push('/cart');
            },
            // 登录路由
            login() {
                this.$router.push('/login');
            },
            // 注册路由
            registered() {
                this.$router.push('/registered');
            },
            // 我的订单路由
            myOrder() {
                this.$router.push('/order/list');
            }
        },
        // filters过滤器
        filters: {
            currency(val) {
                // 如果val不返回0
                if (!val) return '0.00';
                // (2)保留2位小数
                return val.toFixed(2) + '元';
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/Base";
    @import "../assets/scss/Mixin";

    .NavHeader {
        /*顶部导航条*/
        .nav-topBar {
            height: 39px;
            line-height: 39px;
            background-color: #333333;
            color: #B0B0B0;
            .container {
                @include flex();
                a {
                    display: inline-block;
                    color: #B0B0B0;
                    margin-right: 17px;
                    &:hover {
                        color: #FF6600;
                    }
                }
                .download-app {
                    position: relative;
                    &:hover {
                        color: #FF6600;
                        .triangle-up {
                            width: 0;
                            height: 0;
                            border-left: 50px solid transparent;
                            border-right: 50px solid transparent;
                            border-bottom: 100px solid red;
                        }
                        .app-code {
                            display: block;
                        }
                    }
                    /*app下载弹窗*/
                    .app-code {
                        display: none;
                        position: absolute;
                        z-index: 1;
                        right: -40px;
                        top: 39px;
                        font-size: 12px;
                        text-align: center;
                        width: 120px;
                        line-height: 110px;
                        height: 110px;
                        color: #424242;
                        background: #fff;
                        box-shadow: 0 7px 6px 0 rgba(0, 0, 0, 0.11);
                        img {
                            width: 90px;
                            height: 90px;
                            text-align: center;
                            margin-top: 10px;
                        }
                    }

                }
                /*顶部菜单*/
                .topBar-menu {
                    font-size: 12px;
                }
                /*顶部用户信息*/
                .topBar-user {
                    font-size: 12px;
                    /*购物车*/
                    .user-cart {
                        width: 125px;
                        background-color: #424242;
                        text-align: center;
                        color: #b0b0b0;
                        margin-right: 0;
                        .cart {
                            position: relative;
                            z-index: 20;
                            /*购物车图标*/
                            .cart-icon {
                                @include bgImg(16px, 12px, "/imgs/icon/icon-cart-checked.png");
                                margin-right: 10px;
                            }
                        }
                        &:hover {
                            color: #FF6600;
                            background-color: #ffffff;
                            .cart {
                                .cart-icon {
                                    @include bgImg(16px, 12px, "/imgs/icon/icon-cart-hover.png");
                                    margin-right: 10px;
                                }
                            }
                            .cart-list {
                                display: block;
                            }
                        }
                        /*购物车弹窗*/
                        .cart-list {
                            display: none;
                            position: absolute;
                            z-index: 1;
                            right: 107px;
                            top: 39px;
                            font-size: 12px;
                            text-align: center;
                            width: 316px;
                            line-height: 112px;
                            height: 112px;
                            color: #424242;
                            background: #fff;
                            box-shadow: 0 7px 6px 0 rgba(0, 0, 0, 0.11);
                        }
                    }
                }
            }
        }

        /*头部导航条*/
        .nav-header {
            .container {
                height: 112px;
                position: relative;
                @include flex();
                /*头部菜单*/
                .header-menu {
                    display: inline-block;
                    width: 643px;
                    padding-left: 100px;
                    .item-menu {
                        display: inline-block;
                        color: #333333;
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 112px;
                        margin-right: 20px;
                        span {
                            cursor: pointer;
                        }
                        &:hover {
                            color: #FF6600;
                            .children {
                                height: 220px;
                                opacity: 1;
                            }
                        }
                        /*菜单内容*/
                        .children {
                            position: absolute;
                            top: 112px;
                            left: 0;
                            width: 1226px;
                            height: 0;
                            border-top: 1px solid #e5e5e5;
                            box-shadow: 0 7px 6px 0 rgba(0, 0, 0, 0.11);
                            z-index: 10;
                            background-color: #ffffff;
                            opacity: 0;
                            overflow: hidden;
                            transition: all 0.5s;
                            .product {
                                float: left;
                                width: 16.6%;
                                height: 220px;
                                font-size: 12px;
                                line-height: 12px;
                                text-align: center;
                                position: relative;
                                img {
                                    width: auto;
                                    height: 111px;
                                    margin-top: 26px;
                                }
                                a {
                                    display: inline-block;
                                    .product-img {
                                        height: 137px;
                                    }
                                    .product-name {
                                        font-weight: bold;
                                        margin-top: 19px;
                                        margin-bottom: 8px;
                                        color: #333333;
                                    }
                                    .product-price {
                                        color: #FF6600;
                                    }
                                }
                                &:before {
                                    content: '';
                                    position: absolute;
                                    top: 28px;
                                    right: 0;
                                    border-left: 1px solid #d7d7d7;
                                    height: 100px;
                                    width: 1px;
                                }
                                &:last-child:before {
                                    display: none;
                                }
                            }
                        }
                    }
                }
                /*头部-搜索*/
                .header-search {
                    width: 319px;
                    .wrapper {
                        height: 50px;
                        border: 1px solid #e0e0e0;
                        display: flex;
                        align-items: center;
                        /*搜索输入框*/
                        input {
                            border: none;
                            border-right: 1px solid #e0e0e0;
                            width: 264px;
                            height: 50px;
                            padding-left: 14px;
                            box-sizing: border-box;
                            font-size: 14px;
                        }
                        a {
                            display: inline-block;
                            width: 53px;
                            height: 50px;
                            line-height: 50px;
                            position: relative;
                            /*搜索图标*/
                            .search-icon {
                                @include bgImg(25px, 25px, "/imgs/icon/icon-search.png");
                                position: absolute;
                                top: 12px;
                                left: 15px;
                            }
                            &:hover {
                                background-color: #FF6600;
                                .search-icon {
                                    @include bgImg(25px, 25px, "/imgs/icon/icon-search-hover.png");
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
