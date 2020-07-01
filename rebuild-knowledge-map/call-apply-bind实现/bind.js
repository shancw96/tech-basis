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
      context = context || window
      return (...args)=>{
        context.fn = this
        const result = context.fn(...arg1,...args)
        delete context.fn;
        return result
      }
    }
  }

    car1.sayName.myBind(car2,1)([2,2])
    car2
  }
}