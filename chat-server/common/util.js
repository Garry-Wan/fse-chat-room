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
// according to element to find object
util.findElem = (arrayToSearch,attr,val) =>{
    for (var i=0;i<arrayToSearch.length;i++){
        if(arrayToSearch[i][attr]==val){
            return i;
        }
    }
    return -1;
}

module.exports = util