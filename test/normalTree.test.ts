import { TreeNode, NormalTree } from "../dataStructure/normalTree";

describe('多叉树测试用例', () => {
  let globalTree: NormalTree
  beforeEach(() => {
    const mockTree: TreeNode = {
      key: 'root',
      label: 'r',
      children: [
        {
          key: 'r-c-1',
          label: '中国',
          children: [
            {
              key: 'rc1-c1',
              label: '中国江苏',
              children: []
            },
            {
              key: 'rc1-c2',
              label: '中国-浙江',
              children: [
                {
                  key: 'rc1c2-c1',
                  label: '浙江温州',
                  children: []
                }
              ]
            }
          ]
        },
        {
          key: 'r-c-2',
          label: '美国',
          children: [
            {
              key: 'rc2-c1',
              label: '美国纽约',
              children: []
            },
          ]
        },
        {
          key: 'r-c-3',
          label: '日本',
          children: []
        }
      ],
    }
    globalTree = new NormalTree(mockTree)
  })

  it('fuzzyQuery', () => {
    const keyword = '温州'
    const ans = globalTree.treeFilter(node => node.label.includes(keyword))
    console.log(ans);
  })
})