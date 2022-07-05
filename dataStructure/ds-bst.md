---
title: binary-search-tree
categories: [算法]
tags: [tree, binary-tree, binary-search-tree, AVL-tree, DFS, BFS]
toc: true
date: 2022/7/4
---

这篇文章介绍了数据结构 二叉搜索树及常用 api 的实现

## Table of Content

## 介绍

二叉搜索树又称为排序二叉树/有序二叉树。二叉搜索树的每个节点大于左侧子节点，并且小于右侧子节点

> [wikipedia](https://en.wikipedia.org/wiki/Binary_search_tree): In computer science, a binary search tree (BST), also called an ordered or sorted binary tree, is a rooted binary tree data structure with the key of each internal node being greater than all the keys in the respective node's left subtree and less than the ones in its right subtree. The time complexity of operations on the binary search tree is directly proportional to the height of the tree.

## 实现

### 数据结构

BST 的数据结构可以拆分成两部分，TreeNode 描述 Node 节点，BinarySearchTree 描述最终的数据结构

#### TreeNode

简化的 TreeNode 格式如下，left 表示左子节点，right 表示右子节点。我们在这篇文章中，使用 val 来表示 TreeNode 的存储值。
这棵树 val 为数值型，方便演示常用 api 操作。

```typescript
export class TreeNode {
  left?: TreeNode;
  right?: TreeNode;
  val?: any;
  constructor(val: any) {
    this.val = val;
  }
}
```

#### BinarySearchTree

二叉搜索树，拥有 root 变量表示根节点，拥有 min getter 表示当前的最小值，拥有 max getter 表示当前的最大值

常用的 API 有：

- insert
- search
- delete

```typescript
class BinarySearchTree {
  root?: TreeNode;
  constructor() {}
  insert(val: number) {}
  search(val: number) {}
  delete(val: number) {}
}
```

### API - insert

二叉搜索树的插入，需要遵循二叉搜索树的规范 `left.val < root.val < right.val`，插入新值后，依旧是一颗 BST

我们约定 root 为当前访问的节点，node 为需要插入的节点

- 如果 node.val < root.val

  1. root 为最小值：将 node 作为 root 的最小值
  2. root 非最小值，访问 root.left，递归进行上述操作

- 如果 node.val > root.val
  1. root 为最大值：将 node 作为 root 的最大值
  2. root 非最大值：访问 root.right，递归进行上述操作

```typescript
function insertNode(root: TreeNode, node: TreeNode) {
  // if node.val < root.val
  // travel left
  if (node.val < root.val) {
    // before travel, if left is null, insert
    if (!root.left) {
      root.left = node;
    }
    // recursive travel left
    else {
      insertNode(root.left, node);
    }
  } else {
    if (!root.right) {
      root.right = node;
    } else {
      insertNode(root.right, node);
    }
  }
}
```

### API - search

二叉搜索树的搜索，借助其特性，可以很简单直观的实现。
传入一个值，我们约定他为 target，

1. 如果 target 和 root.val 相同，搜索结束。
2. 如果 target 比当前 root 小，那么我们去 root 的左侧子树进行相同的比较操作。
3. 如果 target 比当前 root 大，那么去 root 的右侧树进行相同的比较操作
4. 递归的去进行上述操作，直到找出最终结果

```typescript
function searchNode(
  root?: TreeNode,
  parent?: TreeNode
): [TreeNode?, TreeNode?] {
  if (!root || root.val === val) return [root, parent];
  else if (root?.val < val) return searchNode(root.right, root);
  else return searchNode(root.left, root);
}
```

> tips: 此处返回了一个数组，表示当前搜索的结果 node 和它对应的 parent

#### API - 删除

二叉树的删除操作，需要根据被删除节点的状态进行区分

1. 被删除节点是没有 children (leaf node): 直接将其 parent 的对应 child（left/right）指针置空
2. 被删除节点只有一个 child: 将 parent 和 child 进行连接
3. 被删除的节点有两个 child：
   1. 找到 Node 右子树 的最小值，将其 val 设置为当前值，并删掉右子树的最小值，我们称之为 minNode，minNode 的删除需要考虑如下两种场景
      A1: minNode 如果是 leaf Node，那么直接删除
      A2: minNode 如果存在 right child, 那么参考第二点，将其 parent 和 其 child 进行连接
   2. 或者 找到 Node 左子树 的最大值，将其 val 设置为当前值，并删掉左子树的最大值

```typescript

  delete(val: any) {
    const [node, parent] = this.search(val);

    // special case1
    if (!node) return;
    // special case2
    else if (!parent) {
      this.root = undefined;
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
      // find min node in right sub tree
      const minNode = BinarySearchTree.min(node.right as TreeNode);
      // replace val
      node.val = minNode.val;
      // remove minNode in right sub tree
      const minNodeParent = minNode.parent as TreeNode;
      if (minNodeParent) {
        minNodeParent.left = undefined;
      }
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
```
