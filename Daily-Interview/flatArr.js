/**
 *  
 *  已知如下数组：
    var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
    编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
 */
function flatArr(source,target){
  let clonedArr = target || []
  source.forEach(item=>{
    if(item instanceof Array){
      flatArr(item,clonedArr)
    }else{
      clonedArr.push(item)
    }
  })
  return clonedArr
}
function sortArr(arr){
  return [...new Set(arr)].sort((a,b)=>a-b)
}

var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
let result = flatArr(arr)
let result2 = sortArr(result)
