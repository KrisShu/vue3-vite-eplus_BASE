/**
 * @description:公共的接口
 */

import request from '../requests/request'

// 登陆接口
export function apiLogin(params) {
    return request.post(`/login`, params);
}
// 单个 上传图片公共的方法  上传
export function apiFileUpload(params, uploadProgressCb) {
    const requestData = new FormData();
    for (let [key, value] of Object.entries(params)) {
      requestData.append(key, value);
    }
    return request.post(`/data/single/fileUpload`, requestData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: function(progressEvent) {
        // 对原生进度事件的处理
        uploadProgressCb?.(progressEvent);
      }
    });
}


export default {
    apiLogin,
    apiFileUpload
};