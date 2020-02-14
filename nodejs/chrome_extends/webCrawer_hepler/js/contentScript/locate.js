/**
 * 获取当前节点的所有父节点
 * @param {HTMLDOM} node 节点
 * @param {Array} resArr 结果数组
 */
const getAllParentNode = (node, resArr = []) => node.tagName === 'BODY' ? resArr : getAllParentNode(node.parentNode, [node, ...resArr])
/**
 * 点击后获取cheerio 爬虫格式 当前节点定位
 * @param {HTML event} e 
 */
const LocateClickedDOM = e => {
    e.preventDefault()
    const nodeArr = getAllParentNode(e.target) //cur cur.par cur.par.par
    // nodeArr -> String  
    //$('最外层的parent clas id').children('次外层parent + class id').....children('cur .class #id')
    let res = nodeArr.reduce((prevString, curNode, index) => {
        /**String 类型**/
        //className_str 获取
        let className_str = ''
        curNode.classList.forEach(className => {
            className_str += `.${className}`
        })
        //拼装当前node str
        const curString = `${index === 0 ? '$' : '.children'}('${curNode.localName}${!!curNode.id ? '#' + curNode.id : ''}${className_str}')`
        return prevString += curString
    }, '')

    const tag = e.target.alt ? '图片描述：' + e.target.alt : e.target.innerHTML
    //输出
    //key
    console.log('当前节点-' + tag + '')
    //value
    console.log(res)
    return
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.kind !== 'locateDOM') return
    switch (request.locateDOM) {
        case 'shutdown':
            document.removeEventListener('click', LocateClickedDOM)
            sendResponse({ farewell: `${request.locateDOM} LocateClickedDOM` })
            break;
        case 'start':
            document.addEventListener('click', LocateClickedDOM)
            sendResponse({ farewell: `${request.locateDOM} LocateClickedDOM` })
            break
    }
})