var movingCount = function(m, n, k,row=0,col=0,visited=new Set()) {
    if(!isVaildPos(row,col,visited,m,n,k)) return 0
    //解决回溯后 pos 却没有回溯
    visited.add(`${row}:${col}`)
    return 1+movingCount(m, n, k,row+1,col,visited)+movingCount(m, n, k,row-1,col,visited)+movingCount(m, n, k,row,col+1,visited)+movingCount(m, n, k,row,col-1,visited)

    function isVaildPos(row,col,visited,m,n,k){
        return row>=0 && row<m && col >=0 &&col<n && getDigitSum(row) + getDigitSum(col) <=k && !visited.has(`${row}:${col}`)
    }
    function getDigitSum(num){
        let sum = 0
        while(num >0){
            sum += num%10
            num = Math.floor(num/10)
        }
        return sum
    }
};

console.log(movingCount(1,2,1))