
//applicative-order: evaluate the arguments and then apply
//计算参数，然后在传递参数
function p(){
    console.log('recursion')
    p()
}   

function test(x,y){
    return x === 0 ? 0 : y
}

test(0,p())