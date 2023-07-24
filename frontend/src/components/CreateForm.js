import React from 'react'
import notesStore from '../stores/notesStore'

const CreateForm = () => {
    const store = notesStore();
  return (
    <div>
        <h2>Create Note </h2>
        <form onSubmit={store.createNote}>
            <input onChange={store.handleFormChange} name="title" value={store.createForm.title}/>
            <input onChange={store.handleFormChange} name="body" value={store.createForm.body}/>
            <button type="submit">Create Note</button>
        </form>
    </div>
  )
}

export default CreateForm