function observe(obj) {
  if(!obj || typeof obj !== 'object') return obj;
  return new Observer(obj)
}
class Vue {
  constructor(options) {
    this.$options = options;
    this._data = this.$options.data
    this.proxyData(this._data)
    observe(this._data)
  }

  $watch(key, cb) {
    new Watcher(this, key, cb)
  }
  // this[key] = this.data[key]
  proxyData(obj) {
    Object.keys(obj).forEach(key => {
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
}

class Observer {
  constructor(data) {
    this.walk(data)
    this.dep = new Dep() // **for child dep depend**
  }
  walk(data) {
    Object.keys(data).forEach(key => defineReactive(key, data[key]))

    function defineReactive(key, value) {
      const dep = new Dep()
      const childObj = observe(value)
      Object.defineProperty(data, key, {
        get() {
          if(Dep.target) {
            dep.depend();
            childObj instanceof Observer && childObj.dep.depend();
          }
          return value
        },
        set(newVal) {
          if(newVal === value) return
          value = observe(newVal)
          dep.notify()
        }
      })
    }
  }
}

class Dep {
  static target = null;
  constructor(keyName) {
    this.subs = []
    this.id = `${keyName}_${(Math.random()*100).toFixed(2)}`
  }
  // 为dep 添加Watcher
  depend() {
    Dep.target && Dep.target.addDep(this)
  }
  // 发布
  notify() {
    this.subs.forEach(sub => sub.run())
  }
}

class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm;
    this.depIds = new Set()
    this.cb = cb
    this.getter = this.parseGetter(exp)
    this.value = this.get()
  }

  addDep(dep) {
    if(this.depIds.has(dep.id)) return;
    dep.subs.push(this)
    this.depIds.add(dep.id)
  }
  parseGetter(exp) {
    if(/^\.\w|\w\.$/.test(exp)) return _ => _
    const keyList = exp.split('.')
    return function getter(obj, restKey = keyList) {
      return restKey.length === 0 ? obj : getter(obj[restKey[0]], restKey.slice(1))
    }
  }

  get() {
    Dep.target = this
    const value = this.getter.call(this.vm, this.vm)
    Dep.target = null;
    return value
  }

  run() {
    const oldVal = this.value
    const newVal = this.value = this.get()
    if(oldVal === newVal) return;
    this.cb.call(this, newVal, oldVal)
  }
}

const app = new Vue({
  data: {
    msg: {
      test: '111'
    }
  }
})

app.$watch('msg.test', (newVal, oldVal) => {
  console.log(newVal, oldVal)
})

app.msg.test = '222'