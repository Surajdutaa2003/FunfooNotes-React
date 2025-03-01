import React, { useState } from "react"; // Removed useEffect since not needed
import "../DashboardContainer/Dashboard.css";
import NoteActions from "../NotesAction/NotesAction";

function NoteCard({ note, handleNoteList, container }) {
  // Always call useState, even if note is undefined
  const [backgroundColor, setBackgroundColor] = useState(note?.backgroundColor || "#FFFFFF");

  // If note is undefined, return null
  if (!note) {
    return null;
  }

  const handleColorChange = (noteId, color) => {
    if (noteId === note.id) {
      setBackgroundColor(color);
    }
  };

  return (
    <div className="note-card relative p-4 border rounded-md shadow-md" style={{ backgroundColor }}>
      <h3>{note.title || "Untitled"}</h3>
      <p>{note.description || "No description available"}</p>
      <div className="flex justify-between items-center mt-2">
        <NoteActions 
          handleNoteList={handleNoteList} 
          note={note} 
          container={container}
          onColorChange={handleColorChange}
        />
        <div className="absolute top-2 right-2">
          {/* <NoteOptions/> */}
        </div>
      </div>
    </div>
  );
}

export default NoteCard;