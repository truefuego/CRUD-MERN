import React from 'react'
import notesStore from '../stores/notesStore'

const UpdateForm = () => {
    const store = notesStore() 
  return (
    <div>
        <h2>Update Note </h2>
        <form onSubmit={store.updateNote}>
            <input onChange={store.handleUpdateChange} name="title" value={store.updateForm.title}/>
            <input onChange={store.handleUpdateChange} name="body" value={store.updateForm.body}/>
            <button type="submit">Update Note</button>
        </form>
    </div>
  )
}

export default UpdateForm