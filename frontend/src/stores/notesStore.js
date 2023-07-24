import {create} from 'zustand'
import axios from 'axios'

const notesStore = create((set) => ({
    notes: [],

    createForm: {
        title: '',
        body: '',
    },

    toggle: false,

    updateForm: {
        id: null,
        title: '',
        body: '',
    },

    fetchNotes: async() => {
        // Fetch Notes 
        const res = await axios.get('http://localhost:5000/notes')

        // Set to State
        set({
            notes: res.data.notes
        })
    }, 

    handleFormChange: (e) => {
        const { name, value } = e.target;
        set((state) => {
            return {
                createForm: {
                    ...state.createForm,
                    [name]: value,
                }
            };
        })
    },

    createNote: async(e) => {
        e.preventDefault()
        
        const { createForm } = notesStore.getState()
        // Create Note
        const res = await axios.post('http://localhost:5000/notes',createForm)
    
        // Reflect the updated notes
        set((state) => {
            return {
                notes: [...state.notes, res.data.note],
                createForm: {
                    title: '',
                    body: '',
                }
            }
        })
    },

    deleteNote: async (id) => { 
        await axios.delete(`http://localhost:5000/notes/${id}`)

        const {notes} = notesStore.getState()
        
        const newNotes = notes.filter(note => {
          return note._id !== id
        })
        set({
            notes: newNotes
        })
    },

    handleUpdateChange: (e) => {
        const {name,value} = e.target
        set((state) => {
            return {
                updateForm: {
                    ...state.updateForm,
                    [name]: value,
                }
            }
        })
    },

    toggleUpdate: (note) => {
        // get the current value
        const { _id, title, body } = note
        set({
            // return {
                toggle: !notesStore.getState().toggle,
                updateForm: {
                    title,
                    body,
                    _id,
                }
            // }
        })
    
        // set update values
    },

    updateNote: async(e) => {
        e.preventDefault()
        const { 
            updateForm:{_id, title, body},
            notes, } = notesStore.getState()

        const res = await axios.put(`http://localhost:5000/notes/${_id}`,{title,body})
    
        const newNotes = [...notes]
        const noteIndex = notes.findIndex((note) => {
          return note._id === _id
        })
        newNotes[noteIndex] = res.data.note

        set({
            notes: newNotes,
            updateForm: {
                _id: null,
                title: '',
                body: '',
            }
        })
    }
}))

export default notesStore