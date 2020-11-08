<template>
    <div class="Detail">
        <!--吸顶条-->
        <ProductParam v-bind:title="product.name"></ProductParam>
        <div class="wrapper">
            <div class="container clearFix">
                <!--商品图片轮播-->
                <div class="swiper fl">
                    <swiper :options="swiperOption">
                        <swiper-slide>
                            <img src="../../public/imgs/digital/phone-1.jpg" alt="">
                        </swiper-slide>
                        <swiper-slide>
                            <img src="../../public/imgs/digital/phone-2.jpg" alt="">
                        </swiper-slide>
                        <swiper-slide>
                            <img src="../../public/imgs/digital/phone-3.jpg" alt="">
                        </swiper-slide>
                        <swiper-slide>
                            <img src="../../public/imgs/digital/phone-4.jpg" alt="">
                        </swiper-slide>
                        <!--分页器-->
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                </div>
                <!--商品内容-->
                <div class="content fr">
                    <!--商品名称-->
                    <h2 class="item-title">{{product.name}}</h2>
                    <!--商品描述-->
                    <p class="item-info">「K30 4G 6GB+128GB到手价仅1399元；K30 5G 6GB+128GB券后1499元；+1元得50GB云空间月卡；
                        +39元得黑鲨游戏手柄套装」双模5G / 三路并发 / 7nm 5G低功耗处理器 / 120Hz高帧率流速屏 / 6.67''小孔径全面屏 /
                        索尼6400万前后六摄 / 最高可选8GB+256GB大存储 / 4500mAh+30W快充 / 3D四曲面玻璃机身 / 多功能NFC
                    </p>
                    <!--品牌标签-->
                    <div class="delivery">小米自营</div>
                    <!--商品单价-->
                    <div class="item-price">
                        {{product.price}}元
                        <!--划线价格-->
                        <span class="del">1999元</span>
                    </div>
                    <!--分割线-->
                    <div class="line"></div>
                    <!--收货地址-->
                    <div class="item-address">
                        <!--定位图标-->
                        <i class="icon-loc"></i>
                        <!--地址信息-->
                        <div class="address">北京 北京市 朝阳区 安定门街道</div>
                        <div class="stock">有现货</div>
                    </div>
                    <!--选择版本-->
                    <div class="item-version clearFix">
                        <!--SKU标题-->
                        <h2>选择版本</h2>
                        <div class="fl">
                            <div class="phone" v-bind:class="{'checked':version==1}" v-on:click="version=1">
                                16GB+512GB 移动5G
                            </div>
                            <div class="phone" v-bind:class="{'checked':version==2}" v-on:click="version=2">
                                4GB+128GB 电信5G
                            </div>
                        </div>
                        <div class="fr">
                            <div class="phone" v-bind:class="{'checked':version==3}" v-on:click="version=3">
                                8GB+256GB 联通5G
                            </div>
                        </div>
                    </div>
                    <!--选择颜色-->
                    <div class="item-color clearFix">
                        <!--SKU标题-->
                        <h2>选择颜色</h2>
                        <div class="fl">
                            <div class="phone" v-bind:class="{'checked':color==1}" v-on:click="color=1">
                                <span class="color1"></span>
                                深空灰
                            </div>
                            <div class="phone" v-bind:class="{'checked':color==2}" v-on:click="color=2">
                                <span class="color2"></span>
                                红色
                            </div>
                        </div>
                        <div class="fr">
                            <div class="phone" v-bind:class="{'checked':color==3}" v-on:click="color=3">
                                <span class="color3"></span>
                                金色
                            </div>
                        </div>
                    </div>
                    <!--商品价格计算窗口-->
                    <div class="item-total">
                        <div class="phone-info clearFix">
                            <!--选择规格展示内容-->
                            <div class="fl">
                                {{product.name}}
                                {{version==1 ? '16GB+512GB 移动5G' : '8GB+256GB 联通5G'}}
                                {{color==1 ? '深空灰' : '金色'}}
                            </div>
                            <!--商品单价-->
                            <div class="fr">{{product.price}}元</div>
                        </div>
                        <!--商品支付总价-->
                        <div class="phone-total">总计：{{product.price}}元</div>
                    </div>
                    <!--加入购物车-->
                    <div class="btn-group">
                        <a href="#" class="btn btn-huge fl" v-on:click="addCart">加入购物车</a>
                    </div>
                </div>
            </div>
        </div>
        <!--价格说明-->
        <div class="price-info">
            <div class="container">
                <div class="price-remind">
                    <h2>价格说明</h2>
                    <div class="desc">
                        <p>
                            <b>划线价：</b>
                            商品展示的划横线价格为参考价，该价格可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价
                            （如厂商指导价、建议零售价等）或该商品在小米商城/小米有品/天猫小米官方旗舰店曾经展示过的销售价；由于地区、
                            时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致，该价格仅供您参考。
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!--服务信息引用-->
        <ServiceBar></ServiceBar>
    </div>
</template>
<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/swiper-bundle.css'
    import ProductParam from './../components/ProductParam'
    import ServiceBar from './../components/ServiceBar';

    export default {
        name: 'Detail',
        components: {
            swiper,
            swiperSlide,
            ProductParam,
            ServiceBar
        },
        data() {
            return {
                id: this.$route.params.id,// 获取商品ID
                version: 1, // 商品版本切换
                color: 1, // 颜色版本切换
                product: {}, // 商品信息
                // 轮播功能
                swiperOption: {
                    // 自动播放时间
                    autoplay: {
                        delay: 5000,
                        stopOnLastSlide: false, // 如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）
                        disableOnInteraction: false, // 操作swiper是否禁止自动播放。默认为true：停止。
                    },
                    // 分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true, // 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
                    },
                    // 无缝滚动
                    loop: true
                }
            }
        },
        mounted() {
            this.getProductInfo();
        },
        methods: {
            // 商品列表接口
            getProductInfo() {
                this.axios.get(`/products/${this.id}`).then((res) => {
                    this.product = res;
                })
            },
            // 添加购物车接口
            addCart() {
                this.axios.post('/carts', {
                    // 传参
                    productId: this.id,
                    selected: true
                    // 默认数量0
                }).then((res = {cartProductVoList: 0}) => { // .then()指定一组按照次序调用的回调函数
                    // 购物车数量实时计算
                    this.$store.dispatch('saveCartCount', res.cartTotalQuantity);
                    // 加入购物车路由
                    this.$router.push('/cart');
                })
            }
        }
    }
</script>
<style lang="scss">
    @import '../assets/scss/Mixin';
    @import "../assets/scss/Base";
    @import "../assets/scss/Button";

    .Detail {
        .wrapper {
            /*商品图片轮播*/
            .swiper {
                width: 642px;
                height: 617px;
                margin-top: 10px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            /*商品信息*/
            .content {
                width: 584px;
                height: 1000px;
                /*商品名称*/
                .item-title {
                    font-size: 28px;
                    padding: 30px 0 30px 0;
                    height: 26px;
                }
                /*商品描述*/
                .item-info {
                    font-size: 14px;
                    height: 60px;
                    width: 584px;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                }
                /*品牌标签*/
                .delivery {
                    font-size: 16px;
                    color: #FF6700;
                    margin-top: 26px;
                    margin-bottom: 14px;
                    height: 15px;
                }
                /*商品价格*/
                .item-price {
                    font-size: 20px;
                    color: #FF6700;
                    height: 19px;
                    /*划线价格*/
                    .del {
                        font-size: 16px;
                        color: #999999;
                        margin-left: 10px;
                        text-decoration: line-through;
                    }
                }
                /*分割线*/
                .line {
                    height: 0;
                    margin-top: 25px;
                    margin-bottom: 28px;
                    border-top: 1px solid #e5e5e5;
                }
                /*收货地址*/
                .item-address {
                    height: 108px;
                    background-color: #FAFAFA;
                    border: 1px solid #e5e5e5;
                    box-sizing: border-box;
                    padding-top: 31px;
                    padding-left: 64px;
                    font-size: 14px;
                    line-height: 14px;
                    position: relative;
                    /*定位图标*/
                    .icon-loc {
                        position: absolute;
                        top: 27px;
                        left: 34px;
                        @include bgImg(20px, 20px, '/imgs/icon/icon-loc.png');
                    }
                    /*地址信息*/
                    .address {
                        color: #666666;
                    }
                    .stock {
                        margin-top: 15px;
                        color: #FF6700;
                    }
                }
                /*选择版本、颜色*/
                .item-version, .item-color {
                    margin-top: 20px;
                    /*SKU标题*/
                    h2 {
                        font-size: 18px;
                        margin-bottom: 10px;
                    }
                }
                /*选择版本、颜色*/
                .item-version, .item-color {
                    .phone {
                        width: 287px;
                        height: 50px;
                        line-height: 50px;
                        font-size: 16px;
                        color: #666666;
                        border: 1px solid #e5e5e5;
                        box-sizing: border-box;
                        text-align: center;
                        cursor: pointer;
                        margin-bottom: 10px;
                        .color1, .color2, .color3 {
                            display: inline-block;
                            width: 14px;
                            height: 14px;
                            margin-left: 15px;
                        }
                        .color1 {
                            background-color: #666666;
                        }
                        .color2 {
                            background-color: #FF6600;
                        }
                        .color3 {
                            background-color: #FFD700;
                        }
                        /*规格选中样式*/
                        &.checked {
                            border: 1px solid #FF6600;
                            color: #FF6600;
                        }
                    }
                }
                /*商品价格计算窗口*/
                .item-total {
                    height: 108px;
                    background: #FAFAFA;
                    padding: 24px 33px 29px 30px;
                    font-size: 14px;
                    margin: 30px 0 30px 0;
                    box-sizing: border-box;
                    /*商品支付总价*/
                    .phone-total {
                        font-size: 24px;
                        color: #FF6600;
                        margin-top: 18px;
                    }
                }
            }
        }
        /*价格说明*/
        .price-info {
            background-color: #F3F3F3;
            height: 340px;
            .container {
                .price-remind {
                    h2 {
                        font-size: 24px;
                        color: #333333;
                        padding-top: 38px;
                        margin-bottom: 30px;
                    }
                    .desc {
                        background-color: #ffffff;
                        width: 100%;
                        height: 189px;
                        p {
                            font-size: 16px;
                            color: #666666;
                            padding: 50px 100px 0 100px;
                            b {
                                font-weight: bold;
                                color: #000000;
                                font-size: 18px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
