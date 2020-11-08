<template>
    <div class="Login">
        <!--头部区域-->
        <div class="header">
            <div class="container">
                <!--头部logo-->
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <!--头部logo-->
                <div class="header-title">
                    <h1>小米商城</h1>
                    <h6>让每个人都能享受科技的乐趣</h6>
                </div>
            </div>
        </div>
        <!--中间区域-->
        <div class="wrapper">
            <div class="container">
                <!--登录表单-->
                <div class="login-form">
                    <!--表单标题-->
                    <div class="form-title">
                        <span class="checked">帐号登录</span>
                        <span class="sep-line">|</span>
                        <span>扫码登录</span>
                    </div>
                    <!--表单输入框-->
                    <div class="form-input">
                        <input type="text" placeholder="请输入帐号" v-model="username">
                    </div>
                    <div class="form-input">
                        <input type="password" placeholder="请输入密码" v-model="password">
                    </div>
                    <!--表单登录-->
                    <div class="form-button">
                        <a href="#" class="btn" v-on:click="login">登录</a>
                    </div>
                    <!--表单注册&忘记密码-->
                    <div class="form-tips">
                        <!--手机短信登录-->
                        <div class="sms">手机短信登录</div>
                        <!--注册&忘记密码-->
                        <div class="reg">
                            <a href="/#/registered" v-on:click="register">立即注册</a>
                            <span>|</span>
                            <a href="#">忘记密码？</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--底部区域-->
        <div class="footer">
            <!--底部列表-->
            <div class="footer-link">
                <a href="#">简体</a>
                <span>|</span>
                <a href="#">繁体</a>
                <span>|</span>
                <a href="#">English</a>
                <span>|</span>
                <a href="#">常见问题</a>
                <span>|</span>
                <a href="#">隐私政策</a>
            </div>
            <!--底部版权-->
            <p class="footer-copyRight">Copyright &copy;2019
                <span>mi.futurefe.com</span>
                All Rights Reserved.
            </p>
        </div>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'Login',
        data() {
            return {
                username: '', // 用户名
                password: '', // 密码
                userId: '', // 用户ID
            }
        },
        methods: {
            // 登录接口
            login() {
                let {username, password} = this;
                this.axios.post('/user/login', {
                    username,
                    password
                }).then((res) => {
                    // to-do 保存用户名
                    this.$cookie.set('userId', res.id, {expires: '1M'});
                    this.$router.push('/index');
                    this.$message.success('登录成功');
                    window.location.reload(); // 强制刷新
                })
            },
            // 注册接口
            register() {
                this.axios.post('/user/register', {
                    username: 'mojihuan-3',
                    password: '123456',
                    email: '000002@163.com'
                }).then(() => {
                    this.$message.success('注册成功');
                    // 注册-跳转路由
                    this.$router.push('/index');
                })
            },
            // 登录用户名显示
            ...mapActions(['saveUserName'])
        }
    }
</script>
<style lang="scss">
    @import "../assets/scss/Base";
    @import "../assets/scss/Mixin";
    @import "../assets/scss/Button";

    .Login {
        /*头部区域*/
        .header {
            height: 112px;
            /*头部标题*/
            .header-title {
                display: inline-block;
                margin-left: 18px;
                margin-top: 18px;
                h1 {
                    font-size: 33px;
                    font-weight: normal;
                }
                h6 {
                    font-size: 10px;
                    font-weight: normal;
                }
            }
        }
        /*中间区域*/
        .wrapper {
            background: url('https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/aece569d6689b4c461bb53efd9eea9c7.jpg') no-repeat center;
            .container {
                height: 576px;
                position: relative;
                /*登录表单*/
                .login-form {
                    box-sizing: border-box;
                    padding-left: 31px;
                    padding-right: 31px;
                    width: 410px;
                    height: 539px;
                    background-color: #ffffff;
                    position: absolute;
                    top: 37px;
                    bottom: 29px;
                    left: 800px;
                    right: 0;
                    /*表单标题*/
                    .form-title {
                        line-height: 23px;
                        font-size: 24px;
                        text-align: center;
                        padding: 27px 0 24px;
                        .checked {
                            color: #FF6600;
                        }
                        .sep-line {
                            margin: 0 32px;
                        }
                    }
                    /*表单输入框*/
                    .form-input {
                        display: inline-block;
                        width: 348px;
                        height: 50px;
                        line-height: 50px;
                        border: 1px solid #E5E5E5;
                        margin-bottom: 20px;
                        overflow: hidden;
                        input {
                            width: 100%;
                            height: 100%;
                            border: none;
                            padding: 18px;
                        }
                    }
                    /*表单登录*/
                    .form-button {
                        .btn {
                            width: 100%;
                            line-height: 50px;
                            font-size: 16px;
                        }
                    }
                    /*表单注册&忘记密码*/
                    .form-tips {
                        margin-top: 14px;
                        display: flex;
                        justify-content: space-between;
                        font-size: 14px;
                        cursor: pointer;
                        /*手机短信登录*/
                        .sms {
                            color: #FF6600;
                        }
                        /*注册&忘记密码*/
                        .reg {
                            color: #999999;
                            a {
                                color: #999999;
                            }
                            span {
                                margin: 0 7px;
                            }
                        }
                        a:hover:nth-child(1) {
                            color: #FF6600;
                        }
                        a:hover:nth-child(3) {
                            color: #FF6600;
                        }
                    }
                }
            }
        }
        /*底部区域*/
        .footer {
            height: 100px;
            padding-top: 60px;
            color: #999999;
            font-size: 14px;
            text-align: center;
            /*底部列表*/
            .footer-link {
                a {
                    color: #999999;
                    display: inline-block;
                }
                span {
                    margin: 0 10px;
                }
            }
            /*底部版权*/
            .footer-copyRight {
                margin-top: 13px;
                span {
                    color: #FF6600;
                }
            }
        }
    }
</style>
