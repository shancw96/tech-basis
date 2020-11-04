let targetMap = new WeakMap()
function reactive(target) {
  // 1. 判断是否为对象，proxy 只能代理对象
  if(!isObject(target)) return target
  const proxy = new Proxy(target, {
    get,
    set
  })
  return proxy
}

function get(target, key, receiver) {
  const res = Reflect.get(target, key, receiver)
  // 依赖收集
  track(target, key)
  // proxy 只代理了当前层的key，如果key 对应的value 是嵌套的，那么需要进行对应的依赖收集
  if(isObject(res)) {
    reactive(res)
  }
  return res
}

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver)
  trigger(target, key)
  return result
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

function track(object, key) {
  // 如果没有d副作用函数，则不进行依赖收集
  if (!activeEffect) {
    return
  }
  // 有副作用函数需要将副作用函数和当前对象的具体key相互关联
  // 1.按照对象初始化分组
  let depsMap = targetMap.get(object)
  if(!depsMap) {
    targetMap.set(object, depsMap = new Map())
  }
  let dep = depsMap.get(key)
  if(!dep) {
    depsMap.set(key, dep = new Set())
  }
  //2. key <-> Array<Effect>
  if(!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if(!depsMap.get(key)) {
    // 从没有被track
    return
  }
  const effects = new Set()
  // 将所有的非 activeEffect 加入到等待执行队列中
  const add = effectsToAdd => {
    if(!effectsToAdd) return
    effectsToAdd.forEach(effect => {
      if(effect !== activeEffect) {// ? 为什么不能是activeEffect
        effects.add(effect)
      }
    })
  }

  // 将depsMap中 key 对应的effect 复制一份，放到等待执行队列中
  if(key !== void 0) {
    add(depsMap.get(key))
  }
  //执行队列
  effects.forEach(effect => effect())
}

function effect(fn) {
  const effect = createReactiveEffect(fn)
  effect()
  return effect
  function createReactiveEffect(fn) {
    const effect = function reactiveEffect() {
      try {
        activeEffect = effect
        return fn()
      }finally {
        activeEffect = undefined
      }
    }
    effect.deps = []
    return effect
  }
}

// -------test--------
const data = {
  msg: 'hey there',
  count: 1
}
const proxyData = reactive(data)
effect(() => {
  console.log('effect(msg)', proxyData.msg)
})
proxyData.msg = 'hey there! i\'m here'
proxyData.count = 2//

effect(() => console.log('effect 2(count):', proxyData.count))
proxyData.count = 'should work'