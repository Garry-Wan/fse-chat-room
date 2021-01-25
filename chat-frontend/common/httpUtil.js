
axios.defaults.timeout = 20000

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

function replaceUrlParams (url, pathParams) {
  if (pathParams) {
    Object.keys(pathParams).forEach(key => {
      url = url.replace(new RegExp(`{{${key}}}`, 'g'), pathParams[key])
    })
  }
  return url
}

/**
 * get method
 * @param {String} url
 * @param {Object} params
 */
function get (url, params, pathParams) {
  return new Promise((resolve, reject) => {
    axios.get(replaceUrlParams(url, pathParams), {
      params: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * post method
 * @param {String} url
 * @param {Object} params
 */
function post (url, params, pathParams) {
  return new Promise((resolve, reject) => {
    axios.post(replaceUrlParams(url, pathParams), params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

function upload (url, params, pathParams, config) {
  return new Promise((resolve, reject) => {
    axios.post(replaceUrlParams(url, pathParams), params, config).then(res => {
      resolve(res.data)
    })
      .catch(err => {
        reject(err.data)
      })
  })
}

function put (url, params, pathParams) {
  return new Promise((resolve, reject) => {
    axios.put(replaceUrlParams(url, pathParams), params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

//websocket setting
function initWebsocket(url) {
  return io(url);
}
function websocketDisconnect(websocket) {
  websocket.on('disconnect')
}
function websocketBind(websocket,event,callback) {
  websocket.on(event,callback)
}

function websocketEmit(websocket,event,data) {
  websocket.emit(event,data)
}