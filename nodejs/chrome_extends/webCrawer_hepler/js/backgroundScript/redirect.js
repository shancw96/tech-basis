const checkFile = url => Boolean(url.match(/\.(jpg|png|gif|webp)$/g))
const checkHost = url => Boolean(url.match(/(tui.taobao.com)/g))
const isUseless = (url, ...judgementList) => judgementList.some(fn => fn(url))

// const myGetAjax = url => new Promise((resolve, reject) => {
//     const request = new XMLHttpRequest();
//     request.onreadystatechange = () => request.status === 200 ? resolve(request.responseText) : reject(request.status)
//     request.open('get', url)
//     request.send()
// })

const sendMsg = (msg, kind = "timestamp") => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { msg, kind }, function (response) {
            //background 没有提示，这个代码没用
            alert(response)
        });
    });
}

// chrome.webRequest.onBeforeRequest.addListener(
//     detail => isUseless(detail.url, checkFile, checkHost) ? { cancel: true } : { cancel: false },
//     { urls: ["<all_urls>"] },
//     ["blocking"]
// )

//content-> bg
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    $.ajax({
        url: 'http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp',
        type: 'GET',
    }).then(function () {
        // 将正确信息返回content_script
        sendResponse({ 'status': 200 });
    }, function () {
        // 将错误信息返回content_script
        sendResponse({ 'status': 500 });
    });
})




