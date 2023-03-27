import { useState } from "react";

interface NavBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function NavBar({ isDarkMode, toggleDarkMode }: NavBarProps) {
  return (
    <nav
      className={`navbar navbar-expand-sm ${
        isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
      style={{ paddingRight: "20px", paddingLeft: "20px" }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="/"
          style={{ color: "#d62828", fontSize: "30px", fontWeight: "bold" }}
        >
          WolfpackWireClone
        </a>
      </div>
      <div className="navbar-nav me-auto">
        <button
        // style so that the text won't wrap
          style={{ whiteSpace: "nowrap" }}
          className={`btn btn-outline-${isDarkMode ? "light" : "dark"}`}
          onClick={toggleDarkMode}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
