import React from "react";
import "../DashboardContainer/Dashboard.css";
import NoteActions from "../NotesAction/NotesAction";
// import NoteOptions from "../NoteOptions/NoteOptions";
// import NoteOptions from "../NoteOptions/NoteOptions"; // Importing Three Dots Menu

function NoteCard({ note, handleNoteList }) {
  if (!note) {
    return null; // Prevents rendering if note is undefined
  }

  return (
    <div className="note-card relative p-4 border rounded-md shadow-md">
      <h3>{note.title || "Untitled"}</h3>
      <p>{note.description || "No description available"}</p>

      {/* Actions for Note */}
      <div className="flex justify-between items-center mt-2">
        <NoteActions handleNoteList={handleNoteList} note={note} />

        {/* Three Dots Menu (Positioned in the top-right corner) */}
        <div className="absolute top-2 right-2">
          {/* <NoteOptions/> */}
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
