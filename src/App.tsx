import "./App.css";
import { useState, useEffect } from "react";
import { NavBar, Footer, Content } from "./components";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode") === "true"
  );

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <div className={`App${isDarkMode ? " dark-mode" : ""}`}>
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Content isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
