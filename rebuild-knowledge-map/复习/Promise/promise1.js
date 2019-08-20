{
  {//.then接收前一个resolved的值。每次return 就是 包裹了一层promise.resolve
    let delay = s => {
      return new Promise((resolved,rejected)=>{
        setTimeout(()=>{
          resolved('done')
        },s)
      })
    }
    console.log(delay(1))//Promise { pending }
    let isDone = delay(1).then(res=>{
      console.log(res)//done
      return '==='+JSON.stringify(res)+'==='
    }).then(res2=>console.log(res2))//==="done"===


    console.log(isDone)//Promise { pending }
  }

  {
    //定义三个状态
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'
    //定义MyPromise构造函数
    function MyPromise(fn){ //new Promise((resolved,rejected)=>async function(resolved))
      //定义一个状态，保存当前的状态,初始化为PENDING
      this.status = PENDING

      this.value = null
      //定义resolved与rejected的回调函数数组
      this.resolvedCallback = [];
      this.rejectedCallback = [];
      //定义resolve方法，定义rejected方法
      this.resolved = resolved.bind(this)
      this.rejected = rejected.bind(this)
      //定义自执行方法
      try{
        fn(this.resolved,this.rejected)//为什么这里需要写rejected？提供给用户一个接口，允许自定义规则触发rejected
      }catch(e){
        this.rejected(e)
      }
    }

    function resolved(value){//在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
      if(this.status !== PENDING ) return ;
      //改变pending => rejected 并且
      this.status = RESOLVED;
      //将value传入回调函数
      this.value = value  //为什么需要这步？？？为了留给then方法中的回调函数调用
      this.resolvedCallback.map(cb=>cb(this.value))//这一步的作用是什么呢
      
    }
    function rejected(){
      //改变状态，调用对应的回调函数
      if (this.state !== PENDING) return;
      this.state = REJECTED;
      this.value = value;
      this.rejectedCallbacks.map(cb => cb(this.value))
    }

    //定义then方法,这是错误的方法
    MyPromise.prototype.then = function (onFulfilled, onRejected) {
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v//如果onFullfilled是function ，那么接着运行，否则直接返回值?有问题
      onRejected = typeof onRejected === 'function' ? onRejected :r => {throw r}
      // console.log(this)
      switch (this.state){
        case PENDING :
          this.resolvedCallbacks.push(onFulfilled);
          this.rejectedCallbacks.push(onRejected)
          break;
        case RESOLVED : onFulfilled(this.value);break;
        case REJECTED : onRejected(this.value);break;
      }
    }

    function delay(s){
      return new MyPromise((resolve,reject)=>{
        setTimeout(()=>{
          resolve('done')
        },s*1000)
      })
    }
    let res = delay(1)
    console.log(res)//myPromise
    let res2 = delay(2).then(res=>res)
    console.log(res2)
  }
}