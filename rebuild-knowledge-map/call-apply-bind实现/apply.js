{
  {
    let car1 = {
      name:'jack',
      sayName
    }
    function sayName(arg1,arg2,arg3){
      console.log(this.name)
    }
    let car2 = {
      name:'shancw'
    }
    car1.sayName.apply(car2,[1,2,3])//apply接收context，并且接受的参数格式为数组
  }

  {
    let car1 = {
      name:'jack',
      sayName
    }
    let car2 = {
      name:'shancw'
    }
    function sayName(arg1,arg2,arg3){
      arg1
      arg2
      console.log(this.name)
    }
    Function.prototype.myApply = function(context,arr) {
      console.log(this)
      context.fn = this;
      let res = context.fn(...arr)
      delete context.fn
      return res
    }
    car1.sayName.myApply(car2,[1,2,3])

  }
}