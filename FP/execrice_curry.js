const R = require("ramda");

//const words = str => split(' ', str);

const splitWord = R.curry((sign, str) => str.split(sign));

const splitBy_ = splitWord("_");
console.log(splitBy_("123_123_123"));
