import Mock from "mockjs";
import data from "./data";

//拦截ajax请求
正常接口返回的数据:
/*{
    errno:0,
    data:{}
}*/

Mock.mock("/api/seller",{errno:0,data:data.seller});
Mock.mock("/api/goods",{errno:0,data:data.goods});
Mock.mock("/api/ratings",{errno:0,data:data.ratings});