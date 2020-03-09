var levelOrder = function(root) {
    if(!root) return null
    let stack = [root]
    let res = [[root]]
    while(stack.length){
        let childStack = []
        for(let i=0;i<stack.length;i++){
            if(stack[i].left) childStack.push(stack[i].left)
            if(stack[i].right) childStack.push(stack[i].right)
        }
        stack = childStack
        res.push(childStack)
    }
    return res
};

