const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function MyPromise(fn) {
  let state = PENDING;
  let value = null;
  let handlers = [];

  function fulfilled(result) {
    state = FULFILLED;
    value = result;
    handlers.forEach(handle); //我觉得应该将value传入
    handlers = null;
  }

  function rejected(err) {
    state = FULFILLED;
    value = err;
    handlers.forEach(handle); //我觉得应该将value传入
    handlers = null;
  }

  //value :: promise / plain value
  function resolve(result) {
    try {
      let then = getThen(result);
      if (then) {
        doResolve(then.bind(result), resolve, reject);
        return;
      }
      fulfilled(result);
    } catch (e) {
      reject(e);
    }
  }

  function handle(handler) {
    switch (state) {
      case PENDING:
        handlers.push(handler);
        break;
      case FULFILLED:
        if (typeof handler.onFulfilled === "function") {
          handler.onFulfilled(value);
        }
        break;
      case REJECTED:
        if (typeof handler.onFulfilled === "function") {
          handler.onRejected(value);
        }
    }
  }

  //不管结果是什么，promise 还是plain value 都直接执行结果
  //将resolve 与 reject 传递给handle方法，handle根据状态来决定使用那个方法
  this.done = function(onFulfilled, onRejected) {
    //确保一定是下一轮 时间轮片开始才执行。这里参考100行左右的代码
    //100 行setTimeout  是第一个时间轮片，这里的setTimeout是第个时间轮片
    setTimeout(() => {
      handle({ onFulfilled, onRejected });
    }, 0);
  };

  //在done 基础上增加了判断 done结果是否为promise
  this.then = function(onFulfilled, onRejected) {
    const curPromise = this;
    return new Promise((resolve, reject) => {
      //new Promise -> doResolve ---（run fn)---> curPromise.done
      return curPromise.done(
        result => {
          if (typeof onFulfilled === "function") {
            //promise
            try {
              return resolve(onFulfilled(result));
            } catch (ex) {
              return reject(ex);
            }
          } else {
            return resolve(result);
          }
        },
        err => {
          if (typeof onRejected === "function") {
            try {
              return resolve(onRejected(err));
            } catch (ex) {
              return reject(ex);
            }
          } else {
            return reject(error);
          }
        }
      );
    });
  };

  //fn -> (resolve,rejected)=>{...}
  doResolve(fn, resolve, rejected); //将上面的resolve 和 reject 函数传入fn中，为什么不用curry？
}

//从value 中取出then方法
function getThen(value) {
  let type = typeof value;
  if (value && (type === "object" || type === "function")) {
    let then = value.then;
    if (typeof then === "function") {
      return then;
    }
  }
  return null;
}

//只执行一次
function doResolve(fn, onFulfilled, onRejected) {
  let done = false;
  try {
    fn(
      value => {
        if (done) return;
        done = true;
        onFulfilled(value);
      },
      reason => {
        if (done) return;
        done = true;
        onRejected(reason);
      }
    );
  } catch (e) {
    onRejected(e);
  }
}

// let res = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1); //这里resolve 方法，延迟1ms后，对这个promise实例的value进行赋值，在此后访问value才不为空
//     }, 1);
// });

// res.done(res => {
//     console.log(res);
// });
