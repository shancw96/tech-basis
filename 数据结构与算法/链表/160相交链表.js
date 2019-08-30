/**
 * 
 * 
 *  list1: $ $ $ - - - - 
 *  list2: & & & & - - - -
 *  
 *  遍历过程
 * 
 *  $ $ $ - - - - & & & &      - - - -  lengthA = listA+listB
 *  & & & & - - - - $ $ $      - - - -  lengthB = listB+listA
 * 
 * pA走的距离为 listA与listB 
 * pB也是一样
 */

var getIntersectionNode = function(headA, headB) {
  if(!headA || !headB) return null
  // let count = 0
  let pA = headA
  let pB = headB
  while(pA !== pB){
      pA = pA == null ?headB : pA.next
      pB = pB == null ?headA : pB.next//当两个都运行到null时候，pA == pB 跳出循环
  }
  return pA  //node||null
};