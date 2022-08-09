function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr
  const mid = arr.length / 2
  return sort(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid, arr.length)))
}

function sort(l: number[], r: number[]): number[] {
  let lP = 0;
  let rP = 0;
  let ans = []
  while(lP< l.length && rP < r.length) {
    ans.push(l[lP] < r[rP] ? l[lP++] : r[rP++])
  } 
  if (lP < l.length) {
    ans = ans.concat(l.slice(lP))
  }
  if (rP < r.length) {
    ans = ans.concat(r.slice(rP))
  }
  return ans
}

console.log(mergeSort([30, 2, 40, 4, 70, 12,44,50, 13]))