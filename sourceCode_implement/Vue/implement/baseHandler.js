const {
    track,
    triggle
} = require('../../../nodejs/Vue/effect').default

const {
    reactive,
    isObject
} = require('./reactive')


const get = (target, key, receiver) => {

    console.log(reactive)
    //通过reflect 解决this 不明确的问题
    const value = Reflect.get(target, key, receiver)
    //只在effect 初始化的时候执行
    track(target, key, 'GET')
    //由于 proxy只能代理一层，所以通过懒加载的方式来代理嵌套的对象
    return isObject(value) ? reactive(value) : value

}

const set = (target, key, value, receiver) => {
    const oldVal = target[key]
    const res = Reflect.set(target, key, value, receiver)

    if (oldVal !== newVal) {
        triggle(target, key, 'SET')
    }
    return res

}

module.exports = {
    get,
    set
}