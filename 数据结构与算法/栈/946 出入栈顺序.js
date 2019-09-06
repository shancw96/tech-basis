var validateStackSequences = function(pushed, popped) {
  // let temp = []
  return ! pushed.reduce((prev,cur)=>{
    prev.push(cur)
    while(popped.length !== 0 && prev[prev.length-1] == popped[0]){
      prev.pop() 
      popped.shift()
    }
    return prev
  },[]).length
};
// let ans = validateStackSequences([1,2,3,4,5],[4,3,5,1,2])
// console.log(ans)


