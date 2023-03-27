import { useState } from "react";

interface NavBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function NavBar({ isDarkMode, toggleDarkMode }: NavBarProps) {
  return (
    <nav
      className={`navbar navbar-expand-lg ${
        isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
      style={{ paddingRight: "20px" }}
    >
      <div style={{ paddingLeft: "20px" }}>
        <a className="navbar-brand" href="/">
          WolfpackWireClone
        </a>
      </div>
      <div className="ml-auto">
        <button
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
