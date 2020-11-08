<template>
    <div class="ScanPayCode">
        <!--遮罩-->
        <div class="mask"></div>
        <div class="item-wrap">
            <!--示例图-->
            <div class="img-scan"></div>
            <!--支付窗口-->
            <div class="img-pay">
                <!--顶部标题-->
                <div class="title">微信支付
                    <!--关闭按钮-->
                    <em v-on:click="close"></em>
                </div>
                <!--二维码图片-->
                <div class="qrcode">
                    <img v-bind:src="img">
                </div>
                <!--底部文案-->
                <div class="tip">
                    <p>请使用
                        <span class="theme-color">微信</span>
                        扫一扫
                    </p>
                    <p>二维码完成支付</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ScanPayCode',
        props: {
            img: String
        },
        methods: {
            close() {
                // 子组件可以使用 $emit 触发父组件的自定义事件
                this.$emit('close');
            }
        }
    }
</script>
<style lang="scss">
    @import '../assets/scss/Mixin';

    .ScanPayCode {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        /*遮罩*/
        .mask {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: .6;
            background-color: #000000;
        }
        .item-wrap {
            position: fixed;
            width: 670px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            /*示例图*/
            .img-scan {
                @include bgImg(296px, 485px, '/imgs/icon/icon-scan.png');
            }
            /*支付窗口*/
            .img-pay {
                width: 370px;
                height: 440px;
                display: inline-block;
                background-color: #ffffff;
                /*顶部标题*/
                .title {
                    position: relative;
                    height: 60px;
                    line-height: 60px;
                    color: #333333;
                    font-size: 20px;
                    padding: 0 18px;
                    background-color: #F5F5F5;
                    /*关闭按钮*/
                    em {
                        position: absolute;
                        top: 23.5px;
                        right: 20px;
                        @include bgImg(13px, 13px, '/imgs/icon/icon-close.png');
                        cursor: pointer;
                    }
                }
                /*二维码图片*/
                .qrcode {
                    text-align: center;
                    padding: 44px 0 26px;
                    img {
                        width: 237px;
                        height: 240px;
                    }
                }
                /*底部文案*/
                .tip {
                    text-align: center;
                    font-size: 14px;
                    color: #333333;
                    p {
                        .theme-color {
                            color: #FF6600;
                        }
                    }
                }
            }
        }
    }
</style>
