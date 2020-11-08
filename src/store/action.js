// 传输
export default {
    // 登录用户名
    saveUserName(context, username) {
        context.commit('saveUserName', username);
    },
    // 购物车数量
    saveCartCount(context, count) {
        context.commit('saveCartCount', count);
    },
}
