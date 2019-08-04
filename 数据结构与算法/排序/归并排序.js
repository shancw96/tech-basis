//1.分
//  递归拆分，二分法
//2，治
  //双指针

function mergeSort(arr){
  sort(arr);
  console.log(arr)
}
function sort(arr,left=0,right=arr.length-1){
    if(left>=right) return ;
    let mid = Math.floor((left+right)/2)
    sort(arr,left,mid)// 每次入栈记录了当前的左右指针
    sort(arr,mid+1,right)
    //治（当前记录的left，right，进行排序，并存放在temp中）
    merge(arr,left,mid,right)
    console.log(arr)
}

function merge(a,low,mid,high,aux=[]){

  let i = low;    // 游标i,开始时指向待排序序列中左半边的头元素 
  let j = mid+1;  // 游标j,开始时指向待排序序列中右半边的头元素 
  for(let k=low;k<=high;k++){
    aux[k] = a[k]; // 将待排序序列a[low...high]拷贝到辅助数组的相同位置     
  }
  for(let k=low;k<=high;k++){
    if(i>mid){
      a[k] = aux[j++]; // 左半边用尽
    }else if(j>high){
      a[k] = aux[i++]; // 右半边用尽
    }else if(aux[j]<aux[i]){
      a[k] = aux[j++]; // 右半边当前元素小于左半边当前元素， 取右半边元素
    }else {
      a[k] = aux[i++]; // 右半边当前元素大于等于左半边当前元素，取左半边元素       
    }
  }
}


mergeSort([5,1,123,23,9,1,6])