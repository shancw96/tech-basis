//transferGbkToBuffer :: String -> String
const iconv = require('iconv-lite')
function transferGbkToBuffer(str) {
    const buffer = iconv.encode(str, "gbK");
    let temp = "";
    for (let i = 0; i < buffer.length; i++) {
        temp += `%${buffer[i].toString(16)}`;
    }
    return temp.toUpperCase();
}
module.exports = { transferGbkToBuffer }