require("dotenv").config()

const mongoose = require("mongoose")

async function connectToDb() {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to Database")
    }
    catch {
        console.log("Error Occured : ",err)
    }
}

module.exports = connectToDb