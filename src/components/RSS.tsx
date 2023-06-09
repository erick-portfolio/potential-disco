import "./RSS.css";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";

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
    const fetchData = async () => {
      try {
        const apiResponseRaw = await API.get("proxy", `/proxy?url=${encodeURIComponent(url)}`, {});
        const xmlData = apiResponseRaw.feedContents;

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        const itemElements = xmlDoc.querySelectorAll("item");

        const rssItems: RSSItem[] = [];

        itemElements.forEach((item) => {
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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching RSS feed", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div className="RSS">
      <Link to={homepage} style={{ textDecoration: "none" }}>
        <h1>{title}</h1>
      </Link>
      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        items.map((item, index) => (
          <Card
            key={index}
            className="mb-3"
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
