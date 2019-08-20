let createRandom = require('./common');
let arr_ori = createRandom(7);

function shellsort(arr,skip = 2) {
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
  return arr
}
shellsort(arr_ori)