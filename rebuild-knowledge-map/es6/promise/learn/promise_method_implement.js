const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

const {
    isFunction,
    isArray
} = require('./utils')
const isPromise = myPromise => myPromise instanceof MyPromise

class MyPromise {
    constructor(handler) {
        if (!isFunction(handler)) throw new Error('Mypromise 必须接受函数作为参数')
        this._status = PENDING
        this._value = null
        this._fulfilledStack = []
        this._rejectedStack = []
        try {
            handler(this._resolve.bind(this), this._reject.bind(this))
        } catch (e) {
            this.reject(e)
        }
    }
    //resolve 表示异步处理成功 接下来执行then中的resolve内容，resolve函数中的内容保存在fulfilledStack 中
    //1.将status 变为 RESOLVED
    //2.更新value
    //3.执行stack中的等待的回调函数
    //4.通过setTimeout模拟microtask  执行完构造函数中的同步代码，才轮到event loop去检测microtask 
    //5.TODO 处理初次构造的时候value 为 promise 的情况 resolve(new MyPromise(...))
    _resolve(value) {
        if (this._status !== PENDING) {
            // console.warn('promise instance shouldnot be modify twice')
            return
        }
        const fulfilled = value => {
            this._status = RESOLVED
            this._value = value
            this._fulfilledStack.forEach(fn => fn(value))
            this._fulfilledStack = []
        }
        const rejected = err => {
            this._status = REJECTED
            this._value = err
            this._rejectedStack.forEach(fn => fn(value))
            this._rejectedStack = []
        }
        const run = () => {
            if (isPromise(value)) {
                value.then(fulfilled, rejected)
            } else {
                fulfilled(value)
            }
        }
        setTimeout(run, 0)

    }
    //表示异步处理失败 接下来执行then中的reject内容，reject中的内容保存在_rejectedStack 中
    _reject(err) {
        if (this._status !== PENDING) {
            return
        }
        const run = err => {
            this._status = REJECTED
            this._value = err
            this._rejectedStack.forEach(fn => fn(value))
            this._rejectedStack = []
        }
        setTimeout(() => run(err), 0)
    }
        //将接收的函数 关联新的promise中的接收函数后，推入到前面的promise的fullstack OR rejectedStack中
    //返回一个新的promise ，在他的构造函数中，将接收的函数传入到之前的promise 的执行队列中
    //then 执行的过程：
    //1.then创建后，立即执行新promise中的handler  从而判断当前promise的status状态，如果是pending，就将then的resolve 和 reject 加入当前promise的等待栈中
    //2.异步执行成功/失败 后，触发resolve/reject 从而执行栈中的函数列表
    then(resolve, reject) {
        //在这里保存下上一个promise 
        const curPormise = this
        return new Promise((resolveNext, rejectNext) => {
            //如果curPromise 的异步函数正确执行
            const fulfilled = (value) => {
                //根据队列传入的值，来执行then传入的resolve 函数
                //1. 假如传入then中的resolve函数是一个promise 那么需要等待它执行结束后才能接着执行
                //2. 假如传入的resolve函数是一个非promise 函数，那么不需要等待

                //then中 返回的 值 需要实现链式调用传递给下一个reoslve
                const res = resolve(value)
                //如果当前结果是promise 则把新的promise 向后排队
                if (isPromise(res)) {
                    res.then(resolveNext, rejectNext)
                } else {
                    resolveNext(res)
                }
            }
            //如果curPromise 的异步函数错误执行
            const rejected = (err) => {
                const e = reject(err)
                if (isPromise(e)) {
                    res.then(resolveNext, rejectNext)
                } else {
                    rejectNext(res)
                }
            }
            //handler执行
            //这里的this 为新的Promise
            switch (curPormise._status) {
                case PENDING:
                    curPormise._fulfilledStack.push(fulfilled)
                    curPormise._rejectedStack.push(rejected)
                    break;
                case RESOLVED:
                    curPormise._fulfilledStack.push(fulfilled)
                    break;
                case REJECTED:
                    curPormise._rejectedStack.push(rejected)
                default:
                    console.warn('你是怎么到这里的 -_-!!!')
            }
        })
    }
    catch(reject){
        return this.then(undefined,reject)
    }
    //receive function as parameter
    //returns a Promise.
    //run when status is not PENDING 
    
    finally(handler){
        this.then(
            resolve=>MyPromise.resolve(handler()).then(()=>resolve),
            reject=>MyPromise.reject(handler()).then(()=>{
                throw reject
            })
        )
    }
    // returns a Promise object that is rejected with a given reason.
    static reject(err){
        return isPromise(err) ? err : new MyPromise((resolve,reject)=>reject(err))
    }
    //调用promise.resolve 方法 返回一个promise
    static resolve(value) {
        return isPromise(value) ? promise : new Promise((resolve,reject) => resolve(value))
    }
    //这个方法返回一个新的promise对象，该promise对象在iterable参数对象里
    //1.所有的promise对象都成功的时候才会触发成功
    //2.一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败
    static all(promiseArr) {
        if (!isArray(promiseArr)) throw new Error('MyPromise.all expect Array as parameter')
        return new Promise((resolve, reject) => {
            let resultArr = []
            let count = 0
            for (let i = 0; i < promiseArr.length; i++) {
                
                if (!isPromise(promiseArr[i])) {
                    count += 1
                    resultArr[i] = promiseArr[i]
                } else {
                    promiseArr[i].then(res => {
                        count+=1
                        resultArr[i] = res
                        if (count === promiseArr.length) resolve(resultArr)
                    }, err => reject(err))
                }
            }
        })
    }
    //race 返回第一个出结果的数据，无论是正确还是错误
    static race(promiseArr){
        return new MyPromise((resolve,reject)=>{
            for(let i=0;i<promiseArr.length;i++){
                if(isPromise (promiseArr[i])){
                    promiseArr[i].then(res=>resolve(res),err=>reject(err))
                }
            }
        })

    }

}

const promise1 = new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('promise1')
    },200)
})

const promise2 = new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
        reject('promise2')
    },100)
})
const promise3 = new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('promise3')
    },300)
})

// Promise.race([Promise.resolve(123),Promise.reject(1)]).then(res=>{
//     console.log(res)
// })


