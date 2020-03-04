const {
    curry
} = require("ramda");
const {
    transferGbkToBuffer
} = require('./utils')
const Formdata = require("form-data");
const axios = require("axios");
const cheerio = require("cheerio");
const baseURL = "http://www.lwxstxt.com"
const searchURL = "/modules/article/search.php"

/**
 * 乐文小说 - 搜索
 */
const asyncPostSearch = curry(async (fn, url, keyword) => {
    let form = new Formdata();
    const headers = form.getHeaders();
    form.append("searchkey", keyword)
    let myRes = await axios.request({
        url,
        method: "post",
        data: form,
        timeout: 10 * 1000,
        headers
    })
    return fn(cheerio.load(myRes.data))
})

const filterSearch = $ => {

}

// asyncPostSearch(filterSearch, baseURL + searchURL, '遮天').then(res => console.log(res))
console.log(transferGbkToBuffer('123'))