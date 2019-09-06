let createRandomArr = len =>{
  let newArr = []
  for(let i =0;i<len;i++){
    newArr.push(Math.random().toFixed(2)*100)
  }
  return newArr
}
module.exports = createRandomArr