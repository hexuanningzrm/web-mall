<template>
    <div class="order-pay">
        <OrderHeader title="订单支付">
            <template v-slot:tip>
                <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
            </template>
        </OrderHeader>
        <div class="wrapper">
            <div class="container">
                <!--订单信息-->
                <div class="order-wrap">
                    <div class="item-order">
                        <!--打勾图标-->
                        <div class="icon-succ"></div>
                        <!--付款信息-->
                        <div class="order-info">
                            <h2>订单提交成功！去付款咯～</h2>
                            <!--订单倒计时-->
                            <p>请在
                                <span>30分</span>
                                内完成支付, 超时后将取消订单
                            </p>
                            <!--收货地址-->
                            <p>收货信息：{{addressInfo}}</p>
                        </div>
                        <!--应付总价-->
                        <div class="order-total">
                            <!--应付总额-->
                            <p>应付总额：
                                <span>{{payment}}</span>
                                <span class="order-detailColor">元</span>
                            </p>
                            <!--详情标题-->
                            <p>订单详情
                                <em class="icon-down" v-bind:class="{'up':showDetail}"
                                    v-on:click="showDetail=!showDetail"></em>
                            </p>
                        </div>
                    </div>
                    <!--订单详情内容-->
                    <div class="item-detail" v-if="showDetail">
                        <!--订单号-->
                        <div class="item">
                            <div class="detail-title">订单号：</div>
                            <div class="detail-info theme-color">{{orderId}}</div>
                        </div>
                        <!--收货信息-->
                        <div class="item">
                            <div class="detail-title">收货信息：</div>
                            <div class="detail-info">{{addressInfo}}</div>
                        </div>
                        <!--商品名称-->
                        <div class="item good">
                            <div class="detail-title">商品名称：</div>
                            <div class="detail-info">
                                <ul>
                                    <li v-for="(item,index) in orderDetail" :key="index">
                                        <img v-lazy="item.productImage"/>{{item.productName}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--发票信息-->
                        <div class="item">
                            <div class="detail-title">发票信息：</div>
                            <div class="detail-info">电子发票 个人</div>
                        </div>
                    </div>
                </div>
                <!--付款方式-->
                <div class="item-pay">
                    <h3>选择以下支付方式付款</h3>
                    <div class="pay-way">
                        <p>支付平台</p>
                        <!--支付宝支付-->
                        <div class="pay pay-ali" v-bind:class="{'checked' : payType==1}"
                             v-on:click="paySubmit(1)"></div>
                        <!--微信支付-->
                        <div class="pay pay-wechat" v-bind:class="{'checked' : payType==2}"
                             v-on:click="paySubmit(2)"></div>
                    </div>
                </div>
            </div>
        </div>
        <ScanPayCode v-if="showPay" v-on:close="closePayModal" v-bind:img="payImg"></ScanPayCode>
        <Modal
            title="支付确认"
            btnType="3"
            v-bind:showModal="showPayModal"
            sureText="查看订单"
            cancelText="未支付"
            v-on:cancel="showPayModal=false"
            v-on:submit="goOrderList"
        >
            <template v-slot:body>
                <p>您确认是否完成支付？</p>
            </template>
        </Modal>
    </div>
</template>
<script>
    import QRCode from 'qrcode'
    import ScanPayCode from '../components/ScanPayCode'
    import Modal from '../components/Modal'
    import OrderHeader from '../components/OrderHeader'

    export default {
        name: 'orderPay',
        components: {
            ScanPayCode,
            Modal,
            OrderHeader
        },
        data() {
            return {
                orderId: this.$route.query.orderNo, // 订单号
                addressInfo: '', // 收货人地址
                orderDetail: [], // 订单详情，包含商品列表
                showDetail: false, // 是否显示订单详情
                payType: '', // 支付类型 1支付宝支付、2微信支付
                showPay: false, // 是否显示支付弹窗
                payImg: '', // 微信支付的二维码地址
                showPayModal: false, // 是否显示二次支付确认弹窗
                T: '', //定时器ID
                payment: 0,// 订单总金额
            }
        },
        mounted() {
            // 订单详情调用接口
            this.getOrderDetail();
        },
        methods: {
            // 订单详情接口
            getOrderDetail() {
                this.axios.get(`/orders/${this.orderId}`).then((res) => {
                    let item = res.shippingVo;
                    // 获取收货人地址 赋值给addressInfo
                    this.addressInfo = `${item.receiverName} ${item.receiverMobile}
                    ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`;
                    // 获取订单详情 赋值给orderDetail
                    this.orderDetail = res.orderItemVoList;
                    // 获取订单总金额 赋值给payment
                    this.payment = res.payment;
                })
            },
            paySubmit(payType) {
                if (payType == 1) {
                    // window.open(传入浏览器路径拼接订单号) 方法用于打开一个新的浏览器窗口
                    window.open('/#/order/alipay?orderId=' + this.orderId, '_blank')
                } else {
                    // 支付接口
                    this.axios.post('/pay', {
                        orderId: this.orderId,  // 订单id
                        orderName: 'Vue高仿小米商城', // 订单名称
                        amount: 0.01, // 单位元
                        payType: 2 // 1支付宝、2微信
                    }).then((res) => {
                        // 把接口返回的content转换成URL地址
                        QRCode.toDataURL(res.content).then((url) => {
                            this.showPay = true;
                            this.payImg = url;
                            this.loopOrderState();
                        }).catch(() => {
                            this.$message.error('微信二维码生成失败，请稍后重试！');
                        })
                    })
                }
            },
            // 关闭微信弹窗
            closePayModal() {
                this.showPay = false;
                // 关闭微信弹窗后显示二次支付确认弹窗
                this.showPayModal = true;
                // 关闭定时器
                clearInterval(this.T);
            },
            // 轮询当前订单支付状态
            loopOrderState() {
                this.T = setInterval(() => {
                    // 订单列表接口
                    this.axios.get(`/orders/${this.orderId}`).then((res) => {
                        // status20=已付款
                        if (res.status == 20) {
                            clearInterval(this.T);
                            this.$message.success('支付成功！');
                            this.goOrderList();
                        }
                    })
                }, 1000)
            },
            // 查看订单路由
            goOrderList() {
                this.$router.push('/order/list');
            }
        }
    }
</script>
<style lang="scss">
    .order-pay {
        .wrapper {
            background-color: #F5F5F5;
            padding-top: 30px;
            padding-bottom: 61px;
            /*订单信息*/
            .order-wrap {
                padding: 62px 50px;
                background-color: #fff;
                font-size: 14px;
                margin-bottom: 30px;
                .item-order {
                    display: flex;
                    align-items: center;
                    /*打勾图标*/
                    .icon-succ {
                        width: 90px;
                        height: 90px;
                        border-radius: 50%;
                        background: url('../../public/imgs/icon/icon-gou.png') #80c58a no-repeat center;
                        background-size: 60px;
                        margin-right: 40px;
                    }
                    /*付款信息*/
                    .order-info {
                        margin-right: 248px;
                        h2 {
                            font-size: 24px;
                            color: #333333;
                            margin-bottom: 20px;
                        }
                        p {
                            color: #666666;
                            span {
                                color: #FF6700;
                            }
                        }
                    }
                    /*应付总价*/
                    .order-total {
                        p {
                            &:first-child {
                                margin-bottom: 30px;
                            }
                            span {
                                font-size: 28px;
                                color: #FF6700;
                            }
                            /*应付总额*/
                            .order-detailColor {
                                font-size: 14px;
                            }
                            /*详情标题*/
                            .icon-down {
                                display: inline-block;
                                width: 14px;
                                height: 10px;
                                background: url('../../public/imgs/icon/icon-down.png') no-repeat center;
                                background-size: contain;
                                margin-left: 9px;
                                transition: all .5s;
                                cursor: pointer;
                                &.up {
                                    /*订单详情图标旋转180度*/
                                    transform: rotate(180deg);
                                }
                            }
                        }
                    }
                }
                /*订单详情内容*/
                .item-detail {
                    border-top: 1px solid #D7D7D7;
                    padding-top: 47px;
                    padding-left: 130px;
                    font-size: 14px;
                    margin-top: 45px;
                    .item {
                        margin-bottom: 19px;
                        /*左标题*/
                        .detail-title {
                            float: left;
                            width: 100px;
                        }
                        /*右内容*/
                        .detail-info {
                            display: inline-block;
                            img {
                                width: 50px;
                                height: 50px;
                                vertical-align: middle;
                            }
                        }
                        /*订单号*/
                        .theme-color {
                            color: #FF6600;
                        }
                    }
                }
            }
            /*付款方式*/
            .item-pay {
                padding: 26px 50px 72px;
                background-color: #ffffff;
                color: #333333;
                h3 {
                    font-size: 20px;
                    font-weight: 200;
                    color: #333333;
                    padding-bottom: 24px;
                    border-bottom: 1px solid #D7D7D7;
                    margin-bottom: 26px;
                }
                .pay-way {
                    font-size: 18px;
                    .pay {
                        display: inline-block;
                        width: 188px;
                        height: 64px;
                        border: 1px solid #D7D7D7;
                        cursor: pointer;
                        &:last-child {
                            margin-left: 20px;
                        }
                        &.checked {
                            border: 1px solid #FF6700;
                        }
                    }
                    /*支付宝支付*/
                    .pay-ali {
                        background: url('../../public/imgs/icon/icon-ali.png') no-repeat center;
                        background-size: 103px 38px;
                        margin-top: 19px;
                    }
                    /*微信支付*/
                    .pay-wechat {
                        background: url('../../public/imgs/icon/icon-wechat.png') no-repeat center;
                        background-size: 103px 38px;
                    }
                }
            }
        }
    }
</style>
