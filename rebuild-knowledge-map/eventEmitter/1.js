class EventEmitter{
  constructor(){
    this.maxListeners = 10 
    this._events = {} //为什么事件列表是一个空对象
  }
  //添加事件,这三个参数的意思？type:监听的事件类型，listener:回调函数 prepend：是否头部插入
  addListener(type,listener,prepend){ 
    if(this._events[type]){//如果已经存在同类型的事件，那么在同类型的队列中添加
      prepend ? this._events[type].unshift(listener) : this._events[type].push(listener);
    }
    else{
      this._events[type] = [listener]//第一次添加的话,创建一个数组
    }
  }

  //移除事件
  removeListener(type,listener){
    if(!this._events[type]) return ;
    if(listener){ //删除具体某个事件的某个函数
      this._events[type] = this._events[type].filter(cur=>cur!== listener)
    }else{ //删除一类
      delete this._events[type]
    }
    
  }

  //事件执行
  emit(type,...args){
    if(!(this._events[type] instanceof Array)) return 
    this._events[type].forEach(fn=>{
      fn.apply(this,args)
    })
  }

  //设置最大事件监听数
  setMaxListener(num){
    this._maxListeners = num
  }
}

let emitter = new EventEmitter()
emitter.addListener('test1',args=>{
  console.log(`1 : triggle test1. received args:${args}`)
})
emitter.addListener('test1',args=>{
  console.log(`2 : triggle test1. received args:${args}`)
})
emitter.emit('test1','~_~')
emitter.removeListener('test1')