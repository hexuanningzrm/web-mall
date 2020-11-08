<template>
    <div class="Cart">
        <!--导航条-->
        <OrderHeader title="我的购物车">
            <template v-slot:tip>
                <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
            </template>
        </OrderHeader>
        <!--我的购物车-->
        <div class="wrapper">
            <div class="container">
                <!--购物车内容-->
                <div class="cart-box">
                    <!--购物车表头-->
                    <ul class="cart-item-header">
                        <li class="col-1">
                            <!--全选按钮-->
                            <span class="checkbox"
                                  v-bind:class="{'checked':allChecked}" v-on:click="toggleAll">
                            </span>
                            <span>全选</span>
                        </li>
                        <li class="col-3">商品名称</li>
                        <li class="col-1">单价</li>
                        <li class="col-2">数量</li>
                        <li class="col-1">小计</li>
                        <li class="col-1">操作</li>
                    </ul>
                    <!--购物车列表-->
                    <ul class="cart-item-list">
                        <li class="cart-item" v-for="(item, index) in list" v-bind:key="index">
                            <!--勾选框-->
                            <div class="item-check">
                                <span class="checkbox"
                                      v-bind:class="{'checked':item.productSelected}"
                                      v-on:click="updateCart(item)">
                                </span>
                            </div>
                            <!--商品名称-->
                            <div class="item-name">
                                <img v-lazy="item.productMainImage" alt="">
                                <span>{{item.productName + ' , ' + item.productSubtitle}}</span>
                            </div>
                            <!--商品单价-->
                            <div class="item-price">{{item.productPrice}}</div>
                            <!--商品数量-->
                            <div class="item-num">
                                <div class="num-box">
                                    <a v-on:click="updateCart(item, '-')">－</a>
                                    <span>{{item.quantity}}</span>
                                    <a v-on:click="updateCart(item, '+')">＋</a>
                                </div>
                            </div>
                            <!--商品数量-->
                            <div class="item-total">{{item.productTotalPrice}}</div>
                            <!--删除按钮-->
                            <div class="item-del" v-on:click="delProduct(item)"></div>
                        </li>
                    </ul>
                </div>
                <!--购物车底部-->
                <div class="order-wrap clearFix">
                    <!--左侧区域-->
                    <div class="cart-tip fl">
                        <a href="/#/index">继续购物</a>
                        <!--总商品数量-->
                        共<span>{{list.length}}</span>件商品，
                        <!--已选商品数量-->
                        已选择<span>{{checkedNum}}</span>件
                    </div>
                    <!--右侧区域-->
                    <div class="total fr">
                        <!--合计金额-->
                        合计：<span>{{cartTotalPrice}}</span>元
                        <!--去结算-->
                        <a href="#" class="btn" v-on:click="orderSettlement">去结算</a>
                    </div>
                </div>
            </div>
        </div>
        <ServiceBar></ServiceBar>
        <NavFooter></NavFooter>
    </div>
</template>
<script>
    import OrderHeader from '../components/OrderHeader'
    import ServiceBar from '../components/ServiceBar'
    import NavFooter from '../components/NavFooter'

    export default {
        name: 'Cart',
        components: {
            OrderHeader,
            ServiceBar,
            NavFooter
        },
        data() {
            return {
                list: [], // 商品列表
                allChecked: false, // 是否全选
                cartTotalPrice: 0, // 商品总金额
                checkedNum: 0, // 选中商品数量
            }
        },
        mounted() {
            this.getCartList();
        },
        methods: {
            // 购物车列表接口
            getCartList() {
                this.axios.get('/carts').then((res) => {
                    this.renderData(res);
                })
            },
            // 购物车全选、取消全选接口
            toggleAll() {
                // /carts/selectAll     全选中
                // /carts/unSelectAll   全不选中
                let url = this.allChecked ? '/carts/unSelectAll' : '/carts/selectAll';
                this.axios.put(url).then((res) => {
                    this.renderData(res);
                })
            },
            // 购物车商品增加减少，单选状态
            updateCart(item, type) {
                // 增加减少
                let quantity = item.quantity,
                    // 单选状态
                    selected = item.productSelected;
                if (type == '-') {
                    if (quantity == 1) {
                        this.$message.warning('商品至少保留一件');
                        return;
                    }
                    --quantity;
                } else if (type == '+') {
                    if (quantity > item.productStock) {
                        this.$message.warning('商品不能超过库存数量');
                        return;
                    }
                    ++quantity;
                } else {
                    selected = !item.productSelected;
                }
                // 购物车单选接口
                this.axios.put(`/carts/${item.productId}`, {
                    quantity,
                    selected
                }).then((res) => {
                    this.renderData(res);
                })
            },
            // 购物车单个商品删除接口
            delProduct(item) {
                this.axios.delete(`/carts/${item.productId}`).then((res) => {
                    this.renderData(res);
                })
            },
            // 购物车结算
            orderSettlement() {
                let isCheck = this.list.every(item => !item.productSelected);
                if (isCheck) {
                    this.$message.warning('请选择一件商品！');
                } else {
                    this.$router.push('/order/confirm');
                }
            },
            // 公共赋值
            renderData(res) {
                // 购物车列表数据
                this.list = res.cartProductVoList || [];
                // 选中商品状态
                this.allChecked = res.selectedAll;
                // 商品总金额
                this.cartTotalPrice = res.cartTotalPrice;
                // 选中商品数量
                this.checkedNum = this.list.filter(item => item.productSelected).length;
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/base";
    @import "../assets/scss/Button";

    .Cart {
        .wrapper {
            background-color: #F5F5F5;
            padding-top: 30px;
            padding-bottom: 114px;
            /*购物车内容*/
            .cart-box {
                background-color: #fff;
                font-size: 14px;
                color: #999999;
                text-align: center;
                /*全选按钮*/
                .checkbox {
                    display: inline-block;
                    width: 22px;
                    height: 22px;
                    border: 1px solid #E5E5E5;
                    vertical-align: middle;
                    margin-right: 17px;
                    cursor: pointer;
                    /*全选图标*/
                    &.checked {
                        background: url('../../public/imgs/icon/icon-gou.png') #FF6600 no-repeat center;
                        background-size: 16px 12px;
                        border: none;
                    }
                }
                /*导航表头*/
                .cart-item-header {
                    display: flex;
                    height: 79px;
                    line-height: 79px;
                    /*占位1格*/
                    .col-1 {
                        flex: 1;
                    }
                    /*占位2格*/
                    .col-2 {
                        flex: 2;
                    }
                    /*占位3格*/
                    .col-3 {
                        flex: 3;
                    }
                }
                /*购物车-列表*/
                .cart-item-list {
                    .cart-item {
                        display: flex;
                        align-items: center;
                        height: 125px;
                        border-top: 1px solid #E5E5E5;
                        font-size: 16px;
                        /*勾选框*/
                        .item-check {
                            flex: 1;
                        }
                        /*商品名称图片*/
                        .item-name {
                            flex: 3;
                            font-size: 18px;
                            color: #333333;
                            display: flex;
                            align-items: center;
                            img {
                                width: 80px;
                                height: 80px;
                                vertical-align: middle;
                            }
                            span {
                                margin-left: 30px;
                            }
                        }
                        /*商品单价*/
                        .item-price {
                            flex: 1;
                            color: #333333;
                        }
                        /*商品数量*/
                        .item-num {
                            flex: 2;
                            .num-box {
                                display: inline-block;
                                width: 150px;
                                height: 40px;
                                line-height: 40px;
                                border: 1px solid #E5E5E5;
                                font-size: 14px;
                                /*加减符号*/
                                a {
                                    display: inline-block;
                                    width: 50px;
                                    color: #333333;
                                    cursor: pointer;
                                    &:hover{
                                        background-color: #DCDCDC;
                                    }
                                }
                                /*数量*/
                                span {
                                    display: inline-block;
                                    width: 50px;
                                    color: #333333;
                                }
                            }
                        }
                        /*商品总价*/
                        .item-total {
                            flex: 1;
                            color: #FF6600;
                        }
                        /*删除按钮*/
                        .item-del {
                            flex: 1;
                            width: 14px;
                            height: 12px;
                            background: url('../../public/imgs/icon/icon-close.png') no-repeat center;
                            background-size: contain;
                            cursor: pointer;
                        }
                    }
                }
            }
            /*购物车底部*/
            .order-wrap {
                font-size: 14px;
                color: #666666;
                margin-top: 20px;
                height: 50px;
                line-height: 50px;
                /*左侧区域*/
                .cart-tip {
                    margin-left: 29px;
                    /*继续购物*/
                    a {
                        color: #666666;
                        margin-right: 37px;
                        &:hover{
                            color: #FF6600;
                        }
                    }
                    /*商品已选件数*/
                    span {
                        color: #FF6600;
                        margin: 0 5px;
                    }
                }
                /*右侧区域*/
                .total {
                    font-size: 14px;
                    color: #FF6600;
                    /*合计金额*/
                    span {
                        font-size: 24px;
                    }
                    /*去结算*/
                    a {
                        width: 202px;
                        height: 50px;
                        line-height: 50px;
                        font-size: 18px;
                        margin-left: 37px;
                    }
                }
            }
        }
    }
</style>
