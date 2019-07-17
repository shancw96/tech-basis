class SingleObject {
  login(){
    console.log('login')
  }
}

SingleObject.getInstance = (function(){
  let instance;
  return function (){
    if(instance == null){
      instance = new SingleObject()
    }
    return instance
  }
})()


let obj1 = SingleObject.getInstance();
let obj2 = SingleObject.getInstance();
console.log(obj1 === obj2)//true