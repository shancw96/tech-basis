let _jsonp = (domain,data,cb)=>{
    //domain?xxx=xxx&
    let dataString =  Object.keys(data).reduce((prev,key)=>prev = `${prev}&${key}=${data[key]}&`,domian.indexOf('?') == -1 ? '?' : '&')
    let cbFn = 'jsonp_callback' + Math.random().toString().replace('.','')
    dataString += 'callback='+cbFn
    let script = document.createElement('script')
    script['scr'] = domain + dataString
    document.body.appendChild(script)
    window[cbFn] = data=>{
        cb(data)
        document.body.remove(script)
    }
}