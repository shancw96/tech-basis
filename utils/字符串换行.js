function splitText(text, len = 20) {
  function splitCore(text, len) {
    return text.length <= len ? [text] : [text.slice(0, len), ...splitCore(text.slice(len), len)]
  }
  return splitCore(text, len).join('\n')
}

console.log(splitText('asdjhakjsdhajksdhakjshdjkaashdjkasdhjaasdhaskjdhaskjhdaskjadhakjhskajsdh'))