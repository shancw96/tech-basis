var deleteNode_needPrev = function(head, val) {
    //找到当前的值
    //将前一个值cur与后一个值连接cur.next.next
    const dummyHead = new ListNode(null)
    dummyHead.next = head
    //判断第一个值
    if(head.val === val) return head.next
    //val 不是第一个值
    while(head && head.next){
        head.next.val === val ? head.next = head.next.next : head = head.next
    }
    return dummyHead.next
};

const deleteNode = (head,val)=>{
    //把当前节点的值，替换为后一个节点的值，并删除后一个节点，就不需要前节点
    const dummyHead = new ListNode(null)
    dummyHead.next = head
    while(head && head.next){
        if(head.val === val){
            head.val = head.next.val
            head.next = head.next.next//删除head.next
            return dummyHead.next
        }else{
            head = head.next
        }
    }
}