function Animal(){
  this.type = 'Animal'
}

//定义一个Prototype看Cat能不能访问到
Animal.prototype = {
  describe(){
    console.log('low HQ')
  }
}

function Cat(name){
  Animal.call(this);
  this.name = name
}

Cat.prototype = Object.create(Animal.prototype,{
  constructor:{
    value:Cat,
    enumerable:true,
    configurable:true,
    writable:true
  }
})

let cat1 = new Cat('mimi')
console.log(cat1.name)//mimi
cat1.describe()//cat1.describe is not a function