// 316. Remove Duplicate Letters
// Given a string s,
// remove duplicate letters so that every letter appears once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.

// Example 1:

// Input: s = "bcabc"
// Output: "abc"
// Example 2:

// Input: s = "cbacdcbc"
// Output: "acdb"

function removeDuplicateLetters(str) {
  const inStack = {};
  const count = {};
  const stack = [];
  for(let i=0; i< str.length; i++) {
    count[str[i]] = typeof count[str[i]] === 'number' ? count[str[i]] + 1 : 1;
  };
  for(let i = 0; i < str.length; i++) {
    count[str[i]] -= 1;
    while (stack.length && stack[stack.length - 1] > str[i]) {
      const stackHead = stack[stack.length-1];
      if (count[stackHead] == 0) break;
      inStack[stack.pop()] = false;
    };
    if (!inStack[str[i]]) {
      stack.push(str[i]); 
      inStack[str[i]] = true;
    }
  }
  return stack.join(''); 
}

console.log(removeDuplicateLetters("bcabc"));