
var entry = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}

// 要求转换成如下对象
// var output = {
//   a: {
//    b: {
//      c: {
//        dd: 'abcdd'
//      }
//    },
//    d: {
//      xx: 'adxx'
//    },
//    e: 'ae'
//   }
// }

function deFlatObj(source){
  let deepObj = {}
  for(let keys in source){
    let key_arr = keys.split('.')
    let value = source[keys]
    deepObj = format(deepObj,key_arr,value)//deepObj再次赋值给format 的 source
  }
  return deepObj
}

function format(source,key_arr,value){
  let key = key_arr.shift()
  if(key_arr.length){//keys 还没有到最深处
    source[key] = source[key] || {}
    format(source[key],key_arr,value)
  }else{//keys 到最深处
    source[key] = value
  }
  return source
}

deFlatObj(entry)
