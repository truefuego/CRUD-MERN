// Load env variables
require("dotenv").config()


//Importing dependencies
const express = require("express")
const connectToDb = require("./config/connectToDb")
const notesController = require("./controllers/notesControllers")

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
app.get('/notes',notesController.FetchNotes)

// Get one note according to its id
// here ":id" is used to pass the data of a request to url
// params is used to get data off the link ('/notes/:id')
app.get('/notes/:id',notesController.FetchNote)

// Creating
app.post('/notes',notesController.CreateNote)

// Update 
app.put('/notes/:id',notesController.UpdateNote)

// Delete
app.delete('/notes/:id',notesController.DeleteNote)

//Start the Sever
app.listen(process.env.PORT)
