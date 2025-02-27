import React from "react";
import "./Dashboard.css";
import Keep from "../../assets/image/KeepLogo.png";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Header({ toggleSidebar, userEmail }) {
  const profileInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "?";

  return (
    <div className="header">
      {/* Menu Icon */}
      <IconButton onClick={toggleSidebar} className="menu-button">
        <MenuIcon />
      </IconButton>

      {/* Keep Logo & Text */}
      <div className="logo-container">
        <img src={Keep} alt="Keep Logo" className="keep-logo" />
        <h1 className="h1">Keep</h1>
      </div>

      {/* Search Bar */}
      <input type="text" placeholder="Search" className="search-bar" />

      {/* Profile Icon */}
      <div className="profile-icon">{profileInitial}</div>
    </div>
  );
}

export default Header;
