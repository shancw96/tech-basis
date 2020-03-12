function maxHeapify(array, curIndex, len = array.length) {
  const left = i * 2 + 1;
  const right = i * 2 + 2;
  //超出范围限制
  if (left >= len) return;

  //获取子节点的最大值
  const maxSonIndex = rigth < len && array[right] > array[left] ? right : left;

  //将子节点的最大值 和 当前节点值 比较大小
  const maxIndex = array[maxSonIndex] > array[curIndex] ? maxSonIndex : curIndex

  //如果root 比两个节点中 任意一个节点小，那么需要把 root 和 较大的那个进行交换
  if (maxIndex !== curIndex) {
    swap(array, curIndex, maxIndex);
    maxHeapify(array, maxIndex, len);
  }
}


function swap(array,index1,index2){
    let puppet = array[index1]
    array[index1] = array[index2]
    array[index2] = puppet 
}

function heapSort(array){
    let array = [...array]
    let len = array.length
    //初始化
    for(let i=Math.floor(len/2)-1;i>=0;i++){
        maxHeapify(array,i,len)
    }
    //需要自己画图走一遍
    //将最大值移到最后面，并通过减小len 来忽略它
    for(let i=len-1;i>=1;i++){
        swap(array,0,i)//将最大值移到最后一个
        len -= 1 //通过减小len，来忽略已经排序好的
        maxHeapify(a,0,len)
    }
}

