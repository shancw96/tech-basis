function Fat(name,age){
  this.age = age;
  this.name = name;
  return '1'
}

Fat.prototype.sayName = function(){
  console.log(`my name is ${this.name}`)
}

//模拟new的效果。this替换

function objectFactory(Fn,...args){
  let obj = {};
  obj.__proto__ = Fn.prototype
  let isObj = Fn.apply(obj,args)
  // console.log(isObj)
  return typeof isObj === 'object' ? isObj : obj

  // return obj
}


let test = objectFactory(Fat,'shancw','22')
let compare = new Fat('shancw','22')
console.log(test.age)
compare.sayName()//TypeError: compare.sayName is not a function