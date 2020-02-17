const _createGetRequest = url => new Promise((resolve, reject) => {
    $.get(url, data => {
        resolve(data)
    })
})

function sendMessage(msg, kind) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { msg, kind }, res => {
            if (!!res) alert(res)
        })
    })
}



/**监控订单页面的网络请求 */
chrome.webRequest.onCompleted.addListener(details => {
    chrome.runtime.onConnect.addListener(port => {
        port.postMessage('networkComplete')
    })
}, { urls: ['*://buy.taobao.com/*', "https://buy.tmall.com/order/*"] }, [])
