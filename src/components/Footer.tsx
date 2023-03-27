import React from "react";

export interface FooterProps {
  isDarkMode: boolean;
}

export function Footer({ isDarkMode }: FooterProps) {
  return (
    <div className={`container${isDarkMode ? " dark-mode" : ""}`}>
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-muted">
              WolfpackWireClone
            </a>
          </li>
        </ul>
        <p className="text-center text-muted">
          WolfpackWireClone - A website that aggregates all NC state Athletic
          news.
        </p>
      </footer>
    </div>
  );
}

export default Footer;
