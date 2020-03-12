/**
 * @description 需要为主体函数添加depth 变量
 * @param {function} fn 默认参数为：1.skipedTab:后退距离 2.restArg 打印参数
 * @param {number} depth
 */
const logDepthBy = fn=>(depth,...restArg)=>{
    let skipedTab = Array(depth).fill('_').reduce((prev,_)=>prev+='\t',"")
    fn(skipedTab,restArg)
}


module.exports = logDepthBy




