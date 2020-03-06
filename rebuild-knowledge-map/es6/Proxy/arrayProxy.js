function get(target,key,receiver){
    // console.log('trap'+`${key}`)
    return Reflect.get(target,key,receiver)
}

function set(target,key,value,receiver){
    console.log(key)
    return Reflect.set(target,key,value,receiver)
}
//代理proxy 当调用内置的方法，比如push ，slice ，splice获取的key为length 
const arr = new Proxy([],{get,set})
arr.push(1,1)//->key:length
arr.splice(1)//->key:length
arr.pop()//->key
// console.log(arr)
