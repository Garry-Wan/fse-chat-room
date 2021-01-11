import webUtils from '../../common/webUtils'
export default {
  showMessage (context, message) {
    alert(message)
  },
  getUser ({commit}) {
    webUtils.api.get(webUtils.urls.user.FindAll, {})
        .then(data => {
          if (data) {
            commit('RemoveAllWarehouse')
            for (var key in data) {
              commit('AddWarehouse', data[key])
            }
          }
        })
        .catch(error => {
          this._actions.showMessage[0](error)
        })
  },
  LoginUser ({commit}, user) {
    console.log(webUtils.urls)
    console.log(user)
    webUtils.api.post(webUtils.util.replacePathParam(webUtils.urls.user.LoginUser, user), user)
      .then(data => {
        if (data) {
          this._actions.showMessage[0]('success.')
        }
      })
      .catch(error => {
        this._actions.showMessage[0](error)
      })
  },
}
