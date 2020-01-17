/**
 * 创建一个指定长度的数组“（···
 * @param {Num} len
 * @returns {Array}
 */
const createArr = len =>
    Array(len)
        .fill("")
        .map(_ => Number((Math.random() * 100).toFixed(2)));

module.exports = createArr;
