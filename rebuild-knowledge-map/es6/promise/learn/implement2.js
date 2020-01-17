const isFunction = val => typeof val === "function";

const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
    constructor(handle) {
        if (!isFunction(handle)) {
            throw new Error("myPromise must accept a function");
        }
        this._status = PENDING;
        this._value = null;

        this._fullFilledQueues = [];
        this._rejectedQueues = [];

        try {
            handle(this._resolve.bind(this), this._reject.bind(this));
        } catch (e) {
            this._reject(e);
        }
    }
    //根据value的值类型来执行不同操作
    _resolve(value) {
        const run = () => {
            if (this._status !== PENDING) return;
            const runFulfilled = _ => {
                this._fullFilledQueues.forEach(handle => handle(_));
                this._fullFilledQueues = [];
            };
            const runRejected = _ => {
                this._rejectedQueues.forEach(handle => handle(_));
                this._rejectedQueues = [];
            };

            //如果resolve 了一个promise 则必须增加判断
            if (value instanceof MyPromise) {
                value.then(
                    res => {
                        this._status = FULFILLED;
                        this._value = res;
                        runFulfilled(res);
                    },
                    err => {
                        this._status = REJECTED;
                        this._value = err;
                        runRejected(err);
                    }
                );
            } else {
                //正常情况
                this._status = FULFILLED;
                this._value = value;
                runFulfilled(this._value);
            }
        };
        //在下一个事件周期执行
        setTimeout(run, 0);
    }
    _reject(err) {
        if (this._status !== PENDING) return;
        const run = () => {
            this._status = REJECTED;
            this._value = err;
            this._rejectedQueues.forEach(handle => handle(err));
            this._rejectedQueues = [];
        };
        //在下一个事件周期执行
        setTimeout(run, 0);
    }

    then(onFulfilled, onRejected) {
        const curPromise = this;
        return new MyPromise((resolve, reject) => {
            let fulfilled = value => {
                try {
                    if (!isFunction(onFulfilled)) {
                        resolve(value);
                    } else {
                        let res = onFulfilled(value);
                        if (res instanceof MyPromise) {
                            res.then(resolve, reject);
                        } else {
                            resolve(res);
                        }
                    }
                } catch (e) {
                    onRejected(e);
                }
            };
            let rejected = err => {
                try {
                    if (!isFunction(onRejected)) {
                        rejected(err);
                    } else {
                        let res = onRejected(err);
                        if (res instanceof MyPromise) {
                            res.then(resolve, rejected);
                        } else {
                            rejected(err);
                        }
                    }
                } catch (e) {
                    onRejected(e);
                }
            };

            switch (curPromise._status) {
                case PENDING:
                    this._fullFilledQueues.push(fulfilled);
                    this._rejectedQueues.push(rejected);
                    break;
                case FULFILLED:
                    fulfilled(_value);
                    break;
                case REJECTED:
                    rejected(_value);
                    break;
            }
        });
    }

    race(promiseArr) {
        return new Promise((resolve, reject) => {
            for (let p of promiseArr) {
                p.then(
                    res => resolve(res),
                    err => reject(err)
                );
            }
        });
    }

    all(promiseArr) {
        return new Promise((resolve, reject) => {
            let result = [];
            let count = 0;
            for (let p of promiseArr) {
                p.then(
                    res => {
                        count += 1;
                        result.push(res);
                        if (count === promiseArr.length) {
                            resolve(result);
                        }
                    },
                    err => {
                        reject(err);
                    }
                );
            }
        });
    }
}

let wait = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("from Promise wait");
    }, 200);
});

let wait2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("from Promise wait2");
    }, 110);
});
let wait3 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("from Promise wait3");
    }, 120);
});

Promise.race([wait, wait2, wait3]).then(res => {
    console.log(res);
});
Promise.all([wait, wait2, wait3]).then(res => {
    console.log(res);
});
