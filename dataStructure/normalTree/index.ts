export interface TreeNode {
  key: string;
  label: string;
  children: TreeNode[];
}

export class NormalTree {
  root: TreeNode | null = null
  constructor(root?: TreeNode) {
    if (root) {
      this.root = root;
    }
  }

  add(label: string, parent?: TreeNode) {

    // // parent.children.push(child);

    // return 
  }

  search(parent: TreeNode, matchFn = (target: TreeNode, node: TreeNode) => target.key === node.key) {
    
    return !this.root ? undefined : travel(this.root);

    function travel(root: TreeNode): TreeNode | undefined {
      if (matchFn(parent, root)) return root;
      
      for(let child of root?.children) {
        const ans = travel(child);
        if (ans) return ans;
      }
    }
  }
  
  // 模糊查询所有包含了keyword 的 节点，按照树状结构返回 
  treeFilter(matchFn: (node: TreeNode) => boolean): TreeNode | undefined {

    return this.root ? travel(this.root) : undefined
    
    function travel(root: TreeNode): TreeNode | undefined {
      const children = root?.children.map(child => travel(child)).filter(child => !!child) as TreeNode[];
      return matchFn(root) || children.length ? {...root, children} : undefined
    }
  }
}