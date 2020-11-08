<template>
    <div class="order-confirm">
        <OrderHeader title="订单确认">
            <template v-slot:tip>
                <span>请认真填写收货地址</span>
            </template>
        </OrderHeader>
        <div class="wrapper">
            <div class="container">
                <!--订单确认页面-->
                <div class="order-box">
                    <!--收货地址-->
                    <div class="item-address">
                        <!--地址标题-->
                        <h2 class="address-title">收货地址</h2>
                        <!--地址列表-->
                        <div class="address-list clearFix">
                            <!--已添加地址-->
                            <div class="address-info" v-for="(item, index) in list" v-bind:key="index"
                                 v-bind:class="{'checked' : index == checkIndex}" v-on:click="checkIndex=index">
                                <!--姓名-->
                                <h2>{{item.receiverName}}</h2>
                                <!--手机号-->
                                <div class="phone">{{item.receiverMobile}}</div>
                                <!--省市区-->
                                <div class="street">
                                    {{item.receiverProvince + '' + item.receiverCity + '' + item.receiverDistrict + '' +
                                    item.receiverAddress }}
                                </div>
                                <!--操作地址-->
                                <div class="action">
                                    <!--删除地址-->
                                    <a href="#" class="fl" v-on:click="deleteAddress(item)">
                                        <span class="icon icon-delete"></span>
                                    </a>
                                    <!--编辑地址-->
                                    <a href="#" class="fr" v-on:click="editorAddressModal(item)">
                                        <span class="icon icon-editor"></span>
                                    </a>
                                </div>
                            </div>
                            <!--添加新地址-->
                            <div class="address-add" v-on:click="openAddressModal">
                                <div class="icon-add"></div>
                                <div>添加新地址</div>
                            </div>
                        </div>
                    </div>
                    <!--商品信息-->
                    <div class="item-good">
                        <h2>商品</h2>
                        <ul>
                            <li v-for="(item, index) in cartList" v-bind:key="index">
                                <!--商品名称图片-->
                                <div class="good-name">
                                    <img v-lazy="item.productMainImage" alt="">
                                    <span>{{item.productName + '' + item.productSubtitle}}</span>
                                </div>
                                <!--商品价格-->
                                <div class="good-price">{{item.productPrice}}元×{{item.quantity}}件</div>
                                <!--商品总价-->
                                <div class="good-total">{{item.productTotalPrice}}元</div>
                            </li>
                        </ul>
                    </div>
                    <!--配送方式-->
                    <div class="item-shipping">
                        <h2>配送方式</h2>
                        <span>包邮</span>
                    </div>
                    <!--发票-->
                    <div class="item-invoice">
                        <h2>发票</h2>
                        <a>电子发票</a>
                        <a>个人</a>
                    </div>
                    <!--商品价格明细-->
                    <div class="detail">
                        <div class="item">
                            <span class="item-name">商品件数：</span>
                            <span class="item-val">{{count}}</span>
                            <span class="item-color">件</span>
                        </div>
                        <div class="item">
                            <span class="item-name">商品总价：</span>
                            <span class="item-val">{{cartTotalPrice}}</span>
                            <span class="item-color">元</span>
                        </div>
                        <div class="item">
                            <span class="item-name">优惠活动：</span>
                            <span class="item-val">0</span>
                            <span class="item-color">元</span>
                        </div>
                        <div class="item">
                            <span class="item-name">运费：</span>
                            <span class="item-val">0</span>
                            <span class="item-color">元</span>
                        </div>
                        <div class="item item-total">
                            <span class="item-name">应付总额：</span>
                            <span class="item-val">{{cartTotalPrice}}</span>
                            <span class="item-color">元</span>
                        </div>
                    </div>
                    <!--去结算按钮-->
                    <div class="btn-group">
                        <a href="#" class="btn btn-default btn-large" v-on:click="backCart">返回购物车</a>
                        <a href="#" class="btn btn-large" v-on:click="orderSubmit">去结算</a>
                    </div>
                </div>
            </div>
        </div>
        <!--新增地址弹窗-->
        <Modal
            title="添加收货地址"
            btnType="1"
            v-bind:showModal="showEditorModal"
            v-on:cancel="showEditorModal=false"
            v-on:submit="submitAddress"
        >
            <template v-slot:body>
                <div class="editor-wrap">
                    <div class="item">
                        <!--姓名-->
                        <input type="text" class="input" placeholder="姓名" v-model="checkedItem.receiverName"
                               maxlength="5">
                        <!--手机号-->
                        <input type="text" class="input" placeholder="手机号" v-model="checkedItem.receiverMobile"
                               maxlength="11">
                    </div>
                    <div class="item">
                        <!--省-->
                        <select name="province" v-model="checkedItem.receiverProvince">
                            <option disabled selected>请选择</option>
                            <option value="广东省">广东省</option>
                            <option value="湖南省">湖南省</option>
                            <option value="河北省">河北省</option>
                        </select>
                        <!--市-->
                        <select name="city" v-model="checkedItem.receiverCity">
                            <option value="广州市">广州市</option>
                            <option value="长沙市">长沙市</option>
                            <option value="石家庄市">石家庄市</option>
                        </select>
                        <!--区-->
                        <select name="district" v-model="checkedItem.receiverDistrict">
                            <option value="越秀区">越秀区</option>
                            <option value="海珠区">海珠区</option>
                            <option value="番禺区">番禺区</option>
                        </select>
                    </div>
                    <!--详情地址-->
                    <div class="item">
                        <textarea name="street" cols="30" rows="10" placeholder="请输入详情地址"
                                  v-model="checkedItem.receiverAddress" maxlength="100"></textarea>
                    </div>
                    <!--邮编-->
                    <div class="item">
                        <input type="text" class="input" placeholder="邮编" v-model="checkedItem.receiverZip"
                               maxlength="6">
                    </div>
                </div>
            </template>
        </Modal>
        <!--删除地址弹窗-->
        <Modal
            title="删除收货地址"
            btnType="1"
            v-bind:showModal="showDeleteModal"
            v-on:cancel="showDeleteModal=false"
            v-on:submit="submitAddress"
        >
            <template v-slot:body>
                <p>您确认要删除此地址吗？</p>
            </template>
        </Modal>
    </div>
</template>
<script>
    import Modal from '../components/Modal'
    import OrderHeader from '../components/OrderHeader'

    export default {
        name: 'OrderConfirm',
        components: {
            Modal,
            OrderHeader
        },
        data() {
            return {
                list: [], // 收货地址列表
                cartList: [], // 购物车需要结算的商品列表
                cartTotalPrice: 0, // 商品总金额
                count: 0, // 商品结算数量
                checkedItem: {}, // 选中的商品对象
                userAction: '', // 用户行为 0新增地址、1编辑地址、2删除地址
                showDeleteModal: false, // 是否显示删除弹窗
                showEditorModal: false, // 是否显示新增或编辑弹窗
                checkIndex: 0,// 当前收货地址选中索引
            }
        },
        mounted() {
            this.getAddressList();
            this.getCartList();
        },
        methods: {
            // 订单确认收货地址接口
            getAddressList() {
                this.axios.get('/shippings').then((res) => {
                    this.list = res.list;
                })
            },
            // 购物车列表接口
            getCartList() {
                this.axios.get('/carts').then((res) => {
                    // 获取购物车中所有商品数据
                    let list = res.cartProductVoList;
                    // 商品总金额
                    this.cartTotalPrice = res.cartTotalPrice;
                    // 购物车需要结算的商品列表
                    this.cartList = list.filter(item => item.productSelected);
                    // 商品结算数量
                    this.cartList.map((item) => {
                        this.count += item.quantity;
                    })
                })
            },
            // 订单提交
            orderSubmit() {
                let item = this.list[this.checkIndex];
                if (!item) {
                    this.$message.error('请选择一个收货地址！');
                    return;
                }
                // 订单创建接口
                this.axios.post('/orders', {
                    shippingId: item.id
                }).then((res) => {
                    this.$router.push({
                        // 路径
                        path: '/order/pay',
                        // 参数
                        query: {
                            orderNo: res.orderNo
                        }
                    })
                })
            },
            // 打开添加地址弹窗
            openAddressModal() {
                this.userAction = 0;
                this.checkedItem = {};
                this.showEditorModal = true;
            },
            // 打开编辑地址弹窗
            editorAddressModal(item) {
                this.userAction = 1;
                this.checkedItem = item;
                this.showEditorModal = true;
            },
            // 打开删除地址弹窗
            deleteAddress(item) {
                this.userAction = 2;
                this.checkedItem = item;
                this.showDeleteModal = true;
            },
            // 地址删除、编辑、添加功能
            submitAddress() {
                let {checkedItem, userAction} = this;
                let method, url, params = {};
                if (userAction == 0) {
                    // 添加地址接口
                    method = 'post', url = '/shippings';
                } else if (userAction == 1) {
                    // 编辑地址接口
                    method = 'put', url = `shippings/${checkedItem.id}`;
                } else {
                    // 删除地址接口
                    method = 'delete', url = `shippings/${checkedItem.id}`;
                }
                // 弹窗错误提示
                if (userAction == 0 || userAction == 1) {
                    let {receiverName, receiverMobile, receiverProvince, receiverCity, receiverDistrict,
                        receiverAddress, receiverZip} = checkedItem;
                    let errMsg = '';
                    if (!receiverName) {
                        errMsg = '请输入收货人姓名';
                    } else if (!receiverMobile || !/^1[3456789]\d{9}$/.test(receiverMobile)) {
                        errMsg = '请输入正确格式的手机号';
                    } else if (!receiverProvince) {
                        errMsg = '请选择省份';
                    } else if (!receiverCity) {
                        errMsg = '请选择对应的城市';
                    } else if (!receiverDistrict) {
                        errMsg = '请选择区/县';
                    } else if (!receiverAddress) {
                        errMsg = '请输入收货地址';
                    } else if (!/\d{6}/.test(receiverZip)) {
                        errMsg = '请输入6位邮编';
                    }
                    if (errMsg) {
                        this.$message.error(errMsg);
                        return;
                    }
                    // 添加、编辑地址的参数个数
                    params = {
                        receiverName: checkedItem.receiverName,
                        receiverMobile: checkedItem.receiverMobile,
                        receiverProvince: checkedItem.receiverProvince,
                        receiverCity: checkedItem.receiverCity,
                        receiverDistrict: checkedItem.receiverDistrict,
                        receiverAddress: checkedItem.receiverAddress,
                        receiverZip: checkedItem.receiverZip
                    }
                }
                // 添加地址成功提示
                this.axios[method](url, params).then(() => {
                    this.closeModal();
                    this.getAddressList();
                    this.$message.success('操作成功');
                })
            },
            // 关闭弹窗公共方法
            closeModal() {
                this.checkedItem = {};
                this.userAction = '';

                this.showDeleteModal = false;
                this.showEditorModal = false;
            },
            // 返回购物车路由
            backCart() {
                this.$router.push('/cart');
            }
        }
    }
</script>
<style lang="scss">
    @import "../assets/scss/Base";

    .order-confirm {
        .wrapper {
            background-color: #F5F5F5;
            padding-top: 30px;
            padding-bottom: 30px;
            /*订单确认页面*/
            .order-box {
                background-color: #ffffff;
                padding-left: 40px;
                padding-bottom: 20px;
                /*地址标题*/
                .address-title {
                    font-size: 20px;
                    color: #333333;
                    font-weight: 200;
                    margin-bottom: 21px;
                }
                /*收货地址*/
                .item-address {
                    padding-top: 38px;
                    /*地址列表*/
                    .address-list {
                        /*已添加地址、添加新地址*/
                        .address-info, .address-add {
                            box-sizing: border-box;
                            float: left;
                            width: 271px;
                            height: 180px;
                            border: 1px solid #E5E5E5;
                            margin: 0 15px 15px 0;
                            padding: 15px 24px;
                            font-size: 14px;
                            color: #757575;
                        }
                        /*已添加地址*/
                        .address-info {
                            cursor: pointer;
                            h2 {
                                height: 27px;
                                font-size: 18px;
                                font-weight: 300;
                                color: #333;
                                margin-bottom: 10px;
                            }
                            .phone{
                                width: 100px;
                                height: 20px;
                                line-height: 20px;
                                margin-bottom: 5px;
                            }
                            /*省市区*/
                            .street {
                                height: 40px;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                            }
                            /*操作地址*/
                            .action {
                                height: 50px;
                                line-height: 50px;
                                .icon {
                                    width: 20px;
                                    height: 20px;
                                    fill: #666666;
                                    vertical-align: middle;
                                    &:hover {
                                        fill: #FF6700;
                                    }
                                }
                                /*删除、编辑地址图标*/
                                .icon-delete, .icon-editor {
                                    display: inline-block;
                                    width: 30px;
                                    height: 30px;
                                }
                                /*删除地址图标*/
                                .icon-delete {
                                    background: url("../../public/imgs/icon/icon-address-delete.svg") no-repeat center;
                                    background-size: 35px;
                                }
                                /*编辑地址图标*/
                                .icon-editor {
                                    background: url("../../public/imgs/icon/icon-address-editor.svg") no-repeat center;
                                    background-size: 35px;
                                }
                            }
                            &.checked {
                                border: 2px solid #ff6700;
                            }
                        }
                        /*添加新地址*/
                        .address-add {
                            text-align: center;
                            color: #999999;
                            cursor: pointer;
                            /*添加地址图标*/
                            .icon-add {
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                background: url('../../public/imgs/icon/icon-address-add.svg') no-repeat center;
                                background-size: 40px;
                                margin: 0 auto;
                                margin-top: 45px;
                                margin-bottom: 10px;
                            }
                        }
                    }
                }
                /*商品信息*/
                .item-good {
                    margin-top: 34px;
                    border-bottom: 1px solid #E5E5E5;
                    padding-bottom: 12px;
                    h2 {
                        border-bottom: 1px solid #E5E5E5;
                        padding-bottom: 5px;
                    }
                    li {
                        display: flex;
                        align-items: center;
                        height: 40px;
                        line-height: 40px;
                        margin-top: 10px;
                        font-size: 16px;
                        color: #333333;
                        /*商品名称图片*/
                        .good-name {
                            flex: 5;
                            img {
                                width: 50px;
                                height: 50px;
                                vertical-align: middle;
                                margin-right: 20px;
                            }
                        }
                        /*商品价格*/
                        .good-price {
                            flex: 2;
                        }
                        /*商品总价*/
                        .good-total {
                            padding-right: 44px;
                            color: #FF6600;
                        }
                    }
                }
                /*配送方式、发票*/
                .item-shipping, .item-invoice {
                    margin-top: 31px;
                    line-height: 20px;
                    h2 {
                        display: inline-block;
                        margin-right: 71px;
                        font-size: 20px;
                        width: 80px;
                    }
                    span, a {
                        font-size: 16px;
                        color: #FF6700;
                        margin-right: 23px;
                    }
                }
                /*商品价格明细*/
                .detail {
                    padding: 30px 44px 33px 0;
                    border-bottom: 1px solid #f5f5f5;
                    text-align: right;
                    font-size: 16px;
                    color: #666666;
                    .item {
                        line-height: 15px;
                        margin-bottom: 15px;
                        &:last-child {
                            margin-top: 35px;
                        }
                        .item-color {
                            color: #FF6600;
                        }
                    }
                    .item-val {
                        display: inline-block;
                        width: 150px;
                        color: #FF6600;
                    }
                    /*应付总额*/
                    .item-total {
                        .item-val {
                            font-size: 28px;
                        }
                    }
                }
                /*去结算按钮*/
                .btn-group {
                    margin-top: 20px;
                    text-align: right;
                    margin-right: 40px;
                }
            }
        }
        /*新增地址*/
        .editor-wrap {
            font-size: 14px;
            .item {
                margin-bottom: 15px;
                /*姓名、手机号、邮编*/
                .input {
                    display: inline-block;
                    width: 283px;
                    height: 40px;
                    line-height: 40px;
                    padding-left: 15px;
                    border: 1px solid #e5e5e5;
                    &:nth-child(2) {
                        margin-left: 14px;
                    }
                    &:focus {
                        outline: none;
                        border: 1px solid #FF6600;
                    }
                }
                /*省市区*/
                select {
                    height: 40px;
                    line-height: 40px;
                    border: 1px solid #e5e5e5;
                    margin-right: 15px;
                    padding: 5px;
                }
                /*详情地址*/
                textarea {
                    height: 62px;
                    width: 100%;
                    padding: 13px 15px;
                    box-sizing: border-box;
                    border: 1px solid #e5e5e5;
                    resize: none;

                }
                .input, select, textarea {
                    &:hover {
                        border: 1px solid #A9A9A9;
                    }
                }
                .input, textarea {
                    &:focus {
                        outline: none;
                        border: 1px solid #FF6600;
                    }
                }
            }
        }
    }
</style>
