const PENDING = "pending"
const RESOLVED = "resolved"
const REJECTED = "rejected"


class myPromise {
    constructor(handle) {//接受的是一个处理函数
        if (handle instanceof Function) {
            throw new Error('params should be function')
        }

        this._status = PENDING
        this._value = null
        this._fullfilledQueue = []
        this._rejectedQueue = []

        try {
            handle(this._resolved, this._rejected)
        } catch (e) {
            this.rejected(e)
        }
    }

    _resolved(val) {//onfulfilled  / onfulfilledNext
        if (this._status !== PENDING) return //只有当前状态为resolved才会执行
        const runFulfilled = value => {//执行队列
            let cb
            while (cb = this._fullfilledQueue.shift()) {
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
        //
    }
    _rejected() {

    }

    then(onFulfilled, onRejected) {
        //获取当前的状态和值
        const { _status, _value } = this
        //不管参数是什么都必须包装成函数，否则报错
        onFulfilled = onFulfilled instanceof Function ? onFulfilled : value => value
        onRejected = onRejected instanceof Function ? onRejected : value => value

        return new myPromise((onFulfilledNext, onRejectedNext) => {//接受一个handler函数，handler函数接受两个fun参数
            let fulfilled = _value => {
                //添加错误捕获
                try {
                    const res = onFulfilled(_value)
                    //根据res的结果来决定立即执行下一个promise的函数，还是延迟执行
                    if (res instanceof myPromise) {
                        res.then(onFulfilledNext, onRejectedNext) //如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
                    } else {
                        onFulfilledNext(res) //否则，以它的返回值做为promise2的结果
                    }
                } catch (e) {//上面的代码块错误的话，则执行onRejectedNext
                    onRejectedNext(e)
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


            //then 需要能够判断当前的promise结果的状态来决定是否等待执行，也就是将上面的代码打包放在队列中
            switch (_status) {
                case PENDING:
                    this._fulfilledQueues.push(fulfilled)
                    this._rejectedQueue.push(rejected)
                    break;
                case RESOLVED:
                    fulfilled(_value)
                    break;
                case REJECTED:
                    rejected(_value)
                    break;
            }
        })
    }


}

let testDelay = new MyPromise((resolved, rejected) => {
    setTimeout(() => {
        resolved('done') //_resolved 27行执行，改变当前状态为FULFILLED，在去执行回调队列，发现为空，结束
    }, 0)
})
let res = testDelay.then(res => console.log(res))