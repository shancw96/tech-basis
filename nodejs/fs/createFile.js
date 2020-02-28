const fs = require('fs')
const moment = require('moment')
const path = require('path')
console.log(path.resolve(__dirname, '../chrome_extends'))
// function writeToLog(ipInfo) {
//     const DayDir = './' + moment().format('YYYY-MM-DD')
//     const ipFile = DayDir + '/ip---.json'
//     //创建或确认目录
//     if (!fs.existsSync(DayDir)) {
//         fs.mkdirSync(DayDir)
//     }
//     //确认文件是否存在
//     if (!fs.existsSync(ipFile)) {
//         writeFile(ipFile, {}, ipInfo)
//     } else {
//         writeFile(ipFile, JSON.parse(fs.readFileSync(ipFile)), ipInfo)
//     }

//     function writeFile(path, target, content) {
//         fs.writeFileSync(path, JSON.stringify({ ...target, [moment().format('h:mm:ss a')]: content }))
//     }
// }




