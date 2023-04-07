import "./RSS.css";

import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  author: string;
}

interface RSSProps {
  url: string;
  title: string;
  homepage: string;
  isDarkMode: boolean;
}

function RSS({ homepage, url, title, isDarkMode }: RSSProps) {
  const [items, setItems] = useState<RSSItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((str) => {
        return new window.DOMParser().parseFromString(str, "text/xml");
      })
      .then((data) => {
        const items = data.querySelectorAll("item");
        const rssItems: RSSItem[] = [];

        items.forEach((item) => {
          rssItems.push({
            title: item.querySelector("title")?.textContent ?? "",
            link: item.querySelector("link")?.textContent ?? "",
            pubDate: item.querySelector("pubDate")?.textContent ?? "",
            author:
              item.querySelector("author")?.textContent ??
              item.querySelector("creator")?.textContent ??
              "",
          });
        });

        setItems(rssItems.slice(0, 6));
      })
      .catch((error) => {
        console.error("Error fetching RSS feed", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return (
    <div className={`RSS`}>
      <Link to={homepage} style={{ textDecoration: "none" }}>
        <h1>{title}</h1>
      </Link>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        items.map((item, index) => (
          <Card
            key={index}
            className="mb-3"
            // style background transparent
            style={{ backgroundColor: "transparent" }}
          >
            <Card.Body>
              <Card.Title>
                <a href={item.link}>{item.title}</a>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {new Date(item.pubDate).toLocaleString()}{" "}
                {item.author && <span> by {item.author}</span>}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default RSS;
