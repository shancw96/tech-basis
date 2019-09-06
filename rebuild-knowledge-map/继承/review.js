class Human {
  constructor(describe){
    this.describe = describe
  }
  walk(){
    console.log('can walk with two legs')
  }
  talk(){
    console.log('this kind can commulate with each other')
  }
}

class Black extends Human{
  constructor(color,describe){
    super(describe)//Human.call(describe) 调用父类的构造方法
    this.color = 'black'
  }
}

let Jons = new Black('blac','jons is a normal africa people -- class')
console.log(Jons.color+''+Jons.describe)

//构造函数继承，没有办法继承prototype
function Human_2(name,describe){
  this.name = name
  this.describe = describe
  this.walk = walk
}

Human_2.prototype.test = function(){
  console.log(`${this.name} testing whether work? -- 构造函数继承`)
}
function walk(){
  console.log(this.name+'can walk with two legs')
}
function Black_2(color,name,describe){
  Human_2.call(this,name,describe)
  this.color = color
}

let jon2 = new Black_2('black','jons2','jons is a normal africa people -- 构造函数继承')
jon2.walk()
console.log(jon2.color + jon2.describe)
// jon2.test()//TypeError jon2 test is not a function 

//组合继承，解决构造函数继承的缺点
function Human_3(name,describe){
  this.name = name
  this.describe = describe
  this.walk = walk
}
Human_3.prototype.test = function(){
  console.log(`${this.name} testing whether work?-- 组合继承`)
}
function Black_3(color,name,describe){
  Human_2.call(this,name,describe)
  this.color = color
}
Black_3.prototype = new Human_3() //通过构建一个实例，来链接Human_3 的原型对象，当改变本身prototype的方法的时候，会在这个实例上创建，缺点很明显，原型多了name= describe walk 等无用undefiend属性

let jon3 = new Black_3('black','jons3','jons is a normal africa people -- 构造函数继承')

//组合寄生式继承,利用object.create解决上面的问题,并将其构造函数指向自身
function Human_4(name,describe){
  this.name = name
  this.describe = describe
  this.walk = walk
}
Human_4.prototype.test = function(){
  console.log(`${this.name} testing whether work?-- 组合寄生继承`)
}
function Black_4(color,name,describe){
  Human_4.call(this,name,describe)
  this.color = color
}
Black_4.prototype = Object.create(Human_4.prototype,{
  constructor:{
    value:Black_4,
    enumerable:true,
    configurable:true,
    writeable:true
  }
})

let jon4 = new Black_4('black','jons4','jons is a normal africa people -- 构造函数继承')
jon4.test()
