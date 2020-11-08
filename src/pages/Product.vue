<template>
    <div class="Product">
        <!--吸顶条-->
        <product-param v-bind:title="product.name">
            <template v-slot:buy>
                <button class="btn" v-on:click="buy">立即购买</button>
            </template>
        </product-param>
        <!--内容-->
        <div class="content">
            <div class="container">
                <!--商品图片-->
                <div class="item-img">
                    <!--商品名称-->
                    <h2>{{product.name}}</h2>
                    <!--商品描述-->
                    <h3>{{product.subtitle}}</h3>
                    <p>
                        <a href="#">全球首款双频 GP</a>
                        <span>|</span>
                        <a href="#">骁龙845</a>
                        <span>|</span>
                        <a href="#">AI 变焦双摄</a>
                        <span>|</span>
                        <a href="#">红外人脸识别</a>
                    </p>
                    <!--商品价格-->
                    <div class="price">
                        <span>
                            <!--单价-->
                            <em>￥{{product.price}}</em>
                            <!--划线价格-->
                            <s>￥2999</s>
                        </span>
                    </div>
                </div>
                <!--轮播图-->
                <div class="item-swiper">
                    <swiper :options="swiperOption">
                        <swiper-slide><img src="../../public/imgs/digital/gallery-2.png" alt=""></swiper-slide>
                        <swiper-slide><img src="../../public/imgs/digital/gallery-3.png" alt=""></swiper-slide>
                        <swiper-slide><img src="../../public/imgs/digital/gallery-4.png" alt=""></swiper-slide>
                        <swiper-slide><img src="../../public/imgs/digital/gallery-5.jpg" alt=""></swiper-slide>
                        <swiper-slide><img src="../../public/imgs/digital/gallery-6.jpg" alt=""></swiper-slide>
                        <!-- Optional controls -->
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                </div>
                <!--视频播放-->
                <div class="item-video">
                    <!--描述信息-->
                    <h2>60帧超慢动作摄影</h2>
                    <!--描述信息-->
                    <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致</p>
                    <!--默认背景图片-->
                    <div class="video-bg" @click="showSlide=true"></div>
                    <!--视频窗口-->
                    <div class="video-box">
                        <!--播放窗口背景效果-->
                        <div class="overlay" v-if="showSlide"></div>
                        <!--视频播放-->
                        <div class="video" v-bind:class="{'slide':showSlide}">
                            <!--关闭按钮-->
                            <span class="icon-close" @click="showSlide=false"></span>
                            <!--
                                视频资源
                                    autoplay 自动播放
                                    muted    默认关闭视频声音
                                    controls 视频提供播放控件
                            -->
                            <video src="../../public/imgs/digital/video.mp4" muted autoplay controls="controls"></video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/swiper-bundle.css'
    import ProductParam from './../components/ProductParam'

    export default {
        name: 'product',
        components: {
            swiper,
            swiperSlide,
            ProductParam
        },
        data() {
            return {
                showSlide: false,  // 视频播放窗口设置默认不显示
                product: {}, //商品信息
                // 轮播图功能
                swiperOption: {
                    // 自动播放时间
                    autoplay: {
                        delay: 3000,
                        stopOnLastSlide: false, // 如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）
                        disableOnInteraction: false, // 操作swiper是否禁止自动播放。默认为true：停止。
                    },
                    // 在slide之间设置距离
                    spaceBetween: 30,
                    // slide滑动格子模式
                    freeMode: true,
                    // 无缝滚动
                    loop: true,
                    // 分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true, // 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
                    },
                    // 显示5张
                    slidesPerView: 3,
                }
            }
        },
        mounted() {
            this.getProductInfo();
        },
        methods: {
            // 商品列表接口
            getProductInfo() {
                let id = this.$route.params.id;
                this.axios.get(`/products/${id}`).then((res) => {
                    this.product = res;
                })
            },
            // 立即购买按钮动态路由
            buy() {
                let id = this.$route.params.id;
                this.$router.push(`/detail/${id}`);
            },
        }
    }
</script>
<style lang="scss">
    @import '../assets/scss/Mixin';
    @import "../assets/scss/Base";
    @import "../assets/scss/Button";

    .Product {
        /*内容*/
        .content {
            .container {
                /*商品图片*/
                .item-img {
                    background: url('../../public/imgs/digital/product-bg.png') no-repeat center;
                    height: 530px;
                    text-align: center;
                    margin-top: 5px;
                    /*商品名称*/
                    h2 {
                        font-size: 40px;
                        padding-top: 20px;
                    }
                    /*商品描述*/
                    h3 {
                        font-size: 24px;
                        letter-spacing: 10px;
                    }
                    p {
                        margin-top: 21px;
                        margin-bottom: 20px;
                        a {
                            font-size: 16px;
                            color: #333333;
                        }
                        span {
                            margin: 0 15px;
                        }
                    }
                    /*商品价格*/
                    .price {
                        font-size: 30px;
                        color: #333333;
                        span {
                            /*单价*/
                            em {
                                font-style: normal;
                                font-size: 38px;
                                margin-right: 15px;
                            }
                        }
                        /*划线价*/
                        &:last-child {
                            font-size: 20px;
                        }
                    }
                }
                /*轮播图*/
                .item-swiper {
                    margin: 36px auto 36px;
                    img {
                        width: 100%;
                    }
                }
                /*视频播放*/
                .item-video {
                    height: 680px;
                    background-color: #070708;
                    margin-bottom: 50px;
                    color: #FFFFFF;
                    text-align: center;
                    /*描述信息*/
                    h2 {
                        font-size: 30px;
                        padding-top: 50px;
                    }
                    /*描述信息*/
                    p {
                        font-size: 20px;
                        margin-bottom: 50px;
                    }
                    /*默认背景图片*/
                    .video-bg {
                        background: url('../../public/imgs/digital/gallery-1.png') no-repeat center;
                        background-size: cover;
                        width: 1226px;
                        height: 500px;
                        margin: 0 auto 120px;
                        cursor: pointer;
                    }
                    /*视频窗口*/
                    .video-box {
                        /*播放窗口背景效果*/
                        .overlay {
                            @include position(fixed);
                            background-color: #333333;
                            opacity: .4;
                            z-index: 10;
                        }
                        /*视频播放*/
                        .video {
                            position: fixed;
                            top: -50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 10;
                            width: 1000px;
                            height: 500px;
                            opacity: 0;
                            transition: all .6s;
                            /*播放窗口展示位置*/
                            &.slide {
                                top: 50%;
                                opacity: 1;
                            }
                            /*关闭按钮*/
                            .icon-close {
                                position: absolute;
                                top: 20px;
                                right: 20px;
                                @include bgImg(20px, 20px, '/imgs/icon/icon-close.png');
                                cursor: pointer;
                                z-index: 11;
                            }
                            /*播放窗口百分比尺寸*/
                            video {
                                width: 100%;
                                height: 100%;
                                object-fit: cover; // 处理video自带阴影
                                outline: none;
                            }
                        }
                    }
                }
            }
        }
        /*立即购买*/
        button {
            margin-left: 10px;
        }
    }
</style>
