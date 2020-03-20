import axios from "axios";
import config from "./config"
import {loading,success,fail} from "@/util/toast"


const contact = axios.create({
    baseURL:config.baseURL||"",
    timeout:config.timeout||10000
})


contact.interceptors.request.use(function (axiosConfig) {
    config.cancelToast ? "" :loading();
    config.hooks && config.hooks.beforeReq && config.hooks.beforeReq();
    return axiosConfig;
});

contact.interceptors.response.use(function (response) {
    config.cancelToast ? "" :success();
    config.hooks && config.hooks.AfterReq && config.hooks.AfterReq();
    return response.data;
}, function (error) {
    config.cancelToast ? "" :fail();
    config.hooks && config.hooks.AfterReq && config.hooks.AfterReq();
    return Promise.reject(error);
});


export default contact