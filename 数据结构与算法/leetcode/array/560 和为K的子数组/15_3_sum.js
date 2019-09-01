var threeSum = function (nums) {
  let ans = []
  //两层循环
  let sortedNums = nums.sort((a,b)=>!!(a>b))
  sortedNums.some((first,index)=>{
    if(first>0) return true
    let restNums = sortedNums.slice(index+1)
    if(restNums.length>1 && first !== sortedNums[index-1]){
      let curAns = getSumList(first,restNums)
      curAns.forEach(singleAns=>{
        ans.push(singleAns)
      })
    }

    ans
  })
};

function getSumList(first,restNums){
  let ans = []
  let second = 0;
  let third = restNums.length-1
  while(second<third){
    let sum = first + restNums[second] + restNums[third]
    if(sum==0) {
      ans.push([first,restNums[second],restNums[third]])
      while (second<third && restNums[second] == restNums[second+1]) second++; // 去重
      while (second<third && restNums[third] == restNums[third-1]) third--; // 去重
      second += 1
      third -= 1
    }
    if(sum<0) second +=1;
    if(sum>0) third -= 1;

    // return 
  }

  return ans
}

threeSum([-1, 0, 1, 2, -1, -4,5])