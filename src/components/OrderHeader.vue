<template>
    <!--导航条-->
    <div class="OrderHeader">
        <div class="container clearFix">
            <!--导航logo-->
            <div class="header-logo fl">
                <a href="#" v-on:click="headerLogo"></a>
            </div>
            <!--导航标题-->
            <div class="header-title fl">
                <h2>{{title}}
                    <slot name="tip"></slot>
                </h2>
            </div>
            <!--导航用户名-->
            <div class="header-username fr">
                <a href="#">{{username}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'OrderHeader',
        computed: {
            // 登录用户名显示
            ...mapState(['username'])
        },
        props: {
            title: String
        },
        methods: {
            headerLogo() {
                this.$router.push('/index');
                window.location.reload(); // 强制刷新
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/Mixin";
    @import "../assets/scss/Base";

    /*导航条*/
    .OrderHeader {
        padding: 30px 0;
        border-bottom: 2px solid #FF6600;
        .container {
            /*导航标题、导航用户名*/
            .header-title, .header-username {
                display: inline-block;
                height: 55px;
                line-height: 55px;
            }
            /*导航标题*/
            .header-title {
                font-size: 28px;
                color: #333333;
                margin-left: 54px;
                span {
                    font-size: 14px;
                    margin-left: 17px;
                    color: #999999;
                    font-weight: 200;
                }
                h2 {
                    font-size: 28px;
                }
            }
            /*导航用户名*/
            .header-username {
                a {
                    color: #666666;
                    font-size: 16px;
                }
            }
        }
    }
</style>
