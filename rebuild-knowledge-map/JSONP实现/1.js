let _jsonp = function(url,data,callback){
  // 1.将传入的data数据转化为url字符串形式
  // let dataString = url.indexof('?') == -1 ? '?' : '&' //判断是否已经有query
  
  let dataString = Object.keys(data).reduce((prev,key)=>prev+=`${key}=${data[key]}&`,url.indexOf('?') == -1 ? '?' : '&')
  // 2 处理url中的回调函数
  let cbFn = 'my_jsonp' + Math.random().toString().replace('.','');
  dataString += 'callback' + cbFn
  // 3.创建一个script标签并插入到页面中
  let scriptElm = document.createElement('script')
  console.log(url+dataString)
  scriptElm.src = url+dataString
  // 4.挂载回调函数
  window[cbFn] = function(data){
    callback(data)
    document.body.removeChild(scriptElm)
  }
  //添加script标签
  document.body.appendChild(scriptElm)
}

_jsonp(
  'www.bilibili.com',
  {
    name:'shanCW',
    job:'FE'
  },
  res=>console.log(`receivd data from server:${res}`)
)