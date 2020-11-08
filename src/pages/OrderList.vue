<template>
    <div class="OrderList">
        <OrderHeader title="订单列表">
            <template v-slot:tip>
                <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
            </template>
        </OrderHeader>
        <div class="wrapper">
            <div class="container">
                <div class="order-box">
                    <!--懒加载-->
                    <Loading v-if="loading"></Loading>
                    <!--订单-->
                    <div class="order" v-for="(order, index) in list" v-bind:key="index">
                        <!--订单顶部内容-->
                        <div class="order-title">
                            <!--订单信息-->
                            <div class="item-info fl">
                                <!--订单创建时间-->
                                {{order.createTime}}
                                <span>|</span>
                                <!--订单名称-->
                                {{order.receiverName}}
                                <span>|</span>
                                <!--订单单号-->
                                订单号：{{order.orderNo}}
                                <span>|</span>
                                <!--付款方式-->
                                {{order.paymentTypeDesc}}
                            </div>
                            <!--应付金额-->
                            <div class="item-money fr">
                                <span>应付金额：</span>
                                <span class="money">{{order.payment}}</span>
                                <span>元</span>
                            </div>
                        </div>
                        <!--订单主体内容-->
                        <div class="order-content clearFix">
                            <!--商品数据-->
                            <div class="good-box fl">
                                <!--列表循环-->
                                <div class="good-list" v-for="(item, i) in order.orderItemVoList" v-bind:key="i">
                                    <!--商品图片-->
                                    <div class="good-img">
                                        <img v-lazy="item.productImage">
                                    </div>
                                    <!--商品名称-->
                                    <div class="good-name">
                                        <div class="p-name">{{item.productName}}</div>
                                        <div class="p-money">{{item.totalPrice + ' × ' + item.quantity}}</div>
                                    </div>
                                </div>
                            </div>
                            <!--付款状态-->
                            <!--如果status == 20已付款-->
                            <div class="good-state fr" v-if="order.status == 20">
                                <!--显示已付款-->
                                <a href="#">{{order.statusDesc}}</a>
                            </div>
                            <!--否则-->
                            <div class="good-state fr" v-else>
                                <!--显示未付款-->
                                <a href="#" v-on:click="goPay(order.orderNo)">{{order.statusDesc}}</a>
                            </div>
                        </div>
                    </div>
                    <!--分页器-->
                    <el-pagination
                        class="pagination"
                        background
                        layout="prev,pager,next"
                        v-bind:pageSize="pageSize"
                        v-bind:total="total"
                        v-on:current-change="handleChange"
                    >
                    </el-pagination>
                    <!--暂无数据-->
                    <NoData v-if="!loading && list.length == 0"></NoData>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import OrderHeader from '../components/OrderHeader'
    import Loading from '../components/Loading'
    import NoData from '../components/NoData'
    import {Pagination} from 'element-ui'

    export default {
        name: 'OrderList',
        components: {
            OrderHeader,
            Loading,
            NoData,
            // 动态注册插件名称
            [Pagination.name]: Pagination
        },
        data() {
            return {
                list: [], // 订单列表
                loading: true, // loading默认显示
                pageSize: 10, // 分页器每页数量
                pageNum: 1, // 分页器当前第几页
                total: 0, // 分页器总数
            }
        },
        mounted() {
            // 订单列表调用接口
            this.getOrderList();
        },
        methods: {
            // 订单列表接口
            getOrderList() {
                this.axios.get('/orders', {
                    params: {
                        pageNum: this.pageNum
                    }
                }).then((res) => {
                    this.loading = false;
                    // 获取list数据 赋值给list
                    this.list = res.list;
                    // 获取列表商品总数 赋值给total
                    this.total = res.total;
                }).catch(() => {
                    this.loading = false;
                })
            },
            // 未支付路由
            goPay(orderNo) {
                /*
                    3种路由跳转方式
                方式1
                this.$router.push('/order/list');

                方式2
                this.$router.push({
                    name: '/order/list',
                    query: {
                        orderNo
                    }
                })
                 */

                // 方式3常用
                this.$router.push({
                    // 未付款点击跳转路由
                    path: '/order/pay',
                    query: {
                        // 传参订单号
                        orderNo
                    }
                })
            },
            // 分页器
            handleChange(pageNum) {
                // 获取当前第几页
                this.pageNum = pageNum;
                // 获取订单列表
                this.getOrderList();
            }
        }
    }
</script>

<style lang="scss">
    @import '../assets/scss/Mixin';
    @import "../assets/scss/Base";

    .OrderList {
        .wrapper {
            background-color: #F5F5F5;
            padding-top: 33px;
            padding-bottom: 110px;
            .order-box {
                .order {
                    @include border();
                    background-color: #ffffff;
                    margin-bottom: 31px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    /*订单顶部内容*/
                    .order-title {
                        @include height(74px);
                        background-color: #FFFAF7;
                        padding: 0 43px;
                        font-size: 16px;
                        color: #666666;
                        /*订单信息*/
                        .item-info {
                            span {
                                margin: 0 9px;
                            }
                        }
                        /*应付金额*/
                        .item-money {
                            .money {
                                font-size: 26px;
                                color: #FF6600;
                            }
                            span:last-child {
                                color: #FF6600;
                            }
                        }
                    }
                    /*订单主体内容*/
                    .order-content {
                        padding: 0 43px;
                        /*商品数据*/
                        .good-box {
                            width: 88%;
                            /*列表循环*/
                            .good-list {
                                display: flex;
                                align-items: center;
                                height: 145px;
                                /*商品图片*/
                                .good-img {
                                    width: 112px;
                                    img {
                                        width: 100%;
                                    }
                                }
                                /*商品名称*/
                                .good-name {
                                    color: #333333;
                                    .p-name {
                                        font-size: 25px;
                                    }
                                    .p-money {
                                        font-size: 20px;
                                        color: #FF6600;
                                        padding-top: 25px;
                                    }
                                }
                            }
                        }
                        /*付款状态*/
                        .good-state {
                            @include height(145px);
                            font-size: 20px;
                            color: #FF6600;
                            a {
                                color: #FF6600;
                            }
                        }
                    }
                }
                /*分页器*/
                .pagination {
                    text-align: right;
                }
                /*分页器*/
                .el-pagination.is-background .el-pager li:not(.disabled).active {
                    background-color: #FF6600;
                    color: #ffffff;
                }
            }
        }
    }
</style>
