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
        console.log("cur handling:" + handling)
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
            console.log(`resolvedNum : ${resolvedNum}`);
            if(resolvedNum === runTime){
              resolve(resArr)
            }
            run();
          });
    }
    function handle(promise) {
      return new Promise((resolve, reject) => {
        promise.then(res => resolve(res)).catch(e => reject(e));
      });
    }
  });
}

//分片二进制数据
function sliceFile(file, chunkSize) {
  let chunkList = [];
  let start = 0;
  let end = chunkSize;
  while (true) {
    let curChunk = file.slice(start, end);
    if (!curChunk.size) break;
    chunkList.push(curChunk);
    start += chunkSize;
    end = start + chunkSize;
  }
  return chunkList;
}

//获取HTML 中的file
function getElFile(selector) {
  return document.querySelector(selector).files[0];
}

//chunkList => formdata list => PromiseList
function createChunkPromiseList(chunkList, name, TOKEN) {
  return chunkList
    .map((chunk, index) => {
      console.log(chunk);
      let formdata = new FormData();
      formdata.append("type", "upload");
      formdata.append("name", name);
      formdata.append("token", TOKEN);
      formdata.append("chunk", chunk);
      formdata.append("index", index);
      return formdata;
    })
    .map(formdata => {
      console.log(formdata.get("type"));
      return axios.post(UPLOAD_URL, formdata, axiosConfig);
    });
}
//提交数据
async function submitUpload(url, file) {
  const CHUNKSIZE = 1 * 1024 * 1024; // 2M
  const TOKEN = Date.now();
  //切割数组
  const chunkList = sliceFile(file, CHUNKSIZE);
  //创建formdata 并上传
  console.log(file.name);
  let promiseList = createChunkPromiseList(chunkList, file.name, TOKEN);
  //并发控制 上传
  await createLimitPromise(2, promiseList);

  //合并分片
  let mergeFormData = new FormData();
  mergeFormData.append("type", "merge");
  mergeFormData.append("token", TOKEN);
  mergeFormData.append("chunkCount", chunkList.length);
  mergeFormData.append("fileName", file.name);
  //结束后发送合并请
  let res = await axios.post(url, mergeFormData, axiosConfig);
  console.log(res);
}
//通过progressEvent 可以实现对上传进度的监听
const axiosConfig = {
  onUploadProgress: progressEvent => {
    // console.log(progressEvent);
  }
};
const UPLOAD_URL = "http://104.238.161.75:8081/upload";
// const UPLOAD_URL = "http://localhost:8081/upload";

document.querySelector("#upload_btn").addEventListener("click", () => {
  submitUpload(UPLOAD_URL, getElFile("input#test"));
});
