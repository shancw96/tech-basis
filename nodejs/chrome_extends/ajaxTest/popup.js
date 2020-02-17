const bg = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', () => {
    const buttonBox = document.querySelector('#test')
    const inputBox = document.querySelector('input')
    buttonBox.addEventListener('click', e => {
        bg.sendMessage({ deadTime: inputBox.value }, 'startCount')
    })
})

