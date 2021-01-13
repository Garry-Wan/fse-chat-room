// require("../common/axios.js");
let baseUrl = 'http://localhost:8001'
const config ={
    FindAll: baseUrl + '/user/login',
    LoginUser:baseUrl + '/user/login',
    UpdateUser: baseUrl + '/user/update'
}
// function post(url, data){
//     axios.request({
//         url: url,
//         method: "post",
//         data: data,
//         // headers: {
//         //     // 'ACCESS_TOKEN': ''
//         // }
//     })
// }