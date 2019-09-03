const isFunction = fun => typeof fun === 'function'
//定义状态
const PENDING = 'pending'
const FUIFILLED = 'fulfilled'
const REJECTED = 'REJECTED'

class myPromise {
  constructor(handler) {
    if (!isFunction(handler)) throw new Error('you should put function as a parameter')

    //添加状态变量，value值
    this._status = PENDING
    this._value = null;

    //执行队列
    this._fulfilledQueue = []
    this._rejectedQueue = []
    //添加执行函数
    try {//new Promise((resolved,rejected)=>{//some async code resolved()})
      //resolve 和 reject 两个参数，它们是两个函数，可以用于改变 Promise 的状态和传入 Promise 的值
      handler(this._resolve.bind(this), this._reject.bind(this))
    } catch (e) {
      this._reject(e)
    }
  }
  _resolve(value) {
    //resolve : 将Promise对象的状态从 Pending(进行中) 变为 Fulfilled(已成功)
    if (this._status !== PENDING) return
    this._status = FUIFILLED
    this._value = value
  }
  _reject(value) {
    //reject : 将Promise对象的状态从 Pending(进行中) 变为 Rejected(已失败)
    if (this._status !== PENDING) return
    this._status = REJECTED
    this._value = value
  }
  then(onFulfilled, onRejected) {//then 返回一个新的promise ，这个新的promise在创建的时候会执行handler函数，也就是传入的函数，也就是，return 的内容会被执行
    const { _value, _status } = this
    return new myPromise((onFulfilledNext, onRejectedNext) => {//下一个promise所接受的参数
      // if(!isFunction(onFulfilled)) onFulfilledNext(_value)//如果当前的then接受的parameter不是函数，那么直接执行下一个
      let fulfilled = value => {
        try {
          if(!isFunction(onFulfilled)) onFulfilledNext(value)//? 返回的时候被执行，此时onFulfilled有传入参数？
          let res = onFulfilled(value)
          res instanceof myPromise ? res.then(onFulfilled,onRejectedNext) : onFulfilledNext(res)
        } catch (e) {
          onRejectedNext(e)
        }
      }

      // 封装一个失败时执行的函数
      let rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error)
          } else {
            let res = onRejected(error);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }
      //对状态进行判断，如果被调用的xxx.then，中的xxx还没有结束，状态还是pending，那么放入执行队列中，等待执行
      switch (_status) {
        case PENDING:
          this._fulfilledQueue.push(fulfilled);
          this._rejectedQueue.push(rejected)
          break;
        case FUIFILLED:
          fulfilled(_value)
          break;
        case REJECTED:
          rejected(_value)
          break;
      }
    })
  }
}