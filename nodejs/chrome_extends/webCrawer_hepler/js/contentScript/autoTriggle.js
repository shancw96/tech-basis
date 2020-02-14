
/**购物车页面由popup事件控制 */
function cartCountDown(deadTime) {
    console.log('start counting')
    //setTimeout 模拟DOMContentLoaded 效果，对content security policy 不熟悉导致
    setTimeout(() => {
        const checkBox = document.querySelector('div#J_SelectAll1.select-all.J_SelectAll')
        const checkout = document.querySelector('a#J_Go.submit-btn')
        //checkout 与 checkbox 全部匹配成功，代表为购物车页面
        if (!!checkout && !!checkBox) {
            checkBox.click()
            let timer = setInterval(() => {
                if (deadTime.getTime() <= new Date().getTime()) {
                    clearInterval(timer)
                    checkout.click()
                }
                console.log('Time left:' + (deadTime.getTime() - new Date().getTime()))
            }, 1)//5
        }
    }, 1000)
}
/**订单页面通过pageKind控制，每次刷新页面都会判断 */
function buyCountDown() {
    if (window.location.href.match(/([a-zA-Z]+\.)/g)[0] !== 'buy.') return
    console.log('进入订单页面')
    setTimeout(() => {
        let timer = setInterval(() => {
            if (document.querySelector('a.go-btn')) {
                console.log('订单页加载完毕，自动点击...')
                document.querySelector('a.go-btn').click()
                clearInterval(timer)
            } else {
                console.log('等待加载...')
            }
        }, 1)
    }, 1)
}
//监听设置事件
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.kind !== 'addTimer') return
        if (!!request.deadTime) {
            const deadTime = new Date(request.deadTime.replace(/-/g, "/"))
            //判断网页是否有效
            if (window.location.href.match(/([a-zA-Z]+\.)/g)[0] === 'cart.') {
                cartCountDown(deadTime)
                sendResponse({ farewell: "设置成功" });
            } else {
                sendResponse({ farewell: '无效的网页,请前往taobao购物车页面进行操作！' })
            }

        } else {
            sendResponse({ farewell: '请输入数据！！！' })
        }
    });
//进入新网页需要进行判断是否为订单页面
buyCountDown()