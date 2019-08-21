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
//改变子类的原型为 `new Animal()` 来继承父类的函数
//缺点：在继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性
//     并且自己的constructor属性被清空
Cat.prototype = new Animal()

let cat1 = new Cat('mimi')
console.log(cat1.name)//mimi
cat1.describe()//cat1.describe is not a function