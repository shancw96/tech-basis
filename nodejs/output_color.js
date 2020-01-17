const colorControl = color => text => console.log(`${color}${text}\x1b[0m`);

const red = colorControl("\x1b[31m");
const green = colorControl("\x1b[32m");
const yellow = colorControl("\x1b[33m");
const blue = colorControl("\x1b[34m");
const magenta = colorControl("\x1b[35m");
const cyan = colorControl("\x1b[36m");

const bgBlack = colorControl("\x1b[40m");
const bgRed = colorControl("\x1b[41m");
const bgGreen = colorControl("\x1b[42m");
const bgYellow = colorControl("\x1b[43m");
const bgBlue = colorControl("\x1b[44m");
const bgCyan = colorControl("\x1b[46m");
const bgWhite = colorControl("\x1b[47m");
const bgMagenta = colorControl("\x1b[45m");
module.exports = {
    red,
    green,
    yellow,
    bgMagenta,
    magenta,
    blue,
    cyan,
    bgBlack,
    bgRed,
    bgGreen,
    bgYellow,
    bgBlue,
    bgCyan,
    bgWhite
};
