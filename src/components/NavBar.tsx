interface NavBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  brandText: string;
}

export function NavBar({ isDarkMode, toggleDarkMode, brandText }: NavBarProps) {
  return (
    <nav
      className={`navbar navbar-expand-sm ${
        isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
      style={{ paddingRight: "20px", paddingLeft: "20px" }}
    >
      {/* Brand Text */}
      <a
        className="navbar-brand"
        href="/"
        style={{ color: "#d62828", fontSize: "30px", fontWeight: "bold" }}
      >
        {brandText}
      </a>

      <div className="navbar-nav ms-auto d-flex align-items-center">
        {/* GitHub Link */}
        <a
          href="https://github.com/erick-portfolio/potential-disco"
          className="nav-link"
          style={{ marginRight: "15px" }}
        >
          GitHub Repo
        </a>

        {/* Toggle Dark Mode Button */}
        <button
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
