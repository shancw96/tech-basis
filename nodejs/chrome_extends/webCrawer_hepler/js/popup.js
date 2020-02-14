
document.addEventListener('DOMContentLoaded', () => {
    const buttonBox = document.querySelector('#test')
    const inputBox = document.querySelector('input')
    buttonBox.addEventListener('click', e => {
        sendMsg(inputBox.value)
    })
})
function sendMsg(time) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { deadTime: time, kind: 'addTimer' }, function (response) {
            alert(response.farewell)
        });
    });
}
