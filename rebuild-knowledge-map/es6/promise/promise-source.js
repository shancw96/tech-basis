/**
 * 1. new myPromise时，需要传递一个 executor 执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject
 * 3. myPromise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. myPromise 的状态一旦确认，就不会再改变
 * 5. myPromise 都有 then 方法，then 接收两个参数，分别是 myPromise 成功的回调 onFulfilled, 
 *      和 myPromise 失败的回调 onRejected
 * 6. 如果调用 then 时，myPromise已经成功，则执行 onFulfilled，并将myPromise的值作为参数传递进去。
 *      如果myPromise已经失败，那么执行 onRejected, 并将 myPromise 失败的原因作为参数传递进去。
 *      如果myPromise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
 * 8. myPromise 可以then多次，myPromise 的then 方法返回一个 myPromise
 * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 * 11.如果 then 返回的是一个myPromise,那么需要等这个myPromise，那么会等这个myPromise执行完，myPromise如果成功，
 *   就走下一个then的成功，如果失败，就走下一个then的失败
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function myPromise(executor) {
    let self = this;
    self.status = PENDING;
    self.onFulfilled = [];//成功的回调
    self.onRejected = []; //失败的回调
    //myPromiseA+ 2.1
    function resolve(value) {
        console.log(`code in function resolve. \t cur status is :${self.status}`)
        console.log('cur fnStack length is'+self.onFulfilled.length)
        if (self.status === PENDING) {
            self.status = FULFILLED;
            self.value = value;
            self.onFulfilled.forEach(fn => fn());//myPromiseA+ 2.2.6.1
        }
    }

    function reject(reason) {
        if (self.status === PENDING) {
            self.status = REJECTED;
            self.reason = reason;
            self.onRejected.forEach(fn => fn());//myPromiseA+ 2.2.6.2
        }
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
    console.log(`prev promise onfulfilled is :${onFulfilled}`)
    //myPromiseA+ 2.2.1 / myPromiseA+ 2.2.5 / myPromiseA+ 2.2.7.3 / myPromiseA+ 2.2.7.4
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    let self = this;//上一层的myPromise 为self
    console.log('prev promise status is :'+self.status)
    //myPromiseA+ 2.2.7
    let myPromise2 = new myPromise((resolve, reject) => {//这里的resolve 和reject 就是 构造函数中的resolve reject 对应executor(resolve,reject)两个参数
        //如果上一层的myPromise 的状态为fulfilled ，
        if (self.status === FULFILLED) {//2.前一个promise的状态为fulfilled 因此进入fulfilled 条件
            console.log('code in new Promise FULFILLED--------------------')

            setTimeout(() => {//2.1模拟promise 异步执行
                try {
                    
                    let x = onFulfilled(self.value);//执行then中的函数,参数为上一册resolve 传递的值 
                    //对x进行判断 
                    //是一个promise 那么等待这个promise执行完毕才能执行下面的
                    //普通值，执行当前promise 的resolve。 将状态变为fuifilled 并且将参数进行传递.这一步是为了链式调用，如果不进行resolve 那么下一个then 执行的时候判断的就是pending，也就是说then 携带的函数并不会被执行，而是压入栈中，等待状态改变
                    resolvemyPromise(myPromise2, x, resolve, reject);//对结果进行判断，如果是新的myPromise 那么等待执行完毕，不是myPromise就直接resolve
                    console.log('debugger : resolved status is :'+this.status)
                } catch (e) {
                    
                    reject(e);
                }
            });
        } else if (self.status === REJECTED) {
            console.log('code in new Promise REJECTED')
            //myPromiseA+ 2.2.3
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason);
                    resolvemyPromise(myPromise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        } else if (self.status === PENDING) {
            console.log('code in PENDING')
            self.onFulfilled.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value);
                        resolvemyPromise(myPromise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
            self.onRejected.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason);
                        resolvemyPromise(myPromise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        }
    });
    return myPromise2;
}

function resolvemyPromise(myPromise2, x, resolve, reject) {
    let self = this;
    //myPromiseA+ 2.3.1
    if (myPromise2 === x) {
        reject(new TypeError('Chaining cycle'));
    }
    if (x && typeof x === 'object' || typeof x === 'function') {
        let used; //myPromiseA+2.3.3.3.3 只能调用一次
        try {
            let then = x.then;
            if (typeof then === 'function') {
                //myPromiseA+2.3.3
                then.call(x, (y) => {
                    //myPromiseA+2.3.3.1
                    if (used) return;
                    used = true;
                    resolvemyPromise(myPromise2, y, resolve, reject);
                }, (r) => {
                    //myPromiseA+2.3.3.2
                    if (used) return;
                    used = true;
                    reject(r);
                });

            }else{
                //myPromiseA+2.3.3.4
                if (used) return;
                used = true;
                resolve(x);
            }
        } catch (e) {
            //myPromiseA+ 2.3.3.2
            if (used) return;
            used = true;
            reject(e);
        }
    } else {
        //myPromiseA+ 2.3.3.4
        resolve(x); // line28:function resolve(value){...}  此时的当前promise2 的状态为PENDING 所以 resolve执行后将参数value 传递给promise2 self.value = value
        
    }
}

function foo(num){
    return new myPromise((resolve,reject)=>{
            resolve(num+10)//1.执行resolve 将状态从pending -> resolve 并且进行参数传递 this.value = num+10
    })
}

foo(100).then(res=>{
    console.log('get then answser :'+res)
    return res+10
}).then(res=>{
    console.log(res)
})
