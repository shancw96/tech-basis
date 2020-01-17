const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

const isFunction = val => typeof val === "function";

class MyPromise {
    constructor(handle) {
        if (!isFunction(handle)) {
            throw new Error("MyPromise accept function as parameter");
        }

        //初始化状态
        this._status = PENDING;
        this._value = null;

        this._fulfilledQueues = [];
        this._rejectedQueues = [];

        try {
            //传入成功与失败处理函数，留着决定状态
            this.handle(this._resolve.bind(this), this._reject.bind(this));
        } catch (e) {
            this._reject(e);
        }
    }
    // 添加静态resolve方法
    static resolve(value) {
        // 如果参数是MyPromise实例，直接返回这个实例
        if (value instanceof MyPromise) return value;
        return new MyPromise(resolve => resolve(value));
    }
    // 添加静态reject方法
    static reject(value) {
        return new MyPromise((resolve, reject) => reject(value));
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : val => val;
        const curPromise = this;
        return new MyPromise((resolve, reject) => {
            const fulfilled = value => {
                try {
                    let res = onFulfilled(value);
                    res instanceof MyPromise ? res.then(resolve, reject) : resolve(res);
                } catch (e) {
                    onRejected(e);
                }
            };
            const rejected = reason => {
                try {
                    let res = onRejected(reason);
                    res instanceof MyPromise ? res.then(resolve, rejected) : reject(res);
                } catch (err) {
                    onRejected(err);
                }
            };

            switch (curPromise._status) {
                case PENDING:
                    this._fulfilledQueues.push(fulfilled);
                    this._rejectedQueues.push(rejected);
                    break;
                case FULFILLED:
                    fulfilled(curPromise._value);
                    break;
                case REJECTED:
                    rejected(curPromise._value);
            }
        });
    }
    finally(handle) {
        return this.then(
            res => MyPromise.resolve(handle()).then(() => res),
            e => MyPromise.reject(handle()).then(() => e)
        );
    }
    //Promise / plain value
    _resolve(value) {
        const onFulfilled = val => {
            this._status = FULFILLED;
            this._value = val;
            this._fulfilledQueues.forEach(fn => fn(val));
            this._fulfilledQueues = [];
        };
        const onRejected = val => {
            this._status = REJECTED;
            this._value = val;
            this._rejectedQueues.forEach(fn => fn(val));
            this._rejectedQueues = [];
        };

        const run = () => {
            if (this._status === PENDING) return;
            if (value instanceof MyPromise) {
                value.then(
                    res => onFulfilled(res),
                    err => onRejected(err)
                );
            } else {
                onFulfilled(val);
            }
        };
        setTimeout(run, 0);
    }
    _reject(reason) {
        const run = () => {
            this._value = reason;
            this._status = REJECTED;

            this._rejectedQueues.forEach(fn => fn(reason));
            this._rejectedQueues = [];
        };
        //保证异步
        setTimeout(run, 0);
    }
}
