import "./App.css";
import { useState, useEffect } from "react";
import { NavBar, Footer, Content } from "./components";

interface AppProps {
  twitterFeedConfig: {
    sourceType: string;
    ownerScreenName: string;
    slug: string;
  };
  rssConfig: {
    url: string;
    homepage: string;
    title: string;
  }[];
  brandText: string;
  disclaimer: string;
}

function App({ twitterFeedConfig, rssConfig, brandText, disclaimer }: AppProps) {
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
      <NavBar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        brandText={brandText}
      />
      <Content isDarkMode={isDarkMode}  rssConfig={rssConfig} twitterFeedConfig={twitterFeedConfig}/>
      <Footer isDarkMode={isDarkMode} brandText={brandText} disclaimer={disclaimer}/>
    </div>
  );
}

export default App;
