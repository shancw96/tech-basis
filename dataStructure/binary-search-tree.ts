class TreeNode {
  left?: TreeNode;
  right?: TreeNode;
  val?: any;
  constructor(val: any) {
    this.val = val;
  }
}
export default class BinarySearchTree {

  size: number = 0;
  
  root?: TreeNode;
  // if input param is TreeNode we set it as root
  // if input param is other value we set it as root.val
  // otherwise we do nothing
  constructor(val?: unknown) {
    if (val) {
      this.root = new TreeNode(val);
      this.size += 1;
    }
  }
  
  get min() {
    return min(this.root)?.val;

    function min(root?: TreeNode): TreeNode | undefined {
      if (!root || !root.left) return root;
      return min(root.left);
    }
  }

  get max() {
    return max(this.root)?.val

    function max(root?: TreeNode): TreeNode | undefined {
      if (!root || !root.right) return root;
      return max(root.right)
    }
  }

  // insert
  public insert(val: number) {
    const node = new TreeNode(val);

    if (!this.root) this.root = node;
    else insertNode(this.root, node);

    this.size += 1;

    function insertNode(root: TreeNode, node: TreeNode) {
      // if node.val < root.val
      // travel left
      if (node.val < root.val) {
        // before travel, if left is null, insert
        if (!root.left) {
          root.left = node
        }
        // recursive travel left
        else {
          insertNode(root.left, node)
        }
      } else {
        if (!root.right) {
          root.right = node;
        } else {
          insertNode(root.right, node)
        }
      }
    }
  }
  // search
  public search(val: any){

    return searchNode(this.root);

    function searchNode(root?: TreeNode, parent?: TreeNode): [TreeNode?, TreeNode?] {
      if (!root || root.val === val) return [root, parent];
      else if (root?.val < val) return searchNode(root.right, root)
      else return searchNode(root.left, root)
    }
  }
  // delete
  // TODO: reBalance BST for better search performance when delete,
  public delete(val: any) {
    this.size -= 1 ;
    const [node, parent] = this.search(val);

    if (!node) return;
    // node child node -> leaf node
    else if (isLeafNode(node)) {
      // whether root
      if (node === this.root) {
        this.root = undefined
      } else {
        const childKey = getChildKeyFlag(node, parent as TreeNode);
        
        if (!childKey || !parent) throw new Error('should never happen');
        
        parent[childKey] = undefined
      }
    } 
    // full child node
    else if (isBothChildNode(node)) {

    } 
    // single child node
    else {

    }
    

    function isLeafNode(node: TreeNode) {
      return !node.left && !node.right
    }

    function isBothChildNode(node: TreeNode) {
      return !!node.left && !!node.right
    }

    function getChildKeyFlag(node: TreeNode, parent: TreeNode): 'left' | 'right' | '' {
      return parent.left?.val === node.val 
        ? 'left'
        : parent.right?.val === node.val
        ? 'right'
        : ''

    }
    
  }
  // 按层打印
  public logAll() {

    this.root && bfs(this.root);

    function bfs(tree: TreeNode) {
      let travelList = [tree];
      while(travelList.length) {
        console.log(travelList.map(node => node.val).join(',') + '\n');
        travelList = travelList.map(getChildByOrder).flat(1);
      }
    }

    function getChildByOrder(root: TreeNode) {
      return [root.left, root.right].filter(item => !!item) as TreeNode[];
    }
  }
}