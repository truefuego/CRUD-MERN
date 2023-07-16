const Note = require("../model/note")

const FetchNote = async(req,res) => {
    // Get id off the url
    const noteId = req.params.id
    
    // find the note using that id
    const note = await Note.findById(noteId)

    //respond with node
    res.json({note: note})
}

const FetchNotes = async(req,res) => {
    // Find notes 
    const myNotes = await Note.find()
    
    // Responds with them
    res.json({notes: myNotes})
}

const UpdateNote = async(req,res) => {
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
}

const DeleteNote = async(req,res) => {
    // get id from parameters
    const noteId = req.params.id

    // Delete the record
    const deletedNote = await Note.deleteOne({_id: noteId})

    //respnd
    res.json({success: "Successfully Deleted"})
}

const CreateNote = async (req,res) => {
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
}

module.exports = { 
    FetchNote: FetchNote, 
    FetchNotes: FetchNotes, 
    UpdateNote: UpdateNote, 
    DeleteNote: DeleteNote, 
    CreateNote: CreateNote
}