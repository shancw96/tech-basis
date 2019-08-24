{
  {
    /**
     * 1.生成新的对象
     * 2.连接到原型
     * 3.绑定this，并执行构造函数
     * 4.返回新对象
     */
    function Car(name,price){
      this.name = name
      this.price = price
      return '1'
    }
    let car1 = new Car('BWM','100$')
    car1
  }
  {
    function Car(name,price){
      this.name = name
      this.price = price
      return '1'
    }
    let car1 = new Car('BWM','100$')
    car1 
    function myNew(fn,...args){
      let obj = {}
      obj.__proto__ = Object.create(fn.prototype)
      let res = fn.apply(obj,args)
      return typeof res === 'object' ? res : obj
    }
    let car2 = myNew(Car,'s','s')
    car2
  }
}