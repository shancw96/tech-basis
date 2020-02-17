const sendMsg = (msg, kind) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { msg, kind }, function (response) {
            if (!!response) alert(response.farewell)
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const buttonBox = document.querySelector('#test')
    const inputBox = document.querySelector('input')
    buttonBox.addEventListener('click', e => {
        sendMsg(inputBox.value, "addTimer")
    })
})