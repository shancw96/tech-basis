var cuttingRope = function(n,calculatedLen=Array(n+1).fill(0)) {
    if(n==2) return 1
    if(calculatedLen[n]!==0) return calculatedLen[n]
    for(let cutLen=1;cutLen<n;cutLen+=1){
        calculatedLen[n] = Math.max(calculatedLen[n],cutLen*cuttingRope(n-cutLen,calculatedLen),cutLen*(n-cutLen))
    }
    return calculatedLen[n]
};

console.log(cuttingRope(10))