//设计subject，实现添加 删除 观察者 ，主要负责所有的observer 的管理
class Subject {
    constructor(){
        this.observers = []
    }
    remove(observer){
        const index = this.observers.indexOf(observer)
        if(index === -1) return 
        this.observers = [...this.observers.slice(0,index),...this.observers.slice(index+1)]
    }
    add(observer){
        this.observers = [...this.observers,observer]
    }
    notify(message){
        this.observers.forEach(observer=>this.observer[i](message))
    }
}

