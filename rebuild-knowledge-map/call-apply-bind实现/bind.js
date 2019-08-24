{
  {
    let car1 = {
      name: 'jack',
      sayName,
      chageName
    }
    function sayName(arg1, arg2, arg3) {
      console.log(this.name)
    }
    function chageName(){
      this.name = '---'
      console.log(this.name)
    }
    let car2 = {
      name: 'shancw'
    }
    car1.chageName.bind(car2)()//会改变绑定的this
    car2
  }

  {
    let car1 = {
      name: 'jack',
      sayName,
      chageName
    }
    function sayName(arg1, arg2, arg3) {
      arg1
      arg2
      console.log(this.name)
    }
    function chageName(){
      this.name = '---'
    }
    let car2 = {
      name: 'shancw'
    }
    Function.prototype.myBind = function(context,...arg1) {
      let fn = this
      return function F(arg2){
        //对于函数来说有两种方式调用，一种是直接调用，一种是通过 `new` 的方式
        if(this instanceof F) return new fn([...arg1,...arg2])
        return fn.apply(context,[...arg1,...arg2])
    }
  }

    car1.sayName.myBind(car2,1)([2,2])
    car2
  }
}