

let createRandomArr = require('./common')

let arr = createRandomArr(20000)

function bubbleSort(arr){ //O(n^n)
  let prev = Date.now()
  let arrCopy = arr.map(item=>item)//去除副作用
  for(let start =0 ;start < arrCopy.length;start++){
    for(let matched=start;matched<arrCopy.length-start+1;matched++){
      arrCopy[matched] < arrCopy[start] ? [arrCopy[matched],arrCopy[start]] =[ arrCopy[start],arrCopy[matched]]:''
    }
  }
  let now = Date.now()
  console.log('take time : '+(now-prev)/1000+'s')
  return arrCopy
}

let res = bubbleSort(arr)
// console.log(arr)
console.log(res)