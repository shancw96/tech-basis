function reduce(arr,target){
  let hash = {}
  let count = 0;//计算出现差为K的次数
  arr.forEach(item=>{
    if(hash[item-target]!== undefined) count+=1
    hash[item] = true;//不许要保存index，因为不需要返回具体index
  })
  co

}