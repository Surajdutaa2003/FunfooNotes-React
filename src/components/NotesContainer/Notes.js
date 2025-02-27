import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import AddNote from "../../components/AddNote/AddNote.js";
import "../DashboardContainer/Dashboard.css";
import { getUserNotes } from "../../services/api";

function Notes() {
  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []); // Fetch notes only once on mount

  const fetchNotes = async () => {
    try {
      const res = await getUserNotes();
      console.log("Fetched Notes:", res);
      // 🔹 Filter out archived notes to only show active ones
      const activeNotes = res?.data?.data?.filter((note) => !note.isArchived) || [];
      setNotesList(activeNotes);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setNotesList([]);
    }
  };

  const updateNotesList = (updatedNote, action) => {
    if (action === "add") {
      setNotesList((prevNotes) => [updatedNote, ...prevNotes]);
    } else if (action === "archive" || action === "delete") {
      // 🔹 Remove the note from the list if archived or deleted
      setNotesList((prev) => prev.filter((note) => note.id !== updatedNote.id));
    }
  };

  return (
    <div className="notes-section">
      <AddNote onNoteAdded={updateNotesList} />
      <div className="notes-grid">
        {notesList.length > 0 ? (
          notesList.map((note, index) => (
            <NoteCard key={index} handleNoteList={updateNotesList} note={note} />
          ))
        ) : (
          <p>No notes available</p>
        )}
      </div>
    </div>
  );
}

export default Notes;

// helooo