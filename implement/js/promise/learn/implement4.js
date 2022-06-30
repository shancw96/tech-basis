const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

const {isFunction} = require('./utils')
const isPromise = myPromise=> myPromise instanceof MyPromise
class MyPromise {
    constructor(handler){
        if(!isFunction(handler)) throw new Error('Mypromise 必须接受函数作为参数')
        this._status = PENDING
        this._value = null
        this._fulfilledStack = []
        this._rejectedStack = []
        try{
            handler(this._resolve.bind(this),this._reject.bind(this))
        }catch(e){
            this.reject(e)
        }
    }
    //resolve 表示异步处理成功 接下来执行then中的resolve内容，resolve函数中的内容保存在fulfilledStack 中
    //1.将status 变为 RESOLVED
    //2.更新value
    //3.执行stack中的等待的回调函数
    //4.通过setTimeout模拟microtask  执行完构造函数中的同步代码，才轮到event loop去检测microtask 
    //5.TODO 处理初次构造的时候value 为 promise 的情况 resolve(new MyPromise(...))
    _resolve(value){
        if(this._status !== PENDING){
            // console.warn('promise instance shouldnot be modify twice')
            return 
        }
        const fulfilled = value=>{
            this._status = RESOLVED
            this._value = value
            this._fulfilledStack.forEach(fn=>fn(value))
            this._fulfilledStack = []
        }
        const rejected = err=>{
            this._status = REJECTED
            this._value = err
            this._rejectedStack.forEach(fn=>fn(value))
            this._rejectedStack = []
        }
        const run = ()=>{
            if(isPromise(value)){
                value.then(fulfilled,rejected)
            }else{
                fulfilled(value)
            }
        }
        setTimeout(run,0)
        
    }
    //表示异步处理失败 接下来执行then中的reject内容，reject中的内容保存在_rejectedStack 中
    _reject(err){
        if(this._status !== PENDING){
            // console.warn('promise instance shouldnot be modify twice')
            return 
        }
        const run = err=>{
            this._status = REJECTED
            this._value = err
            this._rejectedStack.forEach(fn=>fn(value))
            this._rejectedStack = []
        }
        setTimeout(()=>run(err),0)
    }
    //将接收的函数 关联新的promise中的接收函数后，推入到前面的promise的fullstack OR rejectedStack中
    //返回一个新的promise ，在他的构造函数中，将接收的函数传入到之前的promise 的执行队列中

    //then 执行的过程：
    //1.then创建后，立即执行新promise中的handler  从而判断当前promise的status状态，如果是pending，就将then的resolve 和 reject 加入当前promise的等待栈中
    //2.异步执行成功/失败 后，触发resolve/reject 从而执行栈中的函数列表
    then(resolve,reject){
        //在这里保存下上一个promise 
        const curPormise = this
        return new Promise((resolveNext,rejectNext)=>{
            //如果curPromise 的异步函数正确执行
            const fulfilled = (value)=>{
                //根据队列传入的值，来执行then传入的resolve 函数
                //1. 假如传入then中的resolve函数是一个promise 那么需要等待它执行结束后才能接着执行
                //2. 假如传入的resolve函数是一个非promise 函数，那么不需要等待

                //then中 返回的 值 需要实现链式调用传递给下一个reoslve
                const res = resolve(value)
                //如果当前结果是promise 则把新的promise 向后排队
                if(isPromise(res)){
                    res.then(resolveNext,rejectNext)
                }else{
                    resolveNext(res)
                }
            }
            //如果curPromise 的异步函数错误执行
            const rejected = (err)=>{
                const e = reject(err)
                if(isPromise(e)){
                    res.then(resolveNext,rejectNext)
                }else{
                    rejectNext(res)
                }
            }
            //handler执行
            //这里的this 为新的Promise
            switch(curPormise._status){
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
}

const promise1 = new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('hey im promise1 resolved')
    },10)
})

promise1.then(res=>{
    console.log('first then called !')
    console.log(res)
    return 'return by then '
}).then(res=>{
    console.log(`then chain received msg:${res}`)
})
promise1.then(res=>{
    console.log('im should be another function at promise1 fullfilled stack')
    console.log(`receive msg : ${res}`)
})

setTimeout(()=>{
    promise1.then(res=>{
        console.log('error example should not be called')
    })
},100)