class Vue {
  constructor($options) {
    this.$options = $options;
    this._data = this.$options.data;
    this.computed = $options.computed
    if($options.computed) {
      this.computed = this.$options.computed
      this.initComputed()
    }
    this.proxyData(this._data)
    observe(this._data)
  }
  proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return this._data[key]
        },
        set(newVal) {
          this._data[key] = newVal
        }
      })
    })
  }

  initComputed() {
    const watchers = this._computedWatchers =  Object.create(null)
    for(const key in this.computed) {
      const getter = typeof this.computed[key] === 'function' ? this.computed[key] : this.computed.get
      watchers[key] = new Watcher(this, getter, )
    }
  }

  $watch(exp, cb) {
    new Watcher(this, exp, cb)
  }
}

class Observer {
  constructor(data) {
    this.walk(data)
  }

  walk(data) {
    const defineReactive = (key, value) => {
      const keyBasedDep = new Dep();
      const childObj = observe(value)
      Object.defineProperty(data, key, {
        get() {
          // 执行依赖收集，只有在初次执行watch才会执行
          if(Dep.target) {
            keyBasedDep.depend();
            childObj instanceof Observer && childObj.dep.depend()
          }
          return value
        },
        set(newVal) {
          if(newVal === value) return;
          value = observe(newVal)
          keyBasedDep.notify(value)
        }
      })
    }
    Object.keys(data).forEach((key) => defineReactive(key, data[key]))
  }
}

class Dep {
  static target = null
  constructor() {
    this.id = 'Dep_' + Math.random() 
    this.subs = []
  }

  depend() {
    Dep.target && Dep.target.addDep(this)
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach(sub => sub.run())
  }
}

class Watcher {
  constructor(vm, exp, cb) {
    this.getter = typeof exp === 'function' ? exp : this.parseGetter(exp) // computed 属性用到：exp === function 
    this.vm = vm
    this.depsId = new Set()
    this.cb = cb
  }

  addDep(dep) {
    if(this.depsId.has(dep.id)) return;
    this.depsId.add(dep.id)
    dep.addSub(this)
  }

  run() {
    const newVal = this.get()
    if(newVal === oldVal) return;
    this.cb.call(this.vm, newVal, oldVal)
  }

  parseGetter(exp) {
    if(/^\.\w|\w\.$/.test(exp)) return;
    const keyList = exp.split('.')
    return function parseCore(data, keyList = keyList) {
      return !keyList.length ? data : parseCore(data[keyList[0]], keyList.slice(1))
    }
  }

  get() {
    Dep.target = this
    const value = this.getter.call(this.vm, this.vm)
    Dep.target = null
    return value
  }
}
function observe(data) {
  return !data || typeof data !== 'object' ? data : new Observer(data)
}