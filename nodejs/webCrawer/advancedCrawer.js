const {
    curry
} = require("ramda");
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
    return {
        testTitle: $('body').children('div').eq(0).children('div').eq(0).children('div').eq(0).children('div').eq(1).children('table').eq(0).children('tbody').eq(0).children('tr').eq(1).children('td').eq(1).children('p').eq(0).children('a').eq(0).text(),
        testUpdate: $('body').children('div').eq(0).children('div').eq(0).children('div').eq(0).children('div').eq(1).children('table').eq(0).children('tbody').eq(0).children('tr').eq(1).children('td').eq(3).children('p').eq(0).text()
    }
}

asyncPostSearch(filterSearch, baseURL + searchURL, '遮天').then(res => console.log(res))