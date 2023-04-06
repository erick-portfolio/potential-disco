import "./RSS.css";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

interface AtomItem {
  title: string;
  link: string;
  updated: string;
  content: string;
  author: string;
}

interface RSSProps {
  url: string;
  title: string;
  homepage: string;
  isDarkMode: boolean;
}

function RSSAtom({ homepage, url, title, isDarkMode }: RSSProps) {
  const [items, setItems] = useState<AtomItem[]>([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.text())
      .then((str) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(str, "application/xml");
        const entries = xmlDoc.getElementsByTagName("entry");
        const atomItems: AtomItem[] = [];

        for (let i = 0; i < entries.length; i++) {
          const item = entries[i];
          atomItems.push({
            title: item.querySelector("title")?.textContent ?? "",
            link: item.querySelector("link")?.getAttribute("href") ?? "",
            updated: item.querySelector("updated")?.textContent ?? "",
            content: item.querySelector("content")?.textContent ?? "",
            author: item.querySelector("author")?.textContent ?? "",
          });
        }
        setItems(atomItems.slice(0, 6));
      })
      .catch((error) => {
        console.error("Error fetching Atom feed", error);
      });
  }, [url]);

  return (
    <div className={`RSS`}>
      <Link to={homepage} style={{ textDecoration: "none"}}>
        <h1>{title}</h1>
      </Link>
      {items.map((item, index) => (
        <Card key={index} className="mb-3" style={{ backgroundColor: "transparent" }}>
          <Card.Body>
            <Card.Title>
              <a href={item.link}>{item.title}</a>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {new Date(item.updated).toLocaleString()} by {item.author}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default RSSAtom;
