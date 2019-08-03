/**
 * 第 113 题：编程题，根据以下要求，写一个数组去重函数（蘑菇街）

如传入的数组元素为[123, "meili", "123", "mogu", 123]，则输出：[123, "meili", "123", "mogu"]

如传入的数组元素为[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]，则输出：[123, [1, 2, 3], [1, "2", 3], "meili"]

如传入的数组元素为[123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]，则输出：[123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]
 */

//  function uniqueArr(arr){
//    let mySet = new Set()
//     //1.重排数组里面的obj
//     //2。使用set方法存储
//     reSortObjInArr(arr).forEach(item=>{
//       mySet.add(item)
//     })
    
//  }

let testSet = new Set();
let objA = {a:9527}
let arrA = [{a:9527},{a:9527}]
arrA.forEach(item=>{
  testSet.add(item)
})
console.log(testSet.size)
