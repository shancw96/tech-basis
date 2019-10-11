function mergeSort(arr,left=0,right = arr.length-1,temp = []){
  
  if(left<right){
    let mid = parseInt((left + right)/2)
    mergeSort(arr,left,mid,temp )//左侧排序
    mergeSort(arr,mid+1,right,temp)
    merge(arr,left,mid,right,temp)
  }
  return arr
}
function merge(arr,left,mid,right,temp){
  //合并两个数组
  let point_l = left
  let point_r = mid + 1
  let t = 0
  while(point_l <= mid && point_l <= right){
    if(arr[point_l] > arr[point_r]) temp[t++] = arr[point_r++]
    else temp[t++] = arr[point_l++]
  }
  //左侧没有执行完毕
  while(point_l <= mid) {
    temp[t++] = arr[point_l++]
  }
  while(point_r<=right){
    temp[t++] = arr[point_r++]
  }

  t = 0
  //将temp 全部拷贝到原数组
  while(left<=right){
    arr[left++] = temp[t++]
  }
}
