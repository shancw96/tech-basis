const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function Promise() {
    //state 有三个状态， pending fulfilled rejected
    let state = PENDING;

    //保存value 或者error，当状态改变为fulfilled 或者 rejected 时候
    let value = null;

    //保存 成功&失败 方法 ：通过.then 或者.done 绑定
    let handlers = [];
}
