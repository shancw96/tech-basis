const tree = {
  isChecked: false,
  name: 'Root',
  children: [
    {
      isChecked: false,
      name: 'A-1',
      children: [
        {
          name: 'A-1-1',
          isChecked: true,
          isLeaf: true
        },
        {
          name: 'A-1-2',
          isChecked: false,
          isLeaf: true
        },
        {
          name: 'A-1-3',
          isChecked: true,
          isLeaf: true
        }
      ]
    },
    {
      isChecked: true,
      name: 'B-1',
      children: [
        {
          name: 'B-1-1',
          isChecked: true,
          isLeaf: true
        },
        {
          name: 'B-1-2',
          isChecked: true,
          isLeaf: true
        },
        {
          name: 'B-1-3',
          isChecked: true,
          isLeaf: true
        }
      ]
    }
  ]
}


function dfs(root, res = []) {
  root.isLeaf && root.isChecked && res.push(root);
  root.children?.forEach(child => dfs(child, res))
  return res;
}

const res = dfs(tree)
debugger
console.log(res)