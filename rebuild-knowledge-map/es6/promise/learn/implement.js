const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;
function MyPromise() {
    this.state = PENDING;
    this.value = null;
    this.handlers = [];

    function fulfilled(result) {
        this.state = FULFILLED;
        this.value = result;
        this.handlers.forEach(handle); //等待传入handle 函数
        this.handlers = [];
    }

    function rejected(reason) {
        this.state = REJECTED;
        this.value = reason;
        this.handlers.forEach(handle); //等待传入handle 函数
        this.handlers = [];
    }
    //判断value的值：promise 或者plain value
    function resolve(value) {
        try {
            let then = getThen(value);
            !!then ? doResolve(then.bind(this), fulfilled, rejected) : fulfilled(value);
        } catch (e) {
            rejected(e);
        }
    }

    this.done = (onFulfilled, onRejected) => {
        setTimeout(() => {
            handle({ onFulfilled, onRejected });
        }, 0);
    };

    this.then = (onFulfilled, onRejected) => {
        const curPromise = this;
        return new Promise((resolve, rejected) => {
            return curPromise.done(
                value => {
                    if (typeof onFulfilled === "function") {
                        try {
                            return resolve(onFulfilled(value));
                        } catch (e) {
                            return rejected(e);
                        }
                    } else {
                        return resolve(value);
                    }
                },
                err => {
                    if (typeof onRejected === "function") {
                        try {
                            return resolve(onRejected(err));
                        } catch (e) {
                            return rejected(e);
                        }
                    } else {
                        rejected(err);
                    }
                }
            );
        });
    };

    function handle(handler) {
        switch (this.state) {
            case PENDING:
                this.handlers.push(handler);
                break;
            case FULFILLED:
                if (typeof handler.onFulfilled === "function") {
                    handler.onFulfilled(this.value);
                }
                break;
            case REJECTED:
                if (typeof handler.onRejected === "function") {
                    handler.onRejected(this.value);
                }
                break;
        }
    }

    doResolve(fn.fulfilled, rejected);
}

function getThen(value) {
    const type = typeof value;
    if (value && (type === "object" || type === "function")) {
        //获取then方法
        const then = value.then;
        if (typeof then === "function") return then;
    }
    return null;
}

//执行resolve
function doResolve(fn, onFulfilled, onRejected) {
    let hasDone = false;
    try {
        fn(
            value => {
                if (hasDone) return;
                onFulfilled(value);
                hasDone = true;
            },
            reason => {
                if (hasDone) return;
                onRejected(reason);
                hasDone = true;
            }
        );
    } catch (err) {
        if (hasDone) return;
        hasDone = true;
        onRejected(err);
    }
}
