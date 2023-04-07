const proxyMap = new WeakMap()
let activeEffect = null

export function reactive(obj) {

  if (proxyMap.has(obj)) return proxyMap.get(obj)

  const handler = {
    get: getter,
    set: setter,
  }
  const proxy = new Proxy(obj, handler)
  proxyMap.set(obj, proxy)
  return proxy
}


function getter(target, key, receiver) {
  const res = Reflect.get(target, key, receiver)
  track(target, key)
  return res
}

let targetMap = new WeakMap()
// 依赖收集
// 构建targetMap - depsMap - dep - effect 关系
function track(target, key) {
  if (!activeEffect) return;

  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map())
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, dep = new Set())
  }

  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

function setter(target, key, value, receiver) {
  Reflect.set(target, key, value, receiver)
  trigger(target, key, value)
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return;

  const dep = depsMap.get(key);

  const effects = [...dep]

  for (const effect of effects) {
    if (effect == activeEffect) return
    effect.run()
  }
}
