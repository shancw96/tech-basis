{
  {//JSON 序列化处理对象拷贝
    let obj = {
      a: 1,
      b: 2
    }

    let copy_obj = JSON.parse(JSON.stringify(obj))
    copy_obj.a = 2
    copy_obj
    obj
  }

  {//递归深拷贝
    let obj = {
      a:1,
      b:{
        c(){//属性名可省略，当对象中的key：value键值对，如果value是个变量/函数，此时省略key，key的值就是变量名/函数名。
          console.log('I am function')
        }
      }
    }

    function deepClone(obj){
      if(typeof obj !== 'object') return obj;
      let cloneObj = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
      Object.keys(obj).forEach(key=>{
        cloneObj[key] = deepClone(obj[key])
      })
      return cloneObj
    }
    let res = deepClone(obj)
    res
  }

  {//递归解决环问题
    let obj = {
      a:1,
      b:{
        c(){//属性名可省略，当对象中的key：value键值对，如果value是个变量/函数，此时省略key，key的值就是变量名/函数名。
          console.log('I am function')
        }
      }
    }
    obj.c = obj.a


    function deepClone(obj,memo){
      if(memo === undefined) memo = new WeakMap()
      if(memo.has(obj)) return obj

      if(typeof obj !== 'object') return obj;
      
      let cloneObj = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
      
      memo.set(obj,cloneObj)

      Object.keys(obj).forEach(key=>{
        cloneObj[key] = deepClone(obj[key])
      })
      return cloneObj
    }
    let res = deepClone(obj)
    res
    
  }
}