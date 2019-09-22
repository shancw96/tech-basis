class EventEmitter {
    constructor (eventList){
        this._events = eventList
    }

    addEventListener(type,listener,prepend = false){//默认尾部添加
        if(this._events[type]){
            prepend ? this._events[type].unshift(listener):this._events[type].push(listener)
        }else{//不存在这个类型的lisntenr就初始化一个
            this._events[type] = [listener]
        }
    }
    emit(type,...args){
       if(!this._events[type]) throw new Error('please register event first!')
       this._events[type].forEach(listener=>{
        //    listener(...args)
        listener.apply(this,args)
       })
    }
    //默认删除某一类事件，如果存在具体listener名称，则只删除具体的
    removeEventListener(type,listener){
        if(!this._events[type]) return 
        if(listener){
            this._events[type] = this._events[type].filter(curListener !== listener)
        }else{
            delete this._events[type]
        }
    }
    once(type,listener){
        const wrapper = ()=>{
            listener.apply(this)
            this.removeEventListener(type,listener)
        }
        this.addEventListener(type,wrapper)
    }
}