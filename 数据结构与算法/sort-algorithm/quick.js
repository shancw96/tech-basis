let createRandom = require('./common')
let arr_ori = createRandom(10);
console.log(arr_ori)

function quickSort(array){
  if(!array.length) return []
  const mid = Math.floor(array.length/2)
  const [smallerArr,biggerArr] = diffArrBy(mid,array)
  const smaller = quickSort(smallerArr)
  const bigger = quickSort(biggerArr)
  return [...smaller,array[mid],...bigger]
}

function diffArrBy(mid,array){
  return [...array.slice(0,mid),...array.slice(mid+1)].reduce((matrix,curVal)=>{
    array[mid] >= curVal ? matrix[0].push(curVal):matrix[1].push(curVal)
    return matrix
  },[[],[]])
}

var getLeastNumbers = function(arr, k) {
  arr = quickSort(arr)
  console.log(arr)
 return arr.slice(0,k)
};
console.log(getLeastNumbers(arr_ori,2))