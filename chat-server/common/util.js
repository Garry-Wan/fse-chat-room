const util = {}
util.success = (data) => {
    return {
        code: 0,
        message: 'success',
        data: data
    }
}

util.failMessage = (message) => {
    return {
        code: -1,
        message: message
    }
}
util.failCodeMessage = (code, message) => {
    return {
        code: code,
        message: message
    }
}
module.exports = util