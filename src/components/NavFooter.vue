<template>
    <div class="NavFooter">
        <!--底部logo-->
        <div class="footer-logo">
            <img src="/imgs/logo/logo-footer.png" alt="">
            <p>小米商城</p>
        </div>
        <!--底部列表-->
        <div class="footer-link">
            <a href="#">河畔一角主页</a>
            <span>|</span>
            <a href="#">Vue全栈课程</a>
            <span>|</span>
            <a href="#">React全家桶课程</a>
            <span>|</span>
            <a href="#">微信支付专项课程</a>
            <span>|</span>
            <a href="#">配套课程：Java通用型支付+电商平台双系统实战</a>
        </div>
        <!--底部版权-->
        <div class="footer-copyRight">
            Copyright ©2020
            <span class="domain">mi.futurefe.com</span>
            All Rights Reserved.
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NavFooter'
    }
</script>

<style lang="scss">
    .NavFooter {
        height: 234px;
        border-top: 4px solid #FF6600;
        background-color: #333333;
        color: #999999;
        font-size: 16px;
        text-align: center;
        /*底部logo*/
        .footer-logo {
            margin-top: 46px;
            margin-bottom: 31px;
            img {
                width: 53px;
                height: 36px;
                margin-bottom: 13px;
            }
        }
        /*底部列表*/
        .footer-link {
            margin-bottom: 13px;
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
            .domain {
                color: #FF6600;
            }
        }
    }
</style>
