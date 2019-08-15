//手写promise
// 构造函数Mypromise 
// 在异步没有成功之前返回Promise { pending }
// 在成功之后通过.then 调用 返回异步值





//一开始 `Promise` 的状态应该是 `pending`
//value` 变量用于保存 `resolve` 或者 `reject` 中传入的值
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECT = 'rejected';

function MyPromise(fn) {
  this.state = PENDING;
  this.value = null;
  this.resolvedCallbacks = [];//?：为什么要用数组保存
  this.rejectedCallbacks = [];
  this.resolved = resolved.bind(this)//返回一个绑定上下文的resolved函数
  this.reject = resolved.bind(this)

  //实现如何执行 `Promise` 中传入的函数 ?
  try {
    fn(this.resolved, this.reject)
  } catch (e) {
    this.reject(e)
  }

}

function resolved(value) {

  if (this.state !== PENDING) return
  this.state = RESOLVED;
  this.value = value;
  this.resolvedCallbacks.map(cb => cb(this.value))
}

function reject(value) {
  if (this.state !== PENDING) return;
  this.state = REJECT;
  this.value = value;
  this.rejectedCallbacks.map(cb => cb(this.value))
}
/***********then实现********** */
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected = typeof onRejected === 'function' ? onRejected :r => {throw r}
  // console.log(this)
  switch (this.state){
    case PENDING :
      this.resolvedCallbacks.push(onFulfilled);
      this.rejectedCallbacks.push(onRejected)
      break;
    case RESOLVED : onFulfilled(this.value);break;
    case REJECT : onRejected(this.value);break;
  }
}








function delay(ms) {
  return new MyPromise((resolved, reject) => {
    //需要bind将resolved的上下文变为MyPromise
    setTimeout(resolved, ms, 'done')
  })
}
console.log(delay(100))
delay(100).then(res=>console.log(res))