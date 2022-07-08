// @ts-nocheck
export function getAllSubStr(textList: string[]) {
  if (textList.length === 0) return [];
  let subList = getAllSubStr(textList.slice(1));
  return join(textList[0], subList).concat(subList)
}

function join(a: any, list: any[]): any[] {
  return [a, list.map(item => `${a} ${item}`)].flat(1);
}

console.log(getAllSubStr(['a', 'b', 'c', 'd']))