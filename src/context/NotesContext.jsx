import { createContext,useState,useEffect,useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL="https://react-notetaker-2.onrender.com";

const NotesContext =createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider=({children})=>{
    const [notes,setNotes]=useState([]);
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null);


    //note taking from api//
const getNotes=async ()=>{
    setLoading(true);
    try{
        const res=await axios.get(API_URL);
        setNotes(res.data);
    }catch{
        setError("Failed to get notes");
        toast.error("Failed to load notes")
    }finally{
        setLoading(false);
    }
};

//creating notes//

const createNote=async(note)=>{
    try{
        const newNote={
            ...note,
        archived: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        };
     const res=await axios.post(API_URL,newNote);
     setNotes((prev)=>[...prev,res.data]);
     toast.success("note created")
    }catch{
        toast.error("note creation failed")
    }
};

//updating notes//

const updateNote=async(id,updates)=>{
    try{
        const res=await axios.put(`${API_URL}/${id}`,{
            ...updates,
            updatedAt: new Date().toISOString(),});

        setNotes((prev)=>prev.map((note)=>(note.id===id?res.data :note)));
        toast.success("Note updated");
    }catch{
        toast.error("Note updation failed")
    }
};

//deleting notes//

const deleteNote=async(id)=>{
    try{
        await axios.delete(`${API_URL}/${id}`);
        setNotes((prev)=>prev.filter((note)=>note.id !==id));

        toast.success("Note deleted");

    }catch{
        toast.error("Note deletion failed")
    }
};

//Toggle archive//
const archiveNote = async (id) => {
  try {
    // 1. Get latest note from server (important!)
    const res = await axios.get(`${API_URL}/${id}`);
    const note = res.data;

    // 2. Create updated object
    const updatedNote = {
      ...note,
      archived: !note.archived,
      updatedAt: new Date().toISOString(),
    };

    // 3. Update using PUT (full replace)
    const updateRes = await axios.put(`${API_URL}/${id}`, updatedNote);

    // 4. Update state
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? updateRes.data : n))
    );

  } catch (err) {
    console.log(err);
    toast.error("Archive failed");
  }
};
//search notes//

const searchNotes=(query)=>{
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    getNotes();
  }, []);

return(
    <NotesContext.Provider
     value={{
        notes,
        loading,
        error,
        getNotes,
        createNote,
        updateNote,
        deleteNote,
        archiveNote,
        searchNotes,
      }}>
        {children}
      </NotesContext.Provider>
);
};













