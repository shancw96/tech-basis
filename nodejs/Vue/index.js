const get = (target, key, receiver) => {

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

    if (oldVal !== value) {
        triggle(target, key, 'SET')
    }
    return res
}
const baseHandler = {
    get,
    set
}


let activeEffect = undefined; //正在执行的effect
let targetMap = new Map() //使用object 作为对象 而不是string

function effect(fn) {
    const effect = createReactiveEffect(fn) //设置activeEffect
    effect()
    return effect
}

function createReactiveEffect(fn) {
    const effect = function reactiveEffect() {
        try {
            activeEffect = effect
            fn()
        } finally {
            activeEffect = undefined
        }
    }
    effect.raw = fn
    effect.deps = []
    return effect
}


/**
 * 在effect初始化的时候,设置依赖项
 * @param {Object} target 依赖收集对象
 * @param {any} key 
 * @param {String} type GET/SET
 */
const track = (target, key, type) => {
    if (!activeEffect) return

    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, depsMap = new Map())
    }

    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, dep = new Set())
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect)
    }

}

const triggle = (target, key, type) => {
    console.log(key)
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        return //这个target 不是响应式的
    }
    let dep = depsMap.get(key)
    dep.forEach(effect => effect())
}

const reactive = target => {
    if (!isObject(target)) throw new Error('invaild type')
    const proxy_target = new Proxy(target, baseHandler)
    return proxy_target
}
const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'



const state = reactive({
    test: [1, 2, 3]
})
effect(() => {
    let dummy = state.test
    console.log(dummy)
})

// state.newKey = 1
state.test.push(1)
// console.log(state.test)