<template>
    <div class="ProductParam" v-bind:class="{'is_fixed':isFixed}">
        <div class="container">
            <!--产品标题-->
            <div class="product-title">
                {{title}}
            </div>
            <!--产品参数-->
            <div class="product-param">
                <a href="#">概述</a>
                <span>|</span>
                <a href="#">参数</a>
                <span>|</span>
                <a href="#">用户评价</a>
                <!--立即购买-->
                <slot name="buy"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProductParam',
        props: {
            title: String
        },
        data() {
            return {
                isFixed: false
            }
        },
        mounted() {
            // window.addEventListener      侦听事件并处理相应的函数
            window.addEventListener('scroll', this.initHeight)
        },
        methods: {
            initHeight() {
                // window.pageYOffset      返回文档在窗口垂直方向滚动的像素
                // document.documentElement        以一个元素对象返回一个文档的文档元素
                // document.body       设置或返回文档体
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                this.isFixed = scrollTop > 152 ? true : false;
            }
        },
        destroyed() {
            // window.removeEventListener       移除 addEventListener() 方法添加的 "mousemove" 事件
            window.removeEventListener('scroll', this.initHeight, false);
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/Base";
    @import "../assets/scss/Mixin";

    .ProductParam {
        height: 70px;
        line-height: 70px;
        border-top: 1px solid #e5e5e5;
        background-color: #ffffff;
        box-shadow: 0 5px 5px #cccccc;
        z-index: 11;
        &.is_fixed {
            position: fixed;
            top: 0;
            width: 100%;
        }
        .container {
            @include flex();
            /*产品标题*/
            .product-title {
                font-size: 18px;
                color: #333333;
                font-weight: bold;
            }
            /*产品参数*/
            .product-param {
                font-size: 14px;
                span {
                    margin: 0 10px;
                }
                a {
                    color: #666666;
                }
            }
        }
    }

</style>
