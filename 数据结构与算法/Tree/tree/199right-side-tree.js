/**栈操作 */
var rightSideView = function(root) {
    if(root == null) return []
    let layer = [];
    let storeView = []
    layer.push(root);
    while(layer.length){
        let count = layer.length;
        while(count>0){
            count -=1;
            let cur = layer.shift();
            if(count == 0){
                storeView.push(cur.val)
            }
            if(cur.left){
                layer.push(cur.left)
            }
            if(cur.right){
                layer.push(cur.right)
            }
        }
    }
    return storeView
};

/**递归操作 **/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
    let res = []
    DFS(root,res)
    return res
};

function DFS(node,res,depth=0){
    if(node == null) return ;
    if(depth == res.length){
        
        res.push(node.val)
    }
    DFS(node.right,res,depth+1);
    DFS(node.left,res,depth+1);
}