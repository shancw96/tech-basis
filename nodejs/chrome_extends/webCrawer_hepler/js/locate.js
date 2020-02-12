function getAllParentNode(node,resArr = []){
    if(node.tagName === 'BODY'){
        return resArr
    }
    return getAllParentNode(node.parentNode,[node,...resArr])
}
document.addEventListener('click',e=>{
    e.preventDefault()
    const nodeArr = getAllParentNode(e.target) //cur cur.par cur.par.par
    
    // nodeArr -> String  $('最外层的parent clas id').children('次外层parent + class id').....children('cur .class #id')
    let res = nodeArr.reduce((prevString,curNode,index)=>{
    /**String 类型**/
        //className_str 获取
        let className_str = ''
        curNode.classList.forEach(className=>{
            className_str+=`.${className}`
        })
        //拼装当前node str
        const curString = `${index===0 ? '$':'.children'}('${curNode.localName}${!!curNode.id ? '#'+curNode.id:''}${className_str}')`
        return prevString += curString
    },'')
    const tag =  e.target.alt ? '图片描述：'+e.target.alt : e.target.innerHTML
    console.log('当前节点-'+tag +'')
    console.log(res)
    return 
})