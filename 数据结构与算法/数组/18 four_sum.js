function calculateN(nums,target = 0,N=4){
  nums.sort((a,b)=>a-b)
  return  recursion(nums,target,N)
}

function recursion(nums,target,N){
  if(N==2) return twoSum(nums,target)
  N = N-1
  let ans = []
  nums.forEach((item,index)=>{
    if(!(index>0 && nums[index] === nums[index-1])){
      let prev_arr = recursion(nums.slice(index+1),target-item,N)
      prev_arr.length ?  ans = [...ans,...prev_arr.map(arr=>[item,...arr])] : ''
    }
  })
  return ans
}

function twoSum(nums,target){
  const ans = []
  let L = 0;
  let R = nums.length-1
  while(L<R){
    let sum =nums[L] + nums[R]
    if (sum === target) {
      ans.push([nums[L], nums[R]])
      while (L < R && nums[R] == nums[R - 1]) R -= 1 //重复值，不需要重复计算
      while (L < R && nums[L] == nums[L + 1]) L += 1
      R -= 1
      L += 1
    } else sum > target ? R -= 1 : L += 1
  }
  return ans
}

let ans = calculateN([1, 0, -1, 0, -2, 2])
console.log(ans.length)