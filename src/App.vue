<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: 'App',
        mounted() {
            if (this.$cookie.get('userId')) {
                this.getCartCount();
                this.getUser();
            }
        },
        methods: {
            // 获取登录用户信息接口
            getUser() {
                this.axios.get('/user',).then((res = {}) => {
                    // to-do 保存到vuex里面
                    this.$store.dispatch('saveUserName', res.username);
                })
            },
            // 获取购物车数量接口
            getCartCount() {
                this.axios.get('/carts/products/sum',).then((res = 0) => {
                    // to-do 保存到vuex里面
                    this.$store.dispatch('saveCartCount', res);
                })
            },
        }
    }
</script>

<style lang="scss">
    @import "assets/scss/Reset";

</style>
