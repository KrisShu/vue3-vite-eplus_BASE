/**
 * @description:公共的接口
 */

import request from '../requests/request'

// 登陆接口
export function apiLogin(params) {
    return request.post(`/login`, params);
}

export default {
    apiLogin
};