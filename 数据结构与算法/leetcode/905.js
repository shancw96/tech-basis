var sortArrayByParity = function(A) {
    return A.reduce((sortedArr,curNum)=>{
        return isOdd(curNum) ? [...sortedArr,curNum] : [curNum,...sortedArr]
    },[])
};

function isOdd(num){
    return num%2 === 1
}

console.log(sortArrayByParity([]))