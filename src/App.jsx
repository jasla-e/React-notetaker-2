import React from 'react'
import { ToastContainer } from 'react-toastify'
import NotesList from './components/NotesList'
import "react-toastify/dist/ReactToastify.css";
import AddNote from './components/AddNote';


function App() {
  return (
    <div>
      <h1 style={{justifyContent:"center", textAlign:"center"}}>My Notes App</h1>

      <AddNote/>
      <NotesList/>
     <ToastContainer />
    </div>
  )
}

export default App



