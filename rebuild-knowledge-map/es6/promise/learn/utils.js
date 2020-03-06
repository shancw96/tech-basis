const isFunction = fn=>"[object Function]" === Object.prototype.toString.call(fn)
module.exports = {isFunction}