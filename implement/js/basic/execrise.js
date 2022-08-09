const { isFunctionDeclaration } = require("typescript");

// 
2 ^ 3
function sum(a, b, c, d) {
  return a + b + c + d
}

// 求2 3和

let temp = sum(2, 3);
console.log(temp)

function positiveSum(arr) {
  let sum = 0
  for (let item of arr) {
    if (item > 0) {
      sum = sum + item;
    }
  }
  return sum
}
let temp3 = positiveSum([1, -4, 7, 12]);
console.log(temp3)


{
  // 生成一个新的数组不包含重复的，比如：
  const arr = [1, 2, 3, 2, 2, 5, 5, 7, 10, 15];
  // ans = [1,2,3,5,7,10,15] 多余的2,5被过滤掉了


  // 定义新数组，用来存储不重复值
  let sum = []
  // 循环遍历旧数组
  for (item of arr) {
    // 查找sum 新数组中，是否已经存储过item，比如 sum = [1,2,3]，item = 2， 判断 sum中是否已经有2
    let findItem = sum.find(i => i === item);
    // 如果没有找到说明是新的值
    if (!findItem) {
      // 把它加入到列表中
      sum.push(item);
    }
  }

  console.log(sum)
}

{
    // 生成一个新的数组不包含重复的，比如：
    const arr = [1, 2, 3, 2, 2, 5, 5, 7, 10, 15];
    // ans = [1,2,3,5,7,10,15] 多余的2,5被过滤掉了

    const ans = arr.reduce((result, item) => {
      let findItem = result.find(i => i === item);
      if (!findItem) {
        result.push(item);
      }
      return result
    }, [])
  }
    console.log(ans);
