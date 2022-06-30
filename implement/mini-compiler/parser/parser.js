/**
 * 语法分析器 token -> ast
 */
function parser(tokens) {
  let current = 0
  function walk() {
    let token = tokens[current]
    // number 类型
    if(token.type === 'number') {
      current += 1
      return {
        type: 'NumberLiteral',
        value: token.value
      }
    }
    // 处理括号()
    if(token.type === 'paren' && token.value === '(') {
      token = tokens[++current]
      let node = {
        type: 'CallExpression',
        name: token.value,
        params: []
      }

      // 我们再次自增 `current` 变量，跳过当前的 token 
      token = tokens[++current];
      // number OR letter
      while (
          (token.type !== 'paren') ||
          (token.type === 'paren' && token.value !== ')')
        ) {
          node.params.push(walk());
          token = tokens[current];
        }
      // 我们最后一次增加 `current`，跳过右圆括号。
      current++;
      // 返回结点。
      return node;
    }
    throw new TypeError(token.type)
  }
  // 现在，我们创建 AST，根结点是一个类型为 `Program` 的结点。
  var ast = {
    type: 'Program',
    body: []
  };

  // 现在我们开始 `walk` 函数，把结点放入 `ast.body` 中。
  //
  // 之所以在一个循环中处理，是因为我们的程序可能在 `CallExpressions` 后面包含连续的两个
  // 参数，而不是嵌套的。
  //
  //   (add 2 2)
  //   (subtract 4 2)
  //
  while (current < tokens.length) {
    ast.body.push(walk());
  }

  // 最后我们的语法分析器返回 AST 
  return ast;
}

module.exports = parser