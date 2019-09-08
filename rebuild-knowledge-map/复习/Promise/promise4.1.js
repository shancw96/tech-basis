const isFunction = val => typeof val === 'function'

//定义三个状态
const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECT"

class MyPromise {
    constructor(handle) {
        if (!isFunction(handle)) {
            throw new Error('MyPromise must accept a function as a parameter')
        }
        // 添加状态
        this._status = PENDING
        // 添加状态
        this._value = undefined
        // 添加成功回调函数队列
        this._fulfilledQueues = []
        // 添加失败回调函数队列
        this._rejectedQueues = []
        // 执行handle
        try {
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch (err) {
            this._reject(err)
        }
    }
    //执行队列
    _resolve(val) {
        const run = () => {
            if (this._status !== PENDING) return
            // 依次执行成功队列中的函数，并清空队列
            const runFulfilled = (value) => {
                let cb;
                while (cb = this._fulfilledQueues.shift()) {
                    cb(value)
                }
            }
            // 依次执行失败队列中的函数，并清空队列
            const runRejected = (error) => {
                let cb;
                while (cb = this._rejectedQueues.shift()) {
                    cb(error)
                }
            }
            /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
              当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
            */
            if (val instanceof MyPromise) {
                val.then(value => {
                    this._value = value
                    this._status = FULFILLED
                    runFulfilled(value)
                }, err => {
                    this._value = err
                    this._status = REJECTED
                    runRejected(err)
                })
            } else {
                this._value = val
                this._status = FULFILLED
                runFulfilled(val)
            }
        }
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0)
    }
    // 添加reject时执行的函数
    _reject(err) {
        if (this._status !== PENDING) return
        // 依次执行失败队列中的函数，并清空队列
        const run = () => {
            this._status = REJECTED
            this._value = err
            let cb;
            while (cb = this._rejectedQueues.shift()) {
                cb(err)
            }
        }
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0)
    }
    then(onFulfilled, onRejected) {
        const {
            _value,
            _status
        } = this
        //如果接受的参数不是函数，那么构造一个传递函数 ，作用就是return value
        onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected == 'function' ? onRejected : reason => reason

        //返回一个promise
        let promise2 = new MyPromise((onFulfilledNext, onRejectedNext) => {
            let fulfilled = value => {
                try {
                    let res = onFulfilled(value);
                    if (res instanceof MyPromise) {
                        // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                        res.then(onFulfilledNext, onRejectedNext)
                    } else {
                        //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                        onFulfilledNext(res)
                    }

                } catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(err)
                }
            }
            let rejected = reason => {
                try {
                    let res = onRejected(reason)
                    if (res instanceof MyPromise) {
                        res.then(onFulfilledNext, onRejectedNext)
                    } else {
                        onRejectedNext(res)
                    }
                } catch (e) {
                    onRejectedNext(e)
                }

            }

            // 判断状态
            switch (_status) {
                case PENDING:
                    this._fulfilledQueues.push(fulfilled)
                    this._rejectedQueues.push(rejected)
                    break;
                case FULFILLED:
                    this.fulfilled(_value)
                    break;
                case REJECTED:
                    this.rejected(_value)
                    break;
            }
        })
        return promise2
    }

}

let testDelay = new MyPromise((resolved, rejected) => {
    setTimeout(() => {
        resolved('done') //_resolved 27行执行，改变当前状态为FULFILLED，在去执行回调队列，发现为空，结束
    }, 0)
})
let res = testDelay.then(res => console.log(res))