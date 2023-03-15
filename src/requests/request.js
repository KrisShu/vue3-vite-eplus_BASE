/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import { useCommonStore } from '../store/commonData'
// 创建axios实例
import axios from "axios";
import { _base } from "./base";
import router from "../router/index";

/**
 * 公共使用
 * 
 */
const CommonStore = useCommonStore()


//  提示函数
//  禁止点击蒙层、显示一秒后关闭
const tip = msg => {
    ElMessage({
      message: msg,
      type: "error",
      duration: 3000
    });
  };

  
//     跳转登录页
//   携带当前页面路由，以期在登录页面完成登录后返回当前页面
 
const toLogin = () => {
    router.replace({
      path: "/login",
      query: {
        redirect: router.currentRoute.value.fullPath
      }
    });
  };

//请求失败后的错误统一处理
const errorHandle = (status, other) => {
    // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
        toLogin();
        break;
    //403 token过期
    case 403:
        tip("登录过期，请重新登录");
        setTimeout(() => {
            toLogin();
        }, 1500);
        break;
    // 404请求不存在
    case 404:
        tip("请求的资源不存在");
        break;
    case 500:
        tip("请求报错，请重试");
        break;
    default:
        console.log(other);
  }
}



// 对于请求成功，一些公共的提示
// 自己服务器的一些特定提示编码
// AUTHEN_T1001(1001, "token未传入"),
// AUTHEN_T1002(1002, "token认证失败"),
// AUTHEN_T1003(1003, "token过期失效"),
// AUTHEN_T1004(1004, "token其他异常"),
// SUCCESS(2000, "Ok"),
// FAILURE(2001, "failure"),
// UNAUTHORIZED(2002, "没有权限"),
// PARAM_ERROR(2003, "参数不正确"),
// PHONE_ERROR(2004, "手机号码错误"),
// DESENCRYPT_ERROR(2005, "解密失败"),
// ERROR_PASSWORD(2006, "密码错误,请重新输入!");

const remindMessage = data => {
    if (data.code !== 2000) {
        tip(data.msg);
        if (data.code === 1001 || data.code === 1002 || data.code === 1003 || data.code === 1004) {
            setTimeout(()=>{
                toLogin();
            },1500)
        }
    }
}


var instance = axios.create({ timeout: 30000 });
instance.defaults.baseURL = _base;
// 设置post请求头
// instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */


instance.interceptors.request.use(
    config => {
        /*  登录流程控制中，根据本地是否存在token判断用户的登录情况
            但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
            后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
            而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。 
        */

        const token = CommonStore.token;
        token && (config.headers.token = token);
        return config;
    }
)

/**
 * 响应拦截器
 * 对服务器返回的状态做处理
 * 2XX是成功
 */
instance.interceptors.response.use(
    // 请求成功
    res => {
        res.status === 200 && remindMessage(res.data);
        return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data);
    },
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            if (!window.navigator.onLine) {
              // store.commit("changeNetwork", false);
            } else {
              return Promise.reject(error);
            }
        }
    }
);
export default instance;