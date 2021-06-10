
function observe(data) {
  return !data || typeof data !== 'object' ? data : new Observer(data)
}
class Vue {
  constructor($options) {
    this.$options = $options;
    this._data = this.$options.data
    this.proxyData(this._data)
    observe(data)
  }
  // this[key] = this.data[key]
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

  $watch(exp, cb) {
    new Watcher(this, exp, cb)
  }
}
// 为每一个key生成一个Dep,进行发布订阅
class Observer {
  constructor(data) {
    this.dep = new Dep()
    this.walk(data)
  }

  walk(data) {
    const defineReactive = (key, defaultValue) => {
      const childObj = observe(defaultValue)
      Object.defineProperty(data, key, {
        get() {
          if(Dep.target) {
            dep.depend()
            childObj instanceof Observer && childObj.dep.depend()
          }
          return defaultValue
        },
        set(newVal) {
          if(newVal === defaultValue) return;
          defaultValue = observe(newVal)
          dep.notify()
        }
      })
    }
    Object.keys(data).forEach(key => defineReactive(key, data[key]))
  }
}

class Dep {
  static target = null;

  constructor() {
    this.id = String(Math.random());
    this.subs = []
  }
  // Dep 添加 Watcher, Watcher 添加Dep
  depend() {
    Dep.target.addDep(this)
  }
  notify() {
    this.subs.forEach(sub => sub.run())
  }

  addSub(sub) {
    this.subs.push(sub)
  }
}

class Watcher {
  constructor(vm, exp, cb) {
    this.depsMap = new Map()
    this.vm = vm
    this.getters = this.parseGetter(exp)
    this.cb = cb;
    this.value = this.get()
  }
  addDep(dep) {
    if(!this.depsMap.has(dep.id)) {
      dep.addSub(this);
      this.depsMap.set(dep.id, dep)
    }
  }
  removeDep(dep) {
    this.depsMap.delete(dep.id)
  }
  get() {
    Dep.target = this;
    const value = this.getters.call(this.vm, this.vm)
    Dep.target = null
    return value
  }
  parseGetter(exp) {
    if(!isValid(exp)) throw new Error('invalid key for Watcher')
    const keys = exp.split('.')
    return function parseCore(obj, keysArr = keys) {
      return obj && keysArr.length ? obj[keysArr[0]] : parseCore(obj, keysArr.slice(1))
    }

    function isValid(exp) {
      return /^\.\w|\w\.$/.test(exp)
    }
  }

  run() {
    const oldValue = this.value
    const newValue = this.get()
    if(oldValue !== newValue) {
      this.cb(newValue, oldValue)
    }
  }
}
