function inorderTravel(root,res){
    if(!root) return []
    inorderTravel(root.left,res)
    const curNode = root
    inorderTravel(root.right,res)
    return res
}
