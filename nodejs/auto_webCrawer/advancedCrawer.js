const axios = require("axios");
const cheerio = require("cheerio");
axios.get("https://www.wensang.com/").then(res => {
    console.log(res);
});
