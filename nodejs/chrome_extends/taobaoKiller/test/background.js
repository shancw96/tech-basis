function sendMessage(msg, kind) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { msg, kind }, res => {
            if (!!res) alert(res)
        })
    })
}
setTimeout(() => {
    sendMessage('hello', '123')
}, 10 * 1000)
