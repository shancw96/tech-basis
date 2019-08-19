let createRandom = require('./common');
let arr_ori = createRandom(7);

// function shellSort(arr){
//   if(arr == null || arr.length <= 1) return arr
//   let gap = 1;
//   while(gap<arr.length/3){
//     gap = gap*3+1
//   }
//   for(gap;gap>0;gap =Math.floor(gap/3)){
//     console.log(`增量为${gap}`)
//     for(let i = gap; i < arr.length; i++)
//       for(let j=i-gap ;j>=0 && arr[j]>arr[j+gap]; j-=gap){
//         [arr[j],arr[j+gap]] = [arr[j+gap],arr[j]]
//       }
//   }

//   return arr
// }
function shellsort(arr,skip = 3) {
  let len = arr.length;
  let gap = 1;
  while (gap < len / skip) {
    gap = skip * gap + 1;
  }
  while (gap >= 1) {
    for (let i = gap; i < len; i++) {
      for (let j = i; j >= gap && arr[j] < arr[j - gap];j -= gap) {
        [arr[j],arr[j-gap]] = [arr[j-gap],arr[j]]
      }
    }
    gap = (gap - 1) / skip;
  }
  console.log(arr)
  return arr
}
shellsort(arr_ori)