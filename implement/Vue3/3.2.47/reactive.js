// reactive： plain object to proxy object
// v0.1 只对普通对象进行了代理，支持 get set trap
function reactive(target) {
  if (Object.prototype.toString.call(target) !== '[object Object]') {
    throw new Error("unsupported type, only support plain object")
  }

  const handler = {
    get,
    set
  }

  return new Proxy(target, handler)
}

function get(target, key) {
  console.log("get", key)
  return Reflect.get(target, key)
}

function set(target, key ,value, receiver) {
  console.log("set", key, value)
  return Reflect.set(target, key, value, receiver)
}