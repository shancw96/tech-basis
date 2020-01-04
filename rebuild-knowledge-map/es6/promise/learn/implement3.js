const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

const isFunction = val => typeof val === "function";
class MyPromise {
    constructor(handle) {
        if (!isFunction) {
            throw new Error("MyPromise accept function as parameter");
        }
        this._status = PENDING;
        this._value = null;

        this._fulfilledQueues = [];
        this._rejectedQueues = [];

        try {
            handle(this._resolve.bind(this), this._reject.bind(this));
        } catch (err) {
            this._reject(err);
        }
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
