import { useState, useEffect } from "react";
import axios from 'axios'

function App() {

  // Notes object
  const [notes,setNotes] = useState([])

  // Create Form Data
  const [createForm,setCreateForm] = useState(
    {
      title:"",
      body:""
    }
  )

  // Use Effect invoked everytime the site loads
  useEffect(() => {
    fetchNotes()
  }, [])

  // handleFormChange
  const handleFormChange = (e) => {
    const {name , value} = e.target
    setCreateForm({...createForm,[name]: value})
    console.log({name,value});
  }

  // fetch the notes from the db
  const fetchNotes = async () => {
    // Fetch Notes 
    const res = await axios.get('http://localhost:5000/notes')

    // Set to State
    setNotes(res.data.notes)
  }

  const createNote = async(e) => {
    e.preventDefault()

    // Create Note
    const res = await axios.post('http://localhost:5000/notes',createForm)

    // Reflect the updated notes
    setNotes([...notes,res.data.note])
    
    // Clear state
    setCreateForm(
      {
        title: "",
        body:""
      }
    )
  }

  const deleteNote = async (id) => { 
    await axios.delete(`http://localhost:5000/notes/${id}`)
    const newNotes = [...notes].filter(note => {
      return note._id !== id
    })
    setNotes(newNotes)
  }


  return (
    <div>
      <h2>Notes</h2>
      {notes && notes.map(note => {
        return (
          <div key={note._id}>
            <h3>{note.title}-{note.body}</h3>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
        )
      })}
      <hr></hr>
      <div>
        <h2>Create Note </h2>
        <form onSubmit={createNote}>
          <input onChange={handleFormChange} name="title" value={createForm.title}/>
          <input onChange={handleFormChange} name="body" value={createForm.body}/>
          <button type="submit">Create Note</button>
        </form>
      </div>
    </div>
  );
}

export default App;
