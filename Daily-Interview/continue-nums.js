/**
 * 第 110 题：编程题，请写一个函数，完成以下功能

输入 '1, 2, 3, 5, 7, 8, 10' 输出 '1~3, 5, 7~8, 10'
 */

function simplifyStr(str) {
  let arr = str.split(',')
  let result = arr.reduce((prev,cur,index,arr)=>{
    if(index>0){
      if(Number(cur) === Number(arr[index-1])+1){
        return prev+'~'+cur
      }else{
        return prev+','+cur
      }
    }else{
      return cur
    }
  },'')
  let filter = result.split(',').map(item=>{
    return item.replace(/(\d)(~.+)(~\d)/g,'$1$3')
  })
  console.log(filter)
}


simplifyStr('1,2,3,5,7,8,10')
