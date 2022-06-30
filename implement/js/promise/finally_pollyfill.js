Promise.prototype.finallyPolyfill = function(callback) {
  // 获取当前的构造函数
  callback = Object.prototype.toString.call(callback) === '[Object function]' ? callback : _ => _
  const constructor = this.constructor
  return this.then(function(value) {
    return constructor.resolve(callback()).then(function() {
      return value;
    });
  }, function(reason) {
    return constructor.resolve(callback()).then(function() {
      throw reason;
    });
  });
}

new Promise((resolve, reject) => resolve(1)).finallyPolyfill()