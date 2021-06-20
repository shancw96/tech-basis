function nextGreaterElement(numList) {
  const ans = [];
  const stack = [];
  for(let i = numList.length -1; i >= 0; i--) {
    while(stack.length && top(stack) < numList[i]) {
      stack.pop();
    }
    ans[i] = stack.length ? top(stack) : -1;
    stack.push(numList[i]);
  }
  return ans;
}

function top(arr) {
  if (!(arr instanceof Array)) throw new TypeError("stack type must be array");
  return arr[arr.length - 1];
}

console.log(nextGreaterElement([2,1,5,6,3]))