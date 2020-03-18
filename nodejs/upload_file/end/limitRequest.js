function createLimitPromise(limitNum, promiseList) {
  let resArr = [];
  let handling = 0;
  let resolvedNum = 0

  return new Promise(resolve => {
    const runTime = promiseList.length;
    for (let i = 0; i < runTime; i++) {
      run();
    }

    function run() {
      if (handling < limitNum && promiseList.length) {
        handling += 1;
        handle(promiseList.shift())
          .then(res => {
            resArr.push(res);
          }).catch(e=>{
              //ignore 
              console.log('catch error')
          })
          .finally(() => {
            handling -= 1;
            resolvedNum += 1
            console.log(`resolvedNum : ${resolvedNum}`)
            if (resolvedNum === runTime) resolve(resArr);
            run(promiseList, limitNum);
          });
      }
      
    }
    function handle(promise) {
      return new Promise((resolve, reject) => {
        promise.then(res => resolve(res)).catch(e => reject(e));
      });
    }
  });
}
