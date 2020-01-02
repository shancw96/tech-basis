const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function Promise(fn) {
    let state = PENDING;
    let value = null;
    let handlers = [];

    function fulfilled(result) {
        state = FULFILLED;
        value = result;
        handlers.forEach(handle);
        handlers = null;
    }

    function reject(error) {
        state = REJECTED;
        value = error;
        handlers.forEach(handle);
        handlers = null;
    }

    //resolve 接收1.promise 2.plain value ，如果接收的是promise 那么等待它完成
    function resolve(result) {
        try {
            let then = getThen(result);
            if (then) {
                doResolve(then.bind(result), resolve, reject); //如果then 存在，那么说明是一个promise，将promise 作为then的上下文
            }
            fulfilled(result);
        } catch (e) {
            rejected(e);
        }
    }

    //异步执行handle函数
    this.done = (onFulFilled, onRejected) => {
        setTimeout(() => {
            handle({
                onFulFilled,
                onRejected
            });
        }, 0);
    };
    this.then = (onFulFilled, onRejected) => {
        let curPromise = this;
        return new Promise((resolve, reject) => {
            return curPromise.done(
                result => {
                    if (typeof onFulFilled === "function ") {
                        try {
                            return resolve(onFulFilled(result));
                        } catch (e) {
                            return reject(e);
                        }
                    } else {
                        return resolve(result);
                    }
                },
                err => {
                    if (typeof onRejected === "function") {
                        try {
                            return resolve(onRejected(err));
                        } catch (e) {
                            return reject(e);
                        }
                    } else {
                        return reject(err);
                    }
                }
            );
        });
    };

    //根据 state 来执行不同的方法，如果为pending，则加入执行队列
    function handle(handler) {
        if (state === PENDING) {
            handlers.push(handler);
        } else {
            if (state === FULFILLED && typeof handler.onFulFilled === "function") {
                handler.onFulFilled(value);
            }
            if (state === REJECTED && typeof handler.onRejected === "function") {
                handler.onRejected(value);
            }
        }
    }

    function getThen(value) {
        let t = typeof value;
        if (value && (t === "object" || t === "function")) {
            let then = value.then;
            if (typeof then === "function") {
                return then;
            }
        }
        return null;
    }

    //处理函数/或者叫入口函数
    function doResolve(fn, onFulfilled, onRejected) {
        let done = false; //只执行一次
        try {
            fn(
                value => {
                    if (done) return;
                    done = true;
                    onFulfilled(value);
                },
                reason => {
                    //这个可以省略
                    if (done) return;
                    done = true;
                    onRejected(reason);
                }
            );
        } catch (e) {
            if (done) return;
            done = true;
            onRejected(e);
        }
    }

    doResolve(fn, resolve, reject);
}
