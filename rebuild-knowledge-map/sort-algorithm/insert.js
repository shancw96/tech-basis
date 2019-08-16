let createRandom = require('./common')
let ori_arr = createRandom(100)

function insertSort(ori_arr){
  let arr = ori_arr.map(item=>item);
  for(let target = 1 ; target<arr.length;target++){
    for(let match = target-1;match>=0 && arr[match] > arr[match+1];match--){
         [arr[match+1],arr[match]]=[arr[match],arr[match+1]]
    }
  }
  return arr
}
let res = insertSort(ori_arr)
console.log(res)