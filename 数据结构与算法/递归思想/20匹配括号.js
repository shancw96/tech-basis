/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {

  while(s.length){
    let newS = s.replace(/(\[\])|(\(\))|(\{\})/g,'')
    if(newS === s) return false
    else s = newS
  }
  return !s
};

let res =isValid('{[]}{}')
res