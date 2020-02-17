
/**购物车页面由popup事件控制 */
function cartCountDown(deadTimestamp) {
    console.log('start counting')
    const interval = 1
    RAF.setTimeout(() => {
        console.log('code in RAF setTimeout')
        const selectAll = document.querySelector('div#J_SelectAll1.select-all.J_SelectAll')
        const checkout = document.querySelector('a#J_Go.submit-btn')
        if (!!checkout && !!selectAll) {
            selectAll.click();
            RAF.clearTimeout()
            RAF.setInterval(() => {
                if (Date.now() >= deadTimestamp) {
                    checkout.click()
                    RAF.clearInterval()
                    RAF.clearTimeout()
                }
            }, interval)
        }
    }, 1000)
}
/**
 * 对network 的分析，筛选出主要的请求 A
 * 通过background监听订单页面的网络请求A，
 * 当页面成功获取，通过port传递信息给content 页面。
 * 之所以用port 是因为message API 通过background-> content 会报错，content 比background 后创建，
 * 所以在content页面创建一个port连接，连接background 
 *  */
function buyCountDown() {
    if (window.location.href.match(/([a-zA-Z]+\.)/g)[0] !== 'buy.') return
    console.log('进入订单页面')
    const port = chrome.runtime.connect({ name: "knockknock" });
    port.onMessage.addListener(function (msg) {
        RAF.setTimeout(() => {
            document.querySelector('a.go-btn').click()
            RAF.clearTimeout()
        }, 250)
    })
}

/**
 * 使用本地时间 + requestAnimationFrame 减小误差
 * 需要用户自己确保本地时间的准确性，推荐在开始秒杀前 同步一下时间
 */
function startCount(request, response) {
    if (!request.msg.deadTime) response('请输入数据')
    //网页是否有效
    if (window.location.href.match(/([a-zA-Z]+\.)/g)[0] === 'cart.') {
        const deadTime = new Date(request.msg.deadTime.replace(/-/g, "/"))
        console.log('已开始计时')
        cartCountDown(deadTime)
    } else {
        response('无效的网址')
    }
}


chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    switch (req.kind) {
        case 'startCount':
            startCount(req, sendResponse)
            break;
    }
})

buyCountDown()

