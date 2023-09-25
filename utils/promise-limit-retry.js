const createMockHttpRequest = (mockDelayList) => {
  let mockDelay = mockDelayList.map((delay, index) => ({id: index, delay}))
  return mockDelay.map((delayInfo) => () => new Promise(resolve => {
    console.log('run: ', delayInfo.id, delayInfo.delay)
    setTimeout(() => {
      console.log('resolved: ------->', delayInfo.id, delayInfo.delay)
      resolve(delayInfo.id);
    }, delayInfo.delay)
  }))
}

//简化的type ： (limitNum,promiseList)=>Promise
function createLimitPromise(limitNum, promiseListRaw) {
  let resArr = [];
  let handling = 0;
  let resolvedNum = 0;
  let promiseList = [...promiseListRaw]
  let runTime =  promiseListRaw.length

  return new Promise(resolve => {
    //并发执行limitNum 次
    for (let i = 1; i <= limitNum; i++) {
      run();
    }

    function run() {
      if(!promiseList.length) return 
        handling += 1;
        handle(promiseList.shift())
          .then(res => {
            resArr.push(res);
          })
          .catch(e => {
            //ignore
            console.log("catch error");
          })
          .finally(() => {
            handling -= 1;
            resolvedNum += 1;
            if(resolvedNum === runTime){
              resolve(resArr)
            }
            run();
          });
    }
    function handle(requestFn) {
      return new Promise((resolve, reject) => {
        requestFn().then(res => resolve(res)).catch(e => reject(e));
      });
    }
  });
}

async function createLimitPromiseV2(size, tobeExecuteAsyncFnList, retryTime=3) {
  const innerRequests = tobeExecuteAsyncFnList.map(request => ({
    requestStatus: 'NOT_START', // PENDING RESOLVE REJECT
    success: false,
    executeCount: 0,
    request,
    response: null
  }))

  return new Promise(resolve => {
    //并发执行limitNum 次
    for (let i = 1; i <= size; i++) {
      run();
    }
    function run() {
      const requestItem = getNextRequest(innerRequests)
      if(!requestItem) return;

      doFetch(requestItem).then(() => {
        if(getProcessedRequestNum(innerRequests) === innerRequests.length) {
          resolve(innerRequests.map(item => item.response))
        }
        run()
      })
    }
  })


  //没有触发过请求 或者 重试小于3次
  function getNextRequest(innerRequests, retryTime = 3) {
    return innerRequests.find(request => {
      return isNotStart(request) || shouldRetry(request, retryTime)
    })
  }


  function getProcessedRequestNum(innerRequests) {
    return innerRequests.reduce((acc, cur) => {
      // REJECT && 超过重试次数
      const failed = cur.requestStatus === 'REJECT' && cur.executeCount >= retryTime
      // 成功
      const success = cur.requestStatus === 'RESOLVE'
      return acc + ((failed || success) ? 1 : 0)
    }, 0)
  }

    
  function shouldRetry(request) {
    return request.requestStatus === 'REJECT' && request.executeCount < retryTime
  }

  function isNotStart(request) {
    return request.requestStatus === 'NOT_START'
  }

  function doFetch(requestItem) {
    if (!requestItem) return Promise.resolve();

    requestItem.requestStatus = 'PENDING'
    return requestItem.request().then(res => {
      requestItem.response = res
      requestItem.success = true
      requestItem.requestStatus = 'RESOLVE'
    }).catch(e => {
      requestItem.success = false
      requestItem.response = e
      requestItem.requestStatus = 'REJECT'
      console.error(`async request failed, remain retry ${size - requestItem.executeCount}`)
      console.error(requestItem.request)
    }).finally(() => {
      requestItem.executeCount += 1
    })
  }
}

let retryTime = 0
const rejectItem = () => new Promise((resolve, reject) => {

  setTimeout(() => {
    retryTime += 1
    if (retryTime == 5) {
      resolve('success')
    } else {
      reject('fail')
    }
  }, 1000)
})

const httpRequestListV2 = createMockHttpRequest([100, 200, 2000, 1000, 500, 400])


createLimitPromiseV2(3, httpRequestListV2.concat(rejectItem)).then(res => {
  console.log(res)
}).finally(() => {
  console.log('trigger')
})
