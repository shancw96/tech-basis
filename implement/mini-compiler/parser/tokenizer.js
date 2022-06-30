/**
 * Lisp -> C
 */

/**
 * 词法分析器 Tokenizer
 * （add 2 (subtract 4 2)）-> [{type: '**', value: ''}]
 */

function tokenizer(input) {
  // 指针：当前处理的代码字符串位置
  let current = 0
  // token 存放位置
  let tokens = []
  while (current < input.length) {
    let char = input[current]
    // 左括号
    if(char === "("){
      tokens.push({
        type: 'paren',
        value: '('
      });
      current += 1
      continue
    }
    // 右括号
    if(char === ")"){
      tokens.push({
        type: 'paren',
        value: ')'
      });
      current += 1
      continue
    }

    // 空格判断 分割
    const WHITE_SPACE = /\s/
    if (WHITE_SPACE.test(char)) {
      current += 1
      continue
    }

    // number 需要将多个字符识别成同一个
    const NUMBERS = /[0-9]/
    if (NUMBERS.test(char)) {
      // 缓存char
      let cache = ''
      while (NUMBERS.test(char)) {
        cache += char;
        char = input[++current]
      }
      tokens.push({
        type: 'number',
        value: cache
      })
      continue
    }
    // 加减乘除符号
    // (add 2 3)
    //  ^^^
    const LETTERS = /[a-z]/
    if (LETTERS.test(char)) {
      let cache = ''
      while(LETTERS.test(char)) {
        cache += char
        char = input[++current]
      }
      tokens.push({
        type: 'letter',
        value: cache
      })
      continue
    }
    // 最后如果我们没有匹配上任何类型的 token，那么我们抛出一个错误。
    throw new TypeError('I dont know what this character is: ' + char);
  }
  return tokens
}

// tokenizer test
// const res = tokenizer("(add 2 (subtract 4 2))") // -> [{type: xxx, value: 'xxx'}, {...}, {...}]
// console.log(res)

module.exports = tokenizer