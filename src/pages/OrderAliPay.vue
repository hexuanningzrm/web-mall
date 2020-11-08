<template>
    <div class="OrderAliPay">
        <OrderHeader title="订单支付">
            <template v-slot:tip>
                <span>请选择支付方式</span>
            </template>
        </OrderHeader>
        <div class="ali-pay">
            <loading v-if="loading"></loading>
            <!--v-html会覆盖元素原有内容，能解析并插入HTML标签-->
            <div class="form" v-html="content"></div>
        </div>
        <Loading></Loading>
    </div>
</template>

<script>
    import Loading from '../components/Loading'
    import OrderHeader from '../components/OrderHeader'

    export default {
        name: 'OrderAliPay',
        components:{
            Loading,
            OrderHeader
        },
        data() {
            return {
                orderId: this.$route.query.orderId, // 获取订单id参数
                content: '', // html源码
                loading: true // loading默认显示
            }
        },
        mounted() {
            // 支付调用接口
            this.paySubmit();
        },
        methods: {
            // 支付接口
            paySubmit() {
                this.axios.post('/pay', {
                    orderId: this.orderId,  // 订单id
                    orderName: 'Vue高仿小米商城', // 订单名称
                    amount: 0.01, // 单位元
                    payType: 1 // 1支付宝、2微信
                }).then((res) => {
                    // content是html源码，渲染到页面上后自动跳转到支付页面
                    this.content = res.content;
                    setTimeout(() => {
                        // forms 返回一个集合 (一个HTMLCollection对象),包含了了当前文档中的所有form元素.
                        document.forms[0].submit();
                    }, 100)
                })
            }
        }
    }
</script>

<style>

</style>

