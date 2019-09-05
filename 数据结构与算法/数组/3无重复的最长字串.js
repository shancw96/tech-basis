var lengthOfLongestSubstring = function (s) {
  if (!s.length || s.length == 1) return s.length
  let ans = 0;
  let hash = {}
  let subLen = [1]
  hash[s[0]] = true

  for (let i = 0; i < s.length - 1; i++) {
    //移动窗口
    if (hash[s[i + 1]]) {
      Object.keys(hash).some(key => {
        if (key == s[i + 1]) return true
        delete hash[key]
      })
      delete hash[s[i + 1]]
      hash[s[i + 1]] = true//换位置，便于下一次遍历删除重复
      subLen[i + 1] = Object.keys(hash).length
    } else {
      hash[s[i + 1]] = true
      subLen[i + 1] = subLen[i] + 1
    }
    //主体，当时想法使用bottom-up
    ans = Math.max(ans, subLen[i + 1])
  }
  return ans
};

let ans = lengthOfLongestSubstring('qwfdved')