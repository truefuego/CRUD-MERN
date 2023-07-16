// Load env variables
require("dotenv").config()


//Importing dependencies
const express = require("express")
const connectToDb = require("./config/connectToDb")
const Note = require('./model/note')

// Create the express app
const app = express()

// Configure express app - To read json
app.use(express.json())

// Connect To DataBase
connectToDb()

// Routing 
// Everytime the path('/') is hit it will run the callback function

// Retrieving / Read
app.get('/',(req,res) => {
    res.json({hello:"World"})
})

// Read
// Get all the notes
app.get('/notes',async(req,res) => {
    // Find notes 
    const myNotes = await Note.find()
    
    // Responds with them
    res.json({notes: myNotes})
})

// Get one note according to its id
// here ":id" is used to pass the data of a request to url
// params is used to get data off the link ('/notes/:id')
app.get('/notes/:id',async(req,res) => {
    // Get id off the url
    const noteId = req.params.id
    
    // find the note using that id
    const note = await Note.findById(noteId)

    //respond with node
    res.json({note: note})
})

// Creating
app.post('/notes',async (req,res) => {
    // Get the sent data off request body
    // Extract the data from the request body
    const title = req.body.title
    const body = req.body.body

    // Create a new Note with it 
    const newNote = await Note.create({
        title: title,
        body: body
    })

    // respond with new note
    res.json({note: newNote})
})

// Update 
app.put('/notes/:id',async(req,res) => {
    // Get id off the url
    const noteId = req.params.id
    const title = req.body.title
    const body = req.body.body

    //find and update the url
    await Note.findByIdAndUpdate(noteId, {
        title: title,
        body: body
    })

    // respond with note
    const updatedNote = await Note.findById(noteId)
    res.json({note: updatedNote})
})

// Delete
app.delete('/notes/:id',async(req,res) => {
    // get id from parameters
    const noteId = req.params.id

    // Delete the record
    const deletedNote = await Note.deleteOne({_id: noteId})

    //respnd
    res.json({success: "Successfully Deleted"})
})


//Start the Sever
app.listen(process.env.PORT)
