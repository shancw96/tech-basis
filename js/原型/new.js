function Fat(name,age){
  this.age = age;
  this.name = name;
}

Fat.prototype.sayName = function(){
  console.log(`my name is ${this.name}`)
}

//模拟new的效果。this替换

function createObj(factory, ...args) {
  let obj = Object.create(factory.prototype)
  let isObj = factory.apply(obj, args)// 构造函数执行
  return isObj === undefined ? obj : isObj
}


let test = createObj(Fat,'shancw','22')
test.sayName()