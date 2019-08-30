class MyPromise {
  constructor(handle) {
    //添加状态
    this._status = PENDING
    this._value = undefined
    //回调函数执行队列
    this._fulfilledQueues = []
    this._rejectedQueues = []
    //执行handle
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (e) {
      this._reject(e)
    }
  }
  /**处理函数，更改状态，接受值
   * [TODO:这里对val的传递不理解]
    */
  _resolve(val) {
    if (this._status !== PENDING) return
      this._status = FULFILLED
      this._value = val
      let cb;
      while (cb = this._fulfilledQueues.shift()) {
        cb(val)
      }
    /**
     *   // 为了支持同步的Promise，这里采用异步调用
          setTimeout(() => run(), 0)
     */
    this._status = FULFILLED
    this._value = val
  }
  _reject (err) { 
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

  //then方法,能够接受两个参数，一个成功回调函数，一个失败回调函数
  then(onfulfilled, onrejected) {
    //如果 onFulfilled 或 onRejected 不是函数，其必须被忽略
    const { _value, _status } = this;//?为什么这么写

    //then 方法返回的是新的promise对象,
    return new MyPromise((onfulfilledNext, onrejectedNext) => {
      //返回的新的Promise对象的状态，依赖于当前then方法，回调函数执行的情况，以及返回值
      //例如 then 的参数是否为一个函数、回调函数执行是否出错、返回值是否为 Promise 对象。
      //1. 若 x 不为 Promise ，则使 x 直接作为新返回的 Promise 对象的值， 即新的onFulfilled 或者 onRejected 函数的参数.
      //2. 若 x 为 Promise ，这时后一个回调函数，就会等待该 Promise 对象(即 x )的状态发生变化，才会被调用，并且新的 Promise 状态和 x 的状态相同。
      let fulfilled = value => {
        try {
          if (!isFunction(onfulfilled)) {//如果then输入的不是函数
            onfulfilledNext(value) //返回的promise对象会直接跳过onfulfilled，
          } else {
            let res = onfulfilled(value)/**[这里onfulfilled，在上面不是执行过一遍了吗] */
            if (res instanceof MyPromise) {//当前then得出来的res是一个promise，那么得先等待状态改变
              res.then(onfulfilledNext, onrejectedNext)
            } else {//对应1
              onfulfilledNext(res)
            }
          }
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
      switch (_status) {
        case PENDING://如果.then 之前的promise还没有处理完毕，then方法可以被同一个promise对象多次调用,也就是存在多个回调函数
          this._fulfilledQueues.push(onfulfilled)
          this._rejectedQueues.push(onrejected)
          break;
        case FULFILLED://之前的promise成功执行，那么当前的回调函数直接执行
          fulfilled(_value)
          break;
        case REJECTED:
          rejected(_value)
          break;
      }
    })
  }
}


