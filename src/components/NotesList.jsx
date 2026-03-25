import { useState } from "react";
import { useNotes } from "../context/NotesContext";
import "./NoteList.css";

const NotesList = () => {
  const {
    notes,
    loading,
    deleteNote,
    archiveNote,
    updateNote,
    searchNotes,
  } = useNotes();

  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Loading
  if (loading) return <div className="spinner"></div>;

  const filteredNotes = query ? searchNotes(query) : notes;
  

  const activeNotes = filteredNotes.filter((note) => !note.archived);
  const archivedNotes = filteredNotes.filter((note) => note.archived);

  const handleEdit = (note) => {
    setEditing(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleUpdate = (id) => {
    updateNote(id, {
      title: editTitle,
      content: editContent,
    });
    setEditing(null);
  };

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        placeholder="Search notes here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

    
      <div className="notes-container">
        {activeNotes.map((note) => (
          <div className="note-card" key={note.id}>
            {editing === note.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button onClick={() => handleUpdate(note.id)}>Save</button>
              </>
            ) : (
              <>
                <h3 className="note-title">{note.title}</h3>
                <p className="note-content">{note.content}</p>

                <div className="note-actions">
                  <button onClick={() => deleteNote(note.id)}>Delete</button>

                  <button onClick={() => archiveNote(note.id)}>
                    {note.archived ? "Unarchive" : "Archive"}
                  </button>

                  <button onClick={() => handleEdit(note)}>Edit</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      
      {archivedNotes.length > 0 && (
        <>
          <h2>Archived Notes</h2>

          <div className="notes-container">
            {archivedNotes.map((note) => (
              <div className="note-card archived" key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>

                <button onClick={() => deleteNote(note.id)}>Delete</button>
                <button onClick={() => archiveNote(note.id)}>
                  Unarchive
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NotesList;