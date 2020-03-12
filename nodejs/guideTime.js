const readLine = require("readline-sync");

const maxTime = {
  algorithm: 0.75,
  interview: 0.5
};

const time = readLine.question(`\x1b[35m你准备专注多久的时间？ （单位为h)\x1b[0m`); //typeof time === string

const [algorithm, interview, sourceLearn, reading] = planingTime(time, maxTime);

outputStr("算法", algorithm);
outputStr("面试知识点", interview);
outputStr("源码学习", sourceLearn);
outputStr("阅读", reading);

function planingTime(time_str, maxTime) {
  const totalHour = formatTimeStr(time_str);
  return planCore(totalHour);

  function formatTimeStr(str) {
    return Number(str.split('h')[0] ||str);
  }

  function planCore(h) {
    //不足 算法和面试
    if (h < maxTime.algorithm + maxTime.interview)
      return Object.keys(maxTime).map(key => maxTime[key] * h);

    let resArr = [];
    let restTime = h - 1.25;
    //满足了算法和面试
    resArr.push(maxTime.algorithm, maxTime.interview);
    //源码和阅读 2选1
    return restTime > 4
      ? [...resArr, restTime - 1, 1]
      : restTime > 1
      ? [...resArr, restTime]
      : [...resArr, , restTime];
  }
}

function outputStr(key, value) {
    if (!value) return;
    console.log(`\x1b[34m${key}:\x1b[0m${formatTime(value)}`)

    function formatTime(h){
        return h >= 1 ? `${Math.floor(h)}h ${(h-Math.floor(h))*60}m` : `${h*60}m`
    }
}


