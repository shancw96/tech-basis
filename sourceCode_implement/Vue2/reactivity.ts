class Vue {
  $options: any
  _data: any;
  constructor(options: any) {
    this.$options = options;
    this._data = this.$options.data
    this.proxyData()
    observe(this._data)
  }
  private proxyData() {
    const proxyCore = (key: string) => {
      Object.defineProperty(this, key, {// 代理this，vue实例,将data[key]映射到实例上
        get() {
          return this._data[key]
        },
        set(newVal) {
          this._data[key] = newVal
        }
      })
    }
    Object.keys(this._data).forEach(proxyCore)
  }

  $watch(exp: string, cb: Function) {
    new Watcher(this, exp, cb)
  }
}

class Watcher {
  depsId: {[s: string]: Dep} = {}
  getters: Function
  value: any
  cb: Function
  vm: Vue
  constructor(vm: Vue, exp: string, cb: Function) {
    this.cb = cb
    this.vm = vm
    this.getters = this.createGetter(exp)
    this.value = this.get()
  }

  createGetter(exp: string) {
    if (/[^\w.$]/.test(exp)) return (_: any) => _; 

    var exps = exp.split('.');

    return function(obj: any) {
        for (var i = 0, len = exps.length; i < len; i++) {
            if (!obj) return;
            obj = obj[exps[i]];
        }
        return obj;
    }
  }

  get() {
    Dep.target = this
    const value = this.getters.call(this.vm, this.vm);
    Dep.target = null
    return value
  }

  run() {
    const oldVal = this.value
    const newVal = this.get()
    if(oldVal !== newVal) {
      this.cb(newVal, oldVal, this.vm)
    }
  }

  addDep(dep: Dep) {
    if(!this.depsId.hasOwnProperty(dep.id)) {
      this.depsId[dep.id] = dep
      dep.addSub(this)
    }
  }
}


class Observer {
  constructor(obj: any) {
    this.walk(obj)
  }
  // 为每一个key，初始化响应式
  walk(obj: any) {
    const defineReactive = (key: string, value: any) => {
      const dep = new Dep()
      Object.defineProperty(obj, key, {
        get() {
          if(Dep.target) {
            dep.depend()
          }
          return value // 不使用obj[key], 因为会重复触发get操作
        },
        set(newVal) {
          value = newVal
          observe(newVal)
          dep.notify()
        }
      })
    }
    Object.keys(obj).forEach(key => defineReactive(key, obj[key]))
  }
}

class Dep {
  static target: Watcher | null
  id: string
  subs: Array<Watcher> = []
  constructor() {
    this.id = Math.random + ''
  }
  addSub(sub: Watcher) {
    this.subs.push(sub)
  }
  depend() {
    Dep.target && Dep.target.addDep(this)
  }
  notify() {
    this.subs.forEach(sub => sub.run())
  }
}

function observe(obj: any) {
  if(!obj || typeof obj !== 'object') {
    return;
  }
  new Observer(obj)
}

const app2 = new Vue({
  data: {
    msg: 'hello'
  }
})
app2.$watch('msg', (newVal: any, oldVal: any) => {
  console.log(newVal, oldVal)
})