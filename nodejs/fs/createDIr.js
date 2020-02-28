const fs = require('fs')
const moment = require('moment')
const dirName = moment().format('YYYY-MM-DD')

const hasDir = fs.existsSync(`./${dirName}`)
fs.mkdir(`./${dirName}`, () => {
    console.log('create success')
})
