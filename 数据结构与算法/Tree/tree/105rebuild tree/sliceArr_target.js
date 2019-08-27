let helper = (target,inorderArr)=>{
  let index = inorderArr.findIndex(num=>num===target)
  index
  return [inorderArr.slice(0,index),inorderArr.slice(index+1)]
}

module.exports = helper