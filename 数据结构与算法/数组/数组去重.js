function getUnique(arr) {
  let ans = arr.reduce((res_arr, cur) => {
    let hasSame = res_arr.some(item => isEqual(item, cur)) 
    !res_arr.some(item => isEqual(item, cur)) ? res_arr.push(cur) : ''
    return res_arr
  }, [arr[0]])
return ans
}

function isEqual(val_1, val_2) {
  //判断是否是基本类型
  let type1 = Object.prototype.toString.call(val_1)
  let type2 = Object.prototype.toString.call(val_1)
  if (type1 !== type2 ) return false //类型不相同直接结束判断
  else if (typeof val_1 !== 'object') return val_1 === val_2  //类型相同 判断是否是基本类型 基本类型直接比较值

  //引用类型判断
  //判断长度是否相同
  len1 = val_1 instanceof Array ? val_1.length : Object.keys(val_1).length
  len2 = val_2 instanceof Array ? val_2.length : Object.keys(val_2).length
  if (len1 !== len2) return false

  //根据类型再次判断value
  if (type1 === '[object Array]') {
    if(!len1) return true //增加undefined判断
    for (let i = 0; i < len1; i++) {
      if (isEqual(val_1[i], val_2[i])) return true
    }
  } else {
    return Object.keys(val_1).every(key => {
      if (!val_2[key]) return false
      return isEqual(val_1[key], val_2[key])
    })
  }
}

let ans = getUnique([[],[],[3],{a:1},[{a:1}]],[{a:1}])
console.log(ans)