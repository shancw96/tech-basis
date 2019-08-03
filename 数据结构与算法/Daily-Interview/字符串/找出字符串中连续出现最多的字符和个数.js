// 'abcaakjbb' => {'a':2,'b':2}
// 'abbkejsbcccwqaa' => {'c':3}

function findMost(s){
  let arr = s.match(/([a-z])\1+/g)||[]
  if(!arr.length){
     return s.split('').reduce((prev,cur)=>{
      if(cur === undefined) return 
      prev[cur] = 1
      return prev
     },{})
  }
  let maxVal = 1;
  arr.forEach(item=>{
    item.length > maxVal ? maxVal = item.length :''
  })
  return arr.reduce((prev,cur)=>{
    cur.length === maxVal ? prev[cur[0]]=maxVal :''
    return prev
  },{})
}
console.log(findMost('abbkejsbcccwqaa'))