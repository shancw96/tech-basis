const PENDING = new Symbol()
const ONFILLED = new Symbol()
const REJECTED = new Symbol()

class Promise {
    constructor(fn) {
        this.state = PENDING
        this.value = null
        this.callbacks = [] //单个
        this.errorCallbacks = []

        setTimeout(fn.bind(this, resolve, reject), 0)


        function resolve(val) {
            if (this.state !== PENDING) return
            this.state = ONFILLED
            this.value = val
            this.callbacks.forEach(fn => fn(val))
        }

        function reject(val) {
            if (this.state !== PENDING) return//鬼灭之刃
            this.state = REJECTED
        }
    }
    then(fn) { //往上一个队列中注册回调函数
        const that = this
        return new Promise((resolve, reject) => {
            const callbackFn = val => {
                const res = fn(val)
                if (res instanceof Promise) {
                    res.then(v => resolve(v))
                } else {
                    resolve(res)
                }
            }
            if (that.state !== PENDING) {//已执行过一次resolve
                if(that.state === ONFILLED) callbackFn(that.value)
            } else {
                that.callbacks.push(callbackFn) //忘前一个中存储
            }

        })
    }

    catch (fn) {
        return this.then(val => val, fn)
    }

    resolve(val){
        return new Promise(resolve => resolve(val))
    }

    all(...promises){
        return new Promise((resolve,reject)=>{
            let count = 0
            const res = []

            const callback = (val) => {
                
                count += 1
                res.push(val)
                if(count === promises.length) resolve(res)
            }
            
            for(const promise of promises){
                promise.then(callback)
            }
        })
    }

    race(){}
}

const fn1 = new Promise((resolve, _) => setTimeout(() => resolve(3), 3000))


new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("hello world")
        }, 3000);
    }) //[() => resolve(fn1)]    
    .then(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(3)
            }, 3000);
        })
    }) //[() => resolve(fn2)]
    .then(fn2) //[() => resolve(fn2)]
    .then(fn3) //[]




    