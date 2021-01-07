import Vue from './vueUtil'

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
function getSubscribe(id,callback) {
    Vue.prototype.$http({
        aurl: 'subscribe',
        params:{
            id:id
        },
        success: res => {
            if (res.data.code === 0) {
                let params = {
                    temids:[],
                    setids:[]
                }
                if(res.data.result.template_id){
                    params.temids = [res.data.result.template_id]
                    params.setids = [res.data.result.id]
                }
                callback && callback(params)
            }
        },
        fail: err => {
            console.log(err);
        }
    });
}
function showTuisong(temids,setids,content,callback){
    if(temids.length===0){
        return
    }
    uni.getSetting({
        withSubscriptions:true,
        success(res) {
            if(res.subscriptionsSetting&&res.subscriptionsSetting.itemSettings){
                const setItems = res.subscriptionsSetting.itemSettings
                for(let i = 0;i<temids.length;i++){
                    const key = temids[i]
                    if(setItems[key]== 'reject'){
                        uni.showModal({
                            title:'温馨提示',
                            content:content,
                            success(res){
                                if(res.confirm){
                                    uni.openSetting({
                                        success(res) {
                                        }
                                    });
                                }
                                callback && callback()
                            }
                        })
                        return
                    }
                }
            }
            uni.requestSubscribeMessage({
                tmplIds:temids,
                success (res) {
                    const arr = []
                    for(let i = 0;i<temids.length;i++){
                        const key = temids[i]
                        if(res[key]== 'accept'){
                            arr.push(setids[i])
                        }
                    }
                    if(arr.length>0){
                        setTem(arr)
                    }
                    callback && callback()
                },
                fail(error){
                    console.log(error)
                }
            })
        }
    })
}

export {
    creatPathStr,
    getParams,
    getSubscribe,
    showTuisong,
}
