const board = [
    ["A","B","C","E"],
    ["S","F","E","S"],
    ["A","D","E","E"]
]

const word ="ABCESEEEFS"
console.log(exist(board, word))

function exist(board, word) {

    curPosList = findTargetPosList(board, word[0])
    return curPosList.findIndex(pos=>{
        // console.log(pos)
        let res = isExist(board,word,pos)
        // console.log(res)
        return res
    }) !== -1

    //使用isExist 是为了 lock 在重新开始的时候会执行重置
    function isExist(board, word, pos,lock = {}){
        // lock[`${pos.row}:${pos.col}`] = true
        lock = {...lock,[`${pos.row}:${pos.col}`]:true}
        if(word.length === 1) return true
        const nextPosList = getNextCharPosList(board, word, pos,lock).filter(isNotEmpty)
        // console.log(nextPosList)
        // console.log(nextPosList)/
        if(!nextPosList.length) return false
        return nextPosList.findIndex(pos=>isExist(board,word.slice(1),pos,lock)) !== -1
    }
};



//nextCharPosList 进行获取下一个字符位置的可能性 如果列表为空，则不存在可能性,如果存在列表，则重复上述操作
function getNextCharPosList(matrix, word, {
    row,
    col
},lock) {
    // console.log(lock)
    const isVaild = (row,col)=>!!matrix[row] && !!matrix[row][col] && !lock[`${row}:${col}`]
    const isSame = ({row,col}, str2 = word[1]) =>isVaild(row,col) && matrix[row][col] === str2
    
    const nextPosList = [{row:row+1,col}, {row:row-1,col}, {row:row,col:col-1}, {row,col:col+1}]
    return nextPosList.filter(str =>isSame(str))
    // const isVaild = (row,col)=>{
    //     const isVaildVal = !!matrix[row] && !!matrix[row][col]
    //     const isLocked = lock[`${row}:${col}`]
    //     return isVaildVal && !isLocked
    // } 
    // const isSame = ({row,col}, str2) =>{
    //     const isVaildPos = isVaild(row,col)
    //     if(isVaildPos){
    //         return matrix[row][col] === str2
    //     }
    // }
    
    // const nextPosList = [{row:row+1,col}, {row:row-1,col}, {row:row,col:col-1}, {row,col:col+1}]
    // const res = nextPosList.filter(pos =>isSame(pos,word[1]))
    // console.log(res)
    // return res
}

function isNotEmpty(arr) {
    return arr.length!==0
}

function findTargetPosList(matrix, target) {
    return matrix.reduce((res, row, rowIndex) => {
        const curRowResult = row
            .map((char, index) => (
                target === char ? {
                    row: rowIndex,
                    col: index
                } : ''
            ))
            .filter(item => (typeof item === 'object'))
        return isNotEmpty(curRowResult) ? res.concat(curRowResult) : res
    }, [])
}