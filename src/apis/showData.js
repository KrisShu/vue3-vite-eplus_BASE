import request from '@/requests/request'
// 案例列表
export function apiCaseGetList(params) {
    return request.get(`/casePar/case/getList`, { params })
}
// 案例删除 删除
export function apiCaseDelete(params) {
    return request.delete(`/casePar/immigrants/delete`, { params });
}
  // 案例新增回显 回显
export function apiCaseAddShow(params) {
    return request.get(`/casePar/case/addShow`, {
      params: {
        ...params,
        metaStr: migrateMeta.join(",")
      }
    });
  }
  // 案例新增 保存
export function apiCaseAdd(params) {
    return request.post(`/casePar/case/add`, params);
  }
  // 案例编辑回显 回显
export function apiCaseUpdateShow(params) {
    return request.get(`/casePar/case/updateShow`, {
      params: {
        ...params,
        metaStr: migrateMeta.join(",")
      }
    });
  }
  // 案例编辑 保存
export function apiCaseUpdate(params) {
    return request.post(`/casePar/case/update`, params);
}

export default{
    apiCaseGetList,
    apiCaseDelete,
    apiCaseAddShow,
    apiCaseAdd,
    apiCaseUpdateShow,
    apiCaseUpdate
}