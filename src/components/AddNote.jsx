import { useState } from "react";
import { useNotes } from "../context/NotesContext";
import "./AddNote.css";

const AddNote = () => {
  const { createNote } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) return;

    createNote({
      title,
      content,
      color: "yellow",
      tags: [],
    });

    setTitle("");
    setContent("");
  };

  return (
    <form className="add-note-form" onSubmit={handleSubmit}>
      <input
      className="add-note-input"
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
         className="add-note-textarea"
        placeholder="Enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="add-note-btn" type="submit">Add Note</button>
    </form>
  );
};

export default AddNote;