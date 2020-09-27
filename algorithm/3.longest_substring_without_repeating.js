/**
 * @description 2020/9/27
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(str) {
  // let startPointer = 0
  let endPointer = 0
  let curSubStr = new Map()
  let maxSubLen = 0
  while(endPointer !== str.length) {
      if(isSubStrHasChar(endPointer)) {
          // 比较当前滑动窗口的大小和之前的最大值
          maxSubLen = Math.max(maxSubLen, curSubStr.size)
          // 更新滑动窗口
          // curSubStr.set(getChar(endPointer), endPointer)
          // 1. 删除重复的字符之前的字符
          const repeatCharIndex = curSubStr.get(getChar(endPointer))
          removeCharFromMap(repeatCharIndex, curSubStr)
          // 2. 更新重复的字符的位置
          curSubStr.set(getChar(endPointer), endPointer)
      }else {
        curSubStr.set(getChar(endPointer), endPointer)
      }
      endPointer += 1
  }
  return Math.max(curSubStr.size, maxSubLen)
      
  function isSubStrHasChar(endPointer) {
      return curSubStr.has(str[endPointer])
  }
  
  function removeCharFromMap(maxIndex, targetMap) {
      targetMap.forEach((charIndex, key) => charIndex <= maxIndex ? targetMap.delete(key): '')
  }
  function getChar(index) {
    return str[index]
  }
};

const cases = [
  'aab'
]

cases.forEach(lengthOfLongestSubstring)