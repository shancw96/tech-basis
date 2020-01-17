const mongoose = require("mongoose");
const stdout = require("shancw-stdout");
mongoose.connect("mongodb://limiaomiao.site:27017/fiction");

const db = mongoose.connection;

db.once("open", () => {
    stdout.bgMagenta("db connected!");
});

//创建schema
let fictionSchema = mongoose.Schema({
    name: String
});

//创建新的表
let Book = mongoose.model("Book2", fictionSchema);

const book1 = new Book({ name: "遮天" });
book1.save((err, res) => {
    if (err) {
        stdout.yellow(err);
    } else {
        stdout.blue(res);
    }
});
