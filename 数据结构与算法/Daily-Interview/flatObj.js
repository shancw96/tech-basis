var entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  }
}


// function flatObj(source,parentKey="",result={}){
//   Object.keys(source).forEach(key=>{
//     let keyName = parentKey + '.' + key;
//     if(typeof source[key] === 'object'){
//       flatObj(source[key],keyName,result)
//     }else{
//       result[keyName] = source[key]
//     }
//   })
//   return result
// }

console.log(flatObj(entry))

function flatObj(source,prevName="",target){//target用来保存传递变化后特定层copyObj，prevName是入栈时候的操作
  let copyObj = target||{}
  Object.keys(source).forEach(key=>{
    let curKeyName = prevName+'.'+key
    if(typeof source[key] === 'object'){
      flatObj(source[key],curKeyName,copyObj)
    }else{
      copyObj[curKeyName] = source[key]
    }
  })
  return copyObj
}

