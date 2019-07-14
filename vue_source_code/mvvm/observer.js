function observer(data){
  if(!data || typeof data !=='object') return 
  Object.keys(data).forEach(key=>{
    defineReactive(data,key,data[key])
  })
}

function defineReactive(data,key,val){
 let dep = new Dep()
  observer(val)
  Object.defineProperty(data,key,{
    enumerable:true,
    configurable:false,
    get:()=> val,
    set:(newVal)=> {
      console.log(`observer ${key}:${val}--->${newVal}`)
      val = newVal
      dep.notifySubs()
    }
  })
}



function Dep(){
  this.subs = []
}
Dep.prototype ={
  addSub:(sub)=>{
    this.subs.push(sub)
  },
  notifySubs :()=>{
    this.subs.forEach(sub=>{
      sub.update()
    })
  }
}

// function Watcher (){
//   this.val = this.get()
// }
// Watcher.prototype = {
//   update : ()
// }