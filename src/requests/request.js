/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */

// 创建axios实例
import axios from "axios";
import { _base } from "./base";
var instance = axios.create({ timeout: 30000 });
instance.defaults.baseURL = _base;
// 设置post请求头
instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";