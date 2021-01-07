const baseUrl = 'https://ego.lanlnk.com/shop';
export default {
    action:{
        getOpenid : baseUrl + '/v1/wechatmini/openid',
        bindUser : baseUrl + '/v1/wechatmini/creat-bind',
        userLogin: baseUrl + '/v1/wechatmini/auto-login/',
        index_detail:baseUrl+ '/v1/index/detail',
    }
}
