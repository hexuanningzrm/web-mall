let baseUrl;

switch (process.env.NODE_ENV) {
    // 开发环境
    case 'development':
        baseUrl = 'http://development-mall-pre.springboot.cn/api';
        break;
    // 测试环境
    case 'test':
        baseUrl = 'http://test-mall-pre.springboot.cn/api';
        break;
    // 打包上线环境
    case 'production':
        baseUrl = 'http://production-mall-pre.springboot.cn/api';
        break;
    // 预发布环境
    case 'prev':
        baseUrl = 'http://prev-mall-pre.springboot.cn/api';
        break;
    default:
        // 线上环境
        baseUrl = 'http://mall-pre.springboot.cn/api';
        break;
}

export default {
    baseUrl
}
