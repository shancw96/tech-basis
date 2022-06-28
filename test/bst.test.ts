import BST from '../dataStructure/binary-search-tree';

describe('bst api', () => {
  let bstGlobal: BST
  beforeEach(() => {
    bstGlobal = new BST();
    bstGlobal?.insert(20);
    bstGlobal?.insert(5);
    bstGlobal?.insert(4);
    bstGlobal?.insert(30);
    bstGlobal?.insert(31);
    bstGlobal?.insert(21);
    bstGlobal?.insert(33);
    bstGlobal?.insert(34);
    bstGlobal?.insert(32);

  //              20
  //        5,           30
  // 4,             21,       31
  //                               33
  //                         32,          34
  })
  it('BST - initial - val', () => {
    const bst = new BST(1);
    expect(bst.root?.val).toBe(1)
  });
  it('BST - insert api', () => {
    bstGlobal.logAll();
    expect(bstGlobal.max).toBe(34);
    expect(bstGlobal.min).toBe(4);
  })
  it('BST - search api - exist', () => {
    const [result, parent] = bstGlobal.search(5);
    expect(result?.val).toBe(5);
    expect(parent?.val).toBe(20);
    const [result2, parent2] = bstGlobal.search(21);
    expect(result2?.val).toBe(21);
    expect(parent2?.val).toBe(30);
  })
  it('BST - search api - notExist', () => {
    const [result] = bstGlobal.search(999);
    expect(result?.val).toBeUndefined();
  })
  it('BST - property - size', () => {
    expect(bstGlobal.size).toBe(9)
  })
})
