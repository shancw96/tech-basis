const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function Promise(fn) {
    //state 有三个状态， pending fulfilled rejected
    let state = PENDING;

    //保存value 或者error，当状态改变为fulfilled 或者 rejected 时候
    let value = null;

    //保存 成功&失败 方法 ：通过.then 或者.done 绑定
    let handlers = [];

    function fulfilled(result) {
        this.state = FULFILLED;
        this.value = result;
    }

    function rejected(error) {
        this.state = REJECTED;
        this.value = error;
    }

    //resolve 接收1.promise 2.plain value ，如果接收的是promise 那么等待它完成
    function resolve(result) {
        try {
            let then = getThen(result);
            if (then) {
                doResolve(then.bind(result), resolve, reject);
            }
            fulfilled(result);
        } catch (e) {
            rejected(e);
        }
    }
    doResolve(fn, resolve, rejected);
}

//检测value 是否是一个promise ，如果是的话返回哪个promise 的then方法
//getThen :: Promise/plain value -> Function/null
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

//用来处理接收值为promise 的情况
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
