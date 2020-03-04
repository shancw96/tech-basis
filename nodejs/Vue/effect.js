let activeEffect = undefined; //正在执行的effect
let targetMap = new Map() //使用object 作为对象 而不是string

const effect = function reactiveEffect(fn) {
    return run(fn)
}

function run(fn) {
    try {
        activeEffect = effect
        fn()
    } finally {
        activeEffect = undefined
    }
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
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        return //这个target 不是响应式的
    }
    let dep = depsMap.get(key)
    dep.forEach(effect => effect())
}


module.exports = {
    track,
    triggle,
    effect
}