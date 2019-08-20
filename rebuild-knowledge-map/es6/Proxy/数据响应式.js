let onWatch = (obj, getLogger,listenBind) => {
  let handler = {
    get(target, property, receiver) {//目标对象、属性名和 proxy 实例本身
      getLogger(property)
      return Reflect.get(target, property, receiver)
    },
    set(target, name, value, receiver) {
      listenBind(name, value);
      Reflect.set(target, name, value, receiver)
    }
  }
  return new Proxy(obj, handler)
}
let obj = { a: 1 }
let proxy_arr = onWatch(obj, 
  property => console.log(`listen get ${property}`), 
  (name, value) => console.log(`listen set ${name}:${value}`)
);

proxy_arr.a = 2

