const baseHandler = require('./baseHandler')
const reactive = target => {
    if (!isObject(target)) throw new Error('invaild type')
    const proxy_target = new Proxy(target, baseHandler)
    return proxy_target
}
const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

module.exports = {
    reactive,
    isObject
}