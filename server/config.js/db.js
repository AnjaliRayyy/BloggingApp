const mongoose = require("mongoose");
async function connectDB(URI) {
    try {
        await mongoose.connect(URI)
        console.log("Data base connected successfully!")
    }
    catch (err) {
        console.log("Error in connecting to the database : ", err)
    }
}
module.exports = connectDB;