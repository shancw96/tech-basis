/**
 * 
 * 给你一个数组 T = [73, 74, 75, 71, 69, 72, 76, 73]，
 * 这个数组存放的是近几天的天气气温
 * 你返回一个数组，
 * 计算：
 * 对于每一天，你还要至少等多少天才能等到一个更暖和的气温；如果等不到那一天，填 0 。
 * 举例：
 * T = [73, 74, 75, 71, 69, 72, 76, 73]，
 * 返回 [1, 1, 4, 2, 1, 1, 0, 0]。
 */
function nextGreaterElement(numList) {
  const ans = [];
  const stack = [];
  for(let i = numList.length -1; i >= 0; i--) {
    while(stack.length && top(stack).value < numList[i]) {
      stack.pop();
    }
    ans[i] = stack.length ? top(stack).index - i : 0;
    stack.push({value:numList[i], index: i});
  }
  return ans;
}

function top(arr) {
  if (!(arr instanceof Array)) throw new TypeError("stack type must be array");
  return arr[arr.length - 1];
}


console.log(nextGreaterElement([73, 74, 75, 71, 69, 72, 76, 73]));