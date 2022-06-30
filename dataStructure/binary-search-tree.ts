export class TreeNode {
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
    if (!this.root) return this.root;
    return BinarySearchTree.min(this.root).val
  }

  static min(treeNode: TreeNode, parent?: TreeNode): TreeNode & {parent?: TreeNode} {
    if (!treeNode.left) return {
      ...treeNode,
      parent
    };
    else return BinarySearchTree.min(treeNode.left, treeNode);
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
  public delete(val: any) {
    this.size -= 1 ;
    const [node, parent] = this.search(val);

    // special case1
    if (!node) return;
    // special case2
    else if (!parent) {
      this.root = undefined;
      this.size = 0
    }
    // node child node -> leaf node
    else if (isLeafNode(node)) {
      // whether root
      const childKey = getChildKeyFlag(node, parent as TreeNode);
      
      if (!childKey) throw new Error('should never happen');
      
      parent[childKey] = undefined
    } 
    // full child node
    else if (isBothChildNode(node)) {
      // find node sub min node
      const minNode = BinarySearchTree.min(node);
      // replace val
      node.val = minNode.val;
      // remove minNode
      const minNodeParent = minNode.parent as TreeNode;
      minNodeParent.left = undefined;
    } 
    // single child node
    else { 
      const childKey = getChildKeyFlag(node, parent as TreeNode);
      if (!childKey) throw new Error('should never happen');
      const nodeKey = node.left ? 'left' : 'right'
      parent[childKey] = node[nodeKey]
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
  // left root right
  public inOrderTravel(node?: TreeNode, travelFn: (node: TreeNode) => void = node => console.log(node.val)) {
    if (!node) return;
    this.inOrderTravel(node.left, travelFn)
    travelFn(node);
    this.inOrderTravel(node.right, travelFn)
  }
  // root left right
  public preOrderTravel(node?: TreeNode, travelFn: (node: TreeNode) => void = node => console.log(node.val)) {
    if (!node) return;
    travelFn(node);
    this.preOrderTravel(node.left, travelFn)
    this.preOrderTravel(node.right, travelFn)
  }

  // left right root
  public postOrderTravel(node?: TreeNode, travelFn: (node: TreeNode) => void = node => console.log(node.val)) {
    if (!node) return;
    this.postOrderTravel(node.left, travelFn)
    this.postOrderTravel(node.right, travelFn)
    travelFn(node);
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