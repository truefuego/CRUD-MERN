import React from 'react'
import notesStore from '../stores/notesStore'

const Note = ({ note }) => {
    const store = notesStore((store) => {
        return {
            deleteNote: store.deleteNote,
            toggleUpdate: store.toggleUpdate
        }
    })
  return (
    <div>
        <div key={note._id}>
        <h3>{note.title}</h3>
        <button onClick={() => store.deleteNote(note._id)}>Delete</button>
        <button onClick={() => store.toggleUpdate(note)}>Update</button>
        </div>
    </div>
  )
}

export default Note