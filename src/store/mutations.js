// 读取
export default {
    // 登录用户名
    saveUserName(state, username) {
        state.username = username;
    },
    // 购物车数量
    saveCartCount(state, count) {
        state.cartCount = count;
    },
}
