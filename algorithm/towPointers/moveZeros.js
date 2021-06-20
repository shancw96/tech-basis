function moveZeros(list) {
  let left = 0;
  let right = list.length - 1;
  while(left < right) {
    if (list[left] === 0) {
      [list[left], list[right]] = [list[right], list[left]];
      right -=1;
    } else {
      left += 1;
    }
  }
  return list
}

console.log(moveZeros([1,2,0,1,3,0]))