const mongoose = require("mongoose");
const stdout = require("shancw-stdout");
const handler = require("./curd");
mongoose.connect("mongodb://limiaomiao.site:27017/fiction");
const db = mongoose.connection;
db.once("open", () => {
    stdout.bgGreen("db connected!");
});
db.on("error", err => {
    stdout.bgRed("error\n");
    stdout.red(err);
});

//数据格式
const userSchema = mongoose.Schema({
    userName: String,
    passwd: String,
    location: String,
    books: [
        {
            title: {
                type: String
            }
        }
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = {
    handler: new handler(User),
    close: () => {
        db.close();
    }
};
