let createRandom = require('./common')

let arr_ori = createRandom(200000)

let res = mergeSort(arr_ori)
console.log(res)

function mergeSort(arr){
  let prev = Date.now()
  let copy = arr.map(item=>item)
  sperateArr(copy)
  let now = Date.now()
  console.log('it cost'+(now-prev));
  return copy
  
}


function sperateArr(arr,left=0,right=arr.length-1){

  if(left>=right) return;
  let mid =Math.floor((left+right)/2)
  sperateArr(arr,left,mid);//当前层的状态是固定的，不要要去想第一个递归式结束之后再去执行第二个。而是同步去想。因为压入执行栈的时候，当前的状态已经全部锁定
  sperateArr(arr,mid+1,right);
  merge(arr,left,mid,right);//左右指针怎么定义？？？？
  
}

function merge(arr,left,mid,right){
  let L_pointer = left;
  let R_pointer = mid+1;
  let aux = []
  for(let k=left;k<=right;k++){
    aux[k] = arr[k]
  }
  for(let k=left;k<=right;k++){
    if(L_pointer>mid){
      arr[k] = aux[R_pointer++] 
    }else if(R_pointer>right){
      arr[k] = aux[L_pointer++] 
    }else{//没有超过
      if(aux[L_pointer]<aux[R_pointer]){
        arr[k] = aux[L_pointer++] 
      }else{
        arr[k] =aux[R_pointer++]
      }
    }
  }
}