function maxSubArray(arr){
  let subSum = [arr[0]]
  return arr.filter((num,index)=>index<arr.length-1).reduce((ans,cur,index)=>{
    subSum[index+1] = Math.max(subSum[index]+arr[index+1],arr[index+1])
    ans = Math.max(subSum[index+1],ans)
    return ans
  },[arr[0]])
}
let ans = maxSubArray([1,2,3,4,5,6])