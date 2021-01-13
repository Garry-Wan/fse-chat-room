import axios from './axios.js'
let baseUrl = 'http://localhost:8001'
axios.defaults.baseURL = baseUrl
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default {
  urls: {
    baseApiUrl: baseUrl,
    user: {
      FindAll: '/user/login',
      LoginUser:'/user/login',
      UpdateUser: '/user/update'

    }
  },
  api: {
    get (url, data) {
      return this.ajax(url, 'get', data)
    },
    post (url, data) {
      return this.ajax(url, 'post', data)
    },
    delete (url, data) {
      return this.ajax(url, 'delete', data)
    },
    put (url, data) {
      return this.ajax(url, 'put', data)
    },
    ajax (url, method, data) {
      return new Promise((resolve, reject) => {
        axios.request({
          url: url,
          method: method,
          data: data,
          headers: {
            // 'ACCESS_TOKEN': ''
          }
        }).then(response => {
          if (response.status === 200) {
            console.log(response.data)
            var result = response.data
            if (result && result.hasOwnProperty('code')) {
              if (result.code === 0) {
                resolve(result.data)
              } else {
                reject(new Error(result.msg))
              }
            } else {
              reject(new Error('data format error.'))
            }
          } else {
            reject(new Error('request error'))
          }
        }).catch(error => {
          if (error.response) {
            reject(new Error(error.response))
          } else {
            reject(new Error(error.message))
          }
        })
      })
    }
  },
  util: {
    replacePathParam (url, data) {
      var replaceReg
      for (var key in data) {
        replaceReg = new RegExp('{' + key + '}')
        url = url.replace(replaceReg, data[key])
      }
      return url
    }
  },

}
