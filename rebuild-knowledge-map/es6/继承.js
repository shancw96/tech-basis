{

  //继承不是新建实例，继承可以使得子类具有
  //父类的属性和方法或者重新定义、追加属性和方法等

  // {//借用构造函数的方法
  //   function Parent(val) {
  //     this.val = val;
  //   }
  //   Parent.prototype.getName = function () {
  //     console.log(this.val)
  //   }

  //   function Child(val, color) {
  //     Parent.call(this, val)
  //     this.color = color
  //   }

  //   //我想问：为什么使用call之后father的原型链上的this没有换成实例。/call只是更改Parent构造函数的this，不涉及prototype
  //   //查询：call的作用：
  //   //      原型链上的this，工作原理
  //   //new的工作原理：
  //   //          1. 创建一个空对象
  //   //          2. 将空对象的__proto__指向构造函数的prototype上
  //   //          3. 以空对象作为this，调用构造函数
  //   //let child  = new Child(1,'asd')
  //   //将child的proto指向构造函数Child的prototype ==> Object:{constructor}

  //   let child = new Child(1, 'black')
  //   console.log(child.val + '==' + child.color)//1 black
  //   // console.log(child.getName())//child.getName is not a function
  // }
  {
    function Parent(val) {
      this.val = val;
    }
    Parent.prototype.getName = function () {
      console.log(`say name ${this.val}`)
    }

    function Child(name, color) {
      Parent.call(this, name)
      this.color = color
    }

    // Child.prototype = Parent.prototype;//将Child的原型对象更改为Parent的
    Child.prototype = new Parent()// 用实例作为中继，这样修改child.prototype的时候,就不会发生更改弗雷德prototype

    let child = new Child('shancw', 'white')
    child.getName()
  }

  {//组合寄生式继承
    function Parent(value) {
      this.val = value
    }
    Parent.prototype.getValue = function () {
      console.log(this.val)
    }

    function Child(value) {
      Parent.call(this, value)
    }

    Child.prototype = Object.create(Parent.prototype, {//object.create方法
      constructor: {
        value: Child,
        enumerable: false,
        writable: true,
        configurable: true
      }
    })

    const child = new Child(1)

    child.getValue() // 1
    console.log(child instanceof Parent) // true

  }

}
