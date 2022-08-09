class Person {
  constructor(height, color, country, name) {
    this.height = height
    this.color = color
    this.country = country
    this.name = name
  }
  talk(something) {
    console.log(this.name + '说:' + something)
  }
  walk() {
    console.log(this.name + 'is walking');
  }
  getInfo() {
    console.log(this);
  }
}

const lmm = new Person('165CM', 'yellow', 'china', 'lmm');

const shancw = new Person('175CM', 'yellow', 'china', 'shancw');
lmm.talk('lalala');
// lmm.getInfo();
// shancw.talk('haihai');
// shancw.getInfo();

const lmm2 = {
  height: '180CM',
  color: 'yelow'
}

console.log(lmm.getInfo())
console.log(lmm2)
// {let name="aaa"
// let Person={
//   name:name
// };
// console.log(Person)
// }
{let person ={
  name:"wsc",
  age:"26",
  job:"aaa",
  sayName(){
    console.log(this.name)
  }
}



}