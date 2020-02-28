const fs = require('fs')
const { join } = require('path')
const curPath = join(__dirname, '../')
const source = fs.readdirSync('./')
let res = source.map(name => join(curPath, name)).filter(path => {
    fs.lstat(path, (err, stat) => {
        if (err) {
            return false
        } else {
            return stat.isDirectory()
        }
    })
})
console.log(res)

