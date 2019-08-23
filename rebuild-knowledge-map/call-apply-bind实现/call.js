{
  {//方法前面的对象就是this
    let Person = {
      name: 'Tom',
      // say(){
      //   console.log(this.name)
      // }
      say: say
    }
    let person2 = {
      name:'jemmy',
      say
    }
    function say() {
      console.log(this.name)//
    }
    say()//undefined
    Person.say()//tom
    Person.say.call(person2)//jemmy    ==> person2.say()
  }

  {
    //call 更改了this的指向为传入的值
    Function.prototype.myCall = function(context,...args){
      console.log(this)//函数本身
      console.log(context)
      context.fn = this;
      let res = context.fn(...args)
      delete context.fn
      return res
    }
    let child = {
      name :'pale'
    }
    let Person = {
      name : 'shancw',
      say(){
        console.log(this.name)
      }
    }
    // console.log(Function.prototype.call)
    Person.say.myCall(child,1,1,2,4,5)
  }
}