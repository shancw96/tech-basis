/**
 * 
给定一个二叉树（具有根结点 root）， 一个目标结点 target ，和一个整数值 K 。

返回到目标结点 target 距离为 K 的所有结点的值的列表。 答案可以以任何顺序返回。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/all-nodes-distance-k-in-binary-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} K
 * @return {number[]}
 */
var distanceK = function(root, target, K) {
    //初始化图
    let graph = [];
    let marked = [];
    
    for(let i=0;i<1000;i++){
        graph[i] = []
        marked[i] = false
        
    };
    build_graph(null,root,graph)
    return bfs(target.val,K,graph,marked)
    // console.log(res)
    
};

function build_graph(parent,child,graph){
    if(!child) return;
    if(parent){
        graph[parent.val].push(child.val);
        graph[child.val].push(parent.val)
    }
    build_graph(child,child.left,graph)
    build_graph(child,child.right,graph)
}

 function bfs(v,target_depth,graph,marked){
    let queue = [];
    let cur_depth = 0;//当前深度
    let res = []//结果
    // console.log(v)
    queue.push(v);
    marked[v] = true;
     while(queue.length && cur_depth<=target_depth){
         let count = queue.length;
         //遍历当前层
         while(count){
             let cur = queue.shift();
             // console.log('当前深度：'+cur_depth+'==='+'当前节点'+cur+'==='+marked[cur])
             marked[cur] = true
             count -=1;
             if(cur_depth==target_depth) res.push(cur)
                 
             for(let w of graph[cur]){
                 
                 if(marked[w] == true)continue
                 queue.push(w)               
             }

         }
         
         //进入下一层
         cur_depth +=1
     }
    return res
}