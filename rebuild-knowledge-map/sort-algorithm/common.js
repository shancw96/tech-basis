let createRandomArr = len =>{
  let newArr = []
  for(let i =0;i<len;i++){
    newArr.push((Math.random()*100).toFixed(2))
  }
  return newArr
}
module.exports = createRandomArr