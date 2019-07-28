
 function removeSame(arr){
   let hash = {}
   //对象排序

   return [... new Set(arr)].filter(item=>{
     if(Object.prototype.toString.call(item) == '[object Object]'){
      item = sortByKey(item)
     }
     let key = JSON.stringify(item)
     if(hash[key]){
       return false
     }else{
       hash[key] = item
       return true
     }
   })
 }

 function sortByKey(obj){
  if(typeof obj !== 'object'){
    return obj
  }
  let cloneObj = obj instanceof Array ? []:{}
  //进行一次排序，改变obj的当层顺序
  obj = Object.keys(obj).sort().reduce((prev,curKey)=>{
    prev[curKey] = obj[curKey];
    return prev
  },{})

  //进入下一层遍历
  Object.keys(obj).forEach(key=>{
      cloneObj[key] = sortByKey(obj[key])
  })
  return cloneObj
}
