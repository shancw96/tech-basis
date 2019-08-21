class Human{
  constructor(name,describe){
    this.name = name;
    this.describe = describe
  }
  code(){
    console.log(`${this.name} is coding`)
  }
}

class Chinese extends Human{
  constructor(name,describe){
    super(name,describe)
    this.describe ='hardworking'//覆盖继承父类的属性
  }
  code(){
    console.log(`${this.describe} ${this.name} is coding`)
  }
}

let shancw = new Chinese('shanCW','FE')
shancw.code()
console.log(shancw.describe)