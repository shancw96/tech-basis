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
  constructor(name,subject){
    this.name = name;
    this.subject = subject;
    this.subject.attach(this)
  }
  update(){
    console.log(`update: oberser:${this.name} get new state:${this.subject.getState()}`)
  }
}
let s = new Subject()
let myObserver = new Observer('zhangsan',s)
s.setState(4)