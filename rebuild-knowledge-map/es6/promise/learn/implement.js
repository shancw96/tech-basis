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
    //判断value的值：promise 或者plain value ,如果是promise 则获取他的then方法，进行执行
    // 总结：resolve 会将promise递归获取到then方法，然后执行fulfilled
    function resolve(value) {
        try {
            let then = getThen(value);
            !!then ? doResolve(then.bind(value), resolve, rejected) : fulfilled(value);
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

    doResolve(fn, resolve, rejected);
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

//执行resolve 只执行一次，递归调用原因
function doResolve(fn, onFulfilled, onRejected) {
    let hasDone = false;
    try {
        fn(
            value => {
                if (hasDone) return;
                onFulfilled(value); //resolve 递归调用
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
