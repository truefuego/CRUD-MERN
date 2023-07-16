const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title: String,
    body: String
})

// Creating a model based on a schema in Mongoose.
const Note = mongoose.model("Note",noteSchema)

module.exports = Note