class Subject {
  constructor(){
    this.state = 0;
    this.Observers = []
  }
  setState(val){
    this.state = val;
    this.notifyObservers()
  }
  getState(){
    return this.state
  }
  notifyObservers(){
    this.Observers.forEach(observer=>{
      observer.update()
    })
  }
  attach(observer){
    this.Observers.push(observer)
  }
}

class Observer {
  constructor(name,...arr){
    this.name = name;
    this.subject1 = subject;
    this.subject1.attach(this)
    this
  }
  update(){
    console.log(`update: oberser:${this.name} get new state:${this.subject.getState()}`)
  }
}
let s = new Subject()
let myObserver = new Observer('zhangsan',s)
s.setState(4)//update: oberser:zhangsan get new state:4