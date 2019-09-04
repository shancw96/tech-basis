/**
 * @param {number[]} hand
 * @param {number} W
 * @return {boolean}
 */
var isNStraightHand = function (hand, W) {
  let dictionary = hand.reduce((prev, cur) => {
    prev[cur] = prev[cur] ? prev[cur] + 1 : 1
    return prev
  }, {})
  return isNStraigh(dictionary, W)
};
//遍历key
function isNStraigh(obj, w) {
  for (let key in obj) {
    while (obj[key]) {//如果obj[key]不只出现一次，那么再次遍历
      if (!hasStraight(key, obj, w)) return false
    }
  }
  return true
}
//输入一个key，这个函数用来判断当前key是否存在连续
function hasStraight(key, dictionary, w) {
  while (w > 0) {
    if (dictionary[key]) dictionary[key] -= 1
    else return false
    key = Number(key) + 1
    w -= 1
  }
  return true
}

let ans = isNStraightHand([1, 1, 2, 2, 3, 3], 3)
ans