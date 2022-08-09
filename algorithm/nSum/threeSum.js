function twoSum(target, list) {
  let dict = {};
  let ans = [];
  list.forEach(item => {
    if (dict[item]) {
      ans.push([item, target - item])
    } else {
      dict[target-item] = true
    }
  })
  return ans
}

function threeSum(list) {
  list.sort();
  let dict = {};
  for(let index in list) {
    let findVal = -list[index]
    const tempAnsList = twoSum(findVal, [...list.slice(0, index), ...list.slice(index+1)])
    dict[findVal] = tempAnsList.length ? join(list[index], tempAnsList) : []
  }
  const ansMap = Object.entries(dict).reduce((ansMap, cur) => {
    if (cur[1].length) {
      cur[1].forEach(arr => {
        const key = JSON.stringify(arr);
        if (!ansMap.has(key)) {
          ansMap.set(key, arr)
        }
      })
    }
    return ansMap
  }, new Map())
  let ans  = Array.from(ansMap.values());
  console.log(ans);
}


function join(target, twoDList) {
  return twoDList.map(list => list.concat(target));
}
console.log(threeSum([-4,-2,1,-5,-4,-4,4,-2,0,4,0,-2,3,1,-5,0]))