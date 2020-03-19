function longestPalindrome(s){
    //维护一个栈/表 存储已经入栈的char
    let toBeMatchdMap = new Map()
    //维护一个 number 表示已匹配的字符
    let matchedNum = 0
    //loop 0 to s.length-1
    for(let i =0;i<s.length;i++){
        const curChar = s[i]
        //当前char 在栈中是否已经存在 
        if(toBeMatchdMap.has(curChar) ){
            toBeMatchdMap.delete(curChar)
            matchedNum += 2
        }else{
            toBeMatchdMap.set(curChar,true)
        }
        //是：删除栈中的char ，记为已匹配字符
        //否：将char 加入栈中
    }
    if(toBeMatchdMap.size ) matchedNum+=1
    //如果栈的剩余长度不为0 则选取一个作为回文串的中间char
    return matchedNum
}

console.log(longestPalindrome("abccccdd"))