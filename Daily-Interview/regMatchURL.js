/**
 * 第 105 题：编程题

url有三种情况

https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33
https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800&local_province_id=33
https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33
匹配elective后的数字输出（写出你认为的最优解法）:

[] || ['800'] || ['800','700']
 */

 let urlArr = [
   'https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33',
   'https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800&local_province_id=33',
   'https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33'
  ]

function getParams(myURL,target){
  let reg = new RegExp("(^|&)" + target + "=([^&]*)(&|$)");
  return [myURL.match(reg)[2]]
}
let params = getParams(urlArr[2],'elective')
console.log(params)

/**
 * [^&] 匹配单个非&字符  [^&]* 匹配所有非&字符
 */