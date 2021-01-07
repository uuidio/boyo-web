function creatPathStr(arr, delimit = "/") {
    return arr.join(delimit);
}

function getParams(obj){
    if(typeof(obj)!=='object'){
        return ''
    }
    let params = ''
    for(let key in obj) {
        params += key +'='+obj[key]+'&'
    }
    params = params.slice(0,params.length-1)
    return params
}

export {
    creatPathStr,
    getParams
}
