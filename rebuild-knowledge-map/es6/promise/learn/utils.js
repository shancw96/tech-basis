const isFunction = fn=>"[object Function]" === Object.prototype.toString.call(fn)
const isArray = array=>"[object Array]" === Object.prototype.toString.call(array)
module.exports = {isFunction,isArray}