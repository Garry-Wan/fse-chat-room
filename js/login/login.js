import webUtils from "../../common/webUtils.js";
import message from "../../common/message.js";
let uEmail = $(".inputEmail").val();
let uPassword = $(".inputPassword").val();
let user = {email:uEmail, password:uPassword};
export default {
    loginUser ( user) {
        console.log(webUtils.urls)
        console.log(user)
        webUtils.api.post(webUtils.util.replacePathParam(webUtils.urls.user.LoginUser, user), user)
            .then(data => {
                if (data) {
                    message.showMessage("login success")
                }
            })
            .catch(error => {
          message.showMessage("login error")
            })
    },
}
