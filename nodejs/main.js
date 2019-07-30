const fs = require('fs');
const obj  = {data:1}
const string = JSON.stringify(obj)
console.log(string)
fs.writeFile('./test.json',string,'utf-8',err=>{
	if(err) throw err
	console.log('write success')
});
