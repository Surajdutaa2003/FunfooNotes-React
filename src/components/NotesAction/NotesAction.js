import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaletteIcon from "@mui/icons-material/Palette";
import ImageIcon from "@mui/icons-material/Image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArchiveIcon from "@mui/icons-material/Archive"; // ✅ Archive icon import
import "../DashboardContainer/Dashboard.css";
import { archiveNote } from "../../services/api";

const NoteActions = ({ handleNoteList, note }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (action) => {
    if (action === "archive") {
      archiveNote(note?.id)
        .then(() => {
          handleNoteList(note, "archive");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    handleMenuClose();
  };

  return (
    <div className="note-actions">
      <IconButton size="small"><NotificationsNoneIcon /></IconButton>
      <IconButton size="small"><PersonAddIcon /></IconButton>
      <IconButton size="small"><PaletteIcon /></IconButton>
      <IconButton size="small"><ImageIcon /></IconButton>

      {/* ✅ Archive Button */}
      <IconButton size="small" onClick={() => handleActionClick("archive")}>
        <ArchiveIcon />
      </IconButton>

      {/* Three Dots Icon for Menu */}
      <IconButton size="small" onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleActionClick("delete")}>Delete Note</MenuItem>
        <MenuItem onClick={() => handleActionClick("add-label")}>Add Label</MenuItem>
        <MenuItem onClick={() => handleActionClick("add-drawing")}>Add Drawing</MenuItem>
        <MenuItem onClick={() => handleActionClick("make-copy")}>Make a Copy</MenuItem>
        <MenuItem onClick={() => handleActionClick("show-checkboxes")}>Show Checkboxes</MenuItem>
        <MenuItem onClick={() => handleActionClick("copy-to-docs")}>Copy to Google Docs</MenuItem>
        <MenuItem onClick={() => handleActionClick("version-history")}>Version History</MenuItem>
      </Menu>
    </div>
  );
};

export default NoteActions;
