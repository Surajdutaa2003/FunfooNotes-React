import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import AddNote from "../../components/AddNote/AddNote.js";
import "../DashboardContainer/Dashboard.css";
import { getUserNotes } from "../../services/api";
import { useOutletContext } from "react-router-dom";

function Notes() {
  const [notesList, setNotesList] = useState([]);
  const { searchQuery } = useOutletContext();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getUserNotes();
      const activeNotes = res?.data?.data?.filter((note) => !note.isArchived) || [];
      setNotesList(activeNotes);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setNotesList([]);
    }
  };

  const filteredNotes = notesList.filter(note => 
    note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateNotesList = (updatedNote, action) => {
    if (action === "add") {
      setNotesList((prevNotes) => [updatedNote, ...prevNotes]);
    } else if (action === "archive" || action === "delete") {
      setNotesList((prev) => prev.filter((note) => note.id !== updatedNote.id));
    }
  };

  return (
    <div className="notes-section">
      <AddNote onNoteAdded={updateNotesList} />
      <div className="notes-grid">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => ( // Fixed 'index' and 'note' not defined
            <NoteCard 
              key={index} 
              handleNoteList={updateNotesList} 
              note={note} 
              container="notes" 
            />
          ))
        ) : (
          <p>No notes match your search</p>
        )}
      </div>
    </div>
  );
}

export default Notes;