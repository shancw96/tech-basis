const fs = require('fs')
const Date = require('./utils/date')

const obj = {test:1}
fs.writeFile('./test.json',JSON.stringify(obj),()=>{
	const curDate = new Date().Format("yyyy-MM-dd hh:mm:ss")
	console.log(curDate)
})
const curDate = new Date().Format("yyyy-MM-dd hh:mm:ss")

// let ans = fs.readFile('./test.json','utf-8')
// console.log(ans)