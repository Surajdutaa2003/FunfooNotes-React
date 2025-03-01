import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaletteIcon from "@mui/icons-material/Palette";
import ImageIcon from "@mui/icons-material/Image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { archiveNote, deleteForeverNote } from "../../services/api"; // Import delete API

const NoteActions = ({ handleNoteList, note, container, onColorChange }) => { // onColorChange prop
  const [anchorEl, setAnchorEl] = useState(null);
  const [colorAnchorEl, setColorAnchorEl] = useState(null); // State for color palette
  const open = Boolean(anchorEl);
  const colorOpen = Boolean(colorAnchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleColorMenuOpen = (event) => {
    setColorAnchorEl(event.currentTarget);
  };

  const handleColorMenuClose = () => {
    setColorAnchorEl(null);
  };

  const handleActionClick = async (action) => {
    try {
      if (action === "archive") {
        await archiveNote(note?.id, true);
        handleNoteList(note, "archive");
      } else if (action === "unarchive") {
        await archiveNote(note?.id, false);
        handleNoteList(note, "unarchive");
      } else if (action === "delete") {
        await deleteForeverNote(note?.id);
        handleNoteList(note, "delete");
      }
    } catch (err) {
      console.error(`Error performing ${action}:`, err);
    }
    handleMenuClose();
  };

  const handleColorSelect = (color) => {
    if (onColorChange && note) {
      onColorChange(note.id, color); // Pass note ID and selected color to parent
    }
    handleColorMenuClose();
  };

  // List of colors based on your image (adjust as needed)
  const colors = [
    "#FFB6C1", // Light Pink
    "#FFA07A", // Light Salmon
    "#FFFFE0", // Light Yellow
    "#98FF98", // Light Green
    "#87CEEB", // Light Sky Blue
    "#DDA0DD", // Plum
    "#F0E68C", // Khaki
    "#E6E6FA", // Lavender
    "#F5F5F5", // White Smoke
  ];

  return (
    <div className="note-actions">
      {/* Notification, Collaborator, Palette, Image */}
      <IconButton size="small">
        <NotificationsNoneIcon />
      </IconButton>
      <IconButton size="small">
        <PersonAddIcon />
      </IconButton>
      <IconButton size="small" onClick={handleColorMenuOpen}>
        <PaletteIcon />
      </IconButton>
      <IconButton size="small">
        <ImageIcon />
      </IconButton>

      {/* Archive/Unarchive Button */}
      {container === "notes" && (
        <IconButton size="small" onClick={() => handleActionClick("archive")}>
          <ArchiveIcon />
        </IconButton>
      )}
      {container === "archive" && (
        <IconButton size="small" onClick={() => handleActionClick("unarchive")}>
          <UnarchiveIcon />
        </IconButton>
      )}

      {/* More Options Menu */}
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

      {/* Color Palette Menu */}
      <Menu
        anchorEl={colorAnchorEl}
        open={colorOpen}
        onClose={handleColorMenuClose}
        PaperProps={{
          style: {
            display: "flex",
            flexWrap: "wrap",
            padding: "8px",
            maxWidth: "200px",
          },
        }}
      >
        {colors.map((color) => (
          <IconButton
            key={color}
            size="small"
            style={{ backgroundColor: color, width: "24px", height: "24px", margin: "4px" }}
            onClick={() => handleColorSelect(color)}
          />
        ))}
      </Menu>
    </div>
  );
};

export default NoteActions;