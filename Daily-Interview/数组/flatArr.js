/**
 *  
 *  已知如下数组：
    var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
    编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
 */
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
function flatArr(arr,target = []){
   // let target = []//这里target可不可以写成闭包的私有变量？ 
   arr.forEach(item=>{
      if(item instanceof Array){
         flatArr(item,target)//target 只有一个，当前递归层的target被修改，最外层的也会发生变化
      }else{
         target.push(item)
      }
   })
   return sortedArr(target)
}
function sortedArr(arr){
   return [...new Set(arr)].sort((a,b)=>a-b)
}
