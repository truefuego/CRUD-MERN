import { useEffect } from "react";
import notesStore from "../stores/notesStore";
import Notes from "./Notes";
import UpdateForm from "./UpdateForm";
import CreateForm from "./CreateForm";

function App() {
  const store = notesStore()

  useEffect(() => {
    store.fetchNotes()
  }, [])
  

  return (
    <div>
      <Notes />
      {!store.toggle ? (<CreateForm />) : (<UpdateForm />)}
    </div>
  );
}

export default App;
