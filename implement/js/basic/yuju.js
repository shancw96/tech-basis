
{
  console.log('--------------逻辑操作start----------')
  // 逻辑操作
  console.log(true && true) // -> true
  console.log(true || false) // -> true
}

{
  console.log('--------------boolean 自动转换  Boolean(xxx) start----------')
  // boolean 自动转换  Boolean(xxx)
  //  number
  console.log(!!0);//-> false
  console.log(!!NaN);// -> false
  //  string
  console.log(!!"");// -> false
  // 无意义2个
  console.log(!!undefined); // false
  console.log(!!null);// false
}

// ------ 语句 ------
//  for循环
// break
{
  console.log('--------------break start----------')
  for (let i = 0; i < 10; i++) {
    if (i === 5) {
      break;
    }
    console.log(i)
  }
}
// continue
{
  console.log('--------------continue start----------')
  for (let i = 0; i < 10; i++) {
    if (i === 5) {
      continue;
    }
    console.log(i)
  }
}
// while 循环
{
  console.log('--------------while start----------')
  let i = 1
  while (i < 10) {
    i++;
    console.log(i)
  }
}

// if 判断
{
  console.log('--------------if start----------')
  let i = 20;
  if (i < 10) {
    console.log(i)
  } else if (i > 10 && i < 20) {
    console.log('10-20', i)
  } else if (i > 30 && i < 40) {
    console.log('30-40', i)
  } else {
    console.log('else')
  }
}
// switch 判断

// function 函数
{
  console.log('--------------function  start----------')
  function addSugar(str) {
    return '加糖' + str;
  }
  
  function addChocolate(str) {
    return '加巧克力' + str;
  }
  function addYuanXing(str){
    return '圆形'+str
  }
  
  function cookCookie(str) {
    let temp1 = addYuanXing(str)
    let temp2 = addSugar(temp1);
    let temp3 = addChocolate(temp2);
    return temp3
  }
  
  
  let cookie1 = cookCookie('奥利奥');
  
  console.log(cookie1);
}

{
  console.log('--------------引用类型  start----------')
  // 引用类型
  // object
  let xiaoMing = {};
  xiaoMing.height = '175CM';
  xiaoMing.color = 'yellow';
  xiaoMing.hobby = '干饭';
  xiaoMing.weight = '100KG';

  console.log(xiaoMing) // {height: '175CM', color: 'yellow', hobby: '干饭', weight: '100KG'}

  // 引用类型赋值是地址赋值,修改其中一个，其他的也会改变
  let xiaoZhang = xiaoMing;
  xiaoZhang.height = '180CM';
  console.log(xiaoMing.height); // -> '180CM'
}

{
  console.log('--------------数组  start----------')
  let arr = [1,2,3,4,5];
  arr.push(6) // -> [1,2,3,4,5,6]
  arr.push(7) // -> [1,2,3,4,5,6,7]
  arr.pop(); // -> [1,2,3,4,5,6]
  console.log('forEach API-----')
  // forEach API 循环遍历

  // function logItem(str) {
  //   console.log(str);
  // }

  let logItem = str => {
    console.log(str);
  }
  arr.forEach(str => console.log(str)); // -> 1, 2, 3, 4, 5, 6
  arr.forEach(logItem); // -> 1, 2, 3, 4, 5, 6

  console.log('find API-----')
  // find 查找值
  let ans1 = arr.find(item => item === 5);
  console.log(ans1)//-> 5
  // findIndex 查找下标
  let ans2 = arr.findIndex(item => item === 5);
  console.log(ans2) // -> 下标为4

  // filter 过滤: 不会对原来的数组造成影响，可以理解为副本
  let ans3 = arr.filter(item => item % 2 === 0)
  console.log(ans3, arr);// [2, 4, 6] , [1, 2, 3, 4, 5, 6]
  // slice 切分（取下标范围内的值，左闭又开）：不会对原来的数组造成影响，可以理解为副本
  let ans4 = arr.slice(0, 4); // -> [1,2,3,4]
  console.log(ans4)
  // // splice 跳过
  // map：转换每一个值，具体怎么转换，需要自己定义   不会对原来的数组造成影响，可以理解为副本
  function plusOne(num) {
    return num + 1
  }
  let ans5 = arr.map(item => item + 1)
  console.log(ans5) // -> [2,3,4,5,6,7]
  let ans6 = arr.map(item => `蛋蛋-${item}`)
  console.log(ans6) // -> [蛋蛋-1, 蛋蛋-2, 蛋蛋-3,蛋蛋-4,蛋蛋-5,蛋蛋-6]
  // reduce： 聚合
  let ans7 = arr.reduce(
    (tempAns, item) => {
      return tempAns + item;
    },
    0
  )
  console.log(ans7) // 21
  let ans8 = arr.reduce(
    (tempAns, item) => {
      return  `${tempAns}-${item}`
    },
    'Initial'
  )
  console.log(ans8) // Initial-1-2-3-4-5-6
  
  // for of 

  for(let item of arr) {
    console.log(item);// 1, 2, 3, 4, 5, 6
  }
  for(let index in arr) {
    console.log(index);// 0, 1, 2, 3, 4, 5
  }
}


