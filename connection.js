const mongoose = require("mongoose")

const mongoConnection = (dbURI) => {

    mongoose.connect(dbURI)
        .then((res) => console.log("connted to db"))
        .catch(err => console.log(err))
}
module.exports = mongoConnection