const { handler, close } = require("./index");

handler
    .save({
        userName: "shancw3",
        passwd: "9527",
        location: "huaian",
        books: [{ title: "遮天" }]
    })
    .then(res => {
        console.log(res);
        close();
    });
// handler.update({ userName: "shancw2" }, { location: "淮安" }).then(res => console.log(res));
// handler.remove({ location: "huaian" }).then(res => console.log(res));
// handler.findOne({ userName: "shancw23" }).then(res => console.log(res));
