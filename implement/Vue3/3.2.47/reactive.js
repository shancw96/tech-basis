// reactive： plain object to proxy object
// v0.1 只对普通对象进行了代理，支持 get set trap

const proxyMap = new WeakMap()
function reactive(target) {
  if (Object.prototype.toString.call(target) !== '[object Object]') {
    throw new Error("unsupported type, only support plain object")
  }

  if (proxyMap.has(target)) {
    return proxyMap.get(target)
  }

  const handler = {
    get,
    set
  }

  const proxyObj = new Proxy(target, handler)

  proxyMap.set(target, proxyObj)

  return proxyObj
}

// 1. get value
// 2. set targetMap deps effect relation
function get(target, key) {
  const res = Reflect.get(target, key)
  return res
}

function set(target, key ,value, receiver) {
  Reflect.set(target, key, value, receiver)
}