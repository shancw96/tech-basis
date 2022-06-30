//解决 promise.all中只要有一个出错就直接退出的问题

//resolve 将来的结果，.then获取
const getAllCorrectPromises = promiseArr =>
    new Promise((resolve, reject) => {
        let resolvedArr = [];
        let finishedNum = 0;
        //对传入的promise 的将来结果进行操作
        for (let p of promiseArr) {
            //p如果正确执行
            p.then(res => {
                resolvedArr.push(res);
            })
                .catch(e => {
                    //忽略错误
                    console.log(`catch error in promise Array :\n`);
                    console.log(e);
                })
                .finally(_ => {
                    ++finishedNum === promiseArr.length ? resolve(resolvedArr) : "";
                });
        }
    });

const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("promise 1");
    }, 100);
});
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("promise 2");
    }, 100);
});
const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("promise 3");
    }, 100);
});

getAllCorrectPromises([promise1, promise2, promise3]).then(res => {
    console.log(res);
});
