import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { API } from "aws-amplify";
import "./RSS.css";

interface WolfpackerItem {
  title: string;
  link: string;
  pubDate: string;
  author: string;
}

interface WolfpackerProps {
  title: string;
  homepage: string;
  isDarkMode: boolean;
}

function Wolfpacker({ homepage, title, isDarkMode }: WolfpackerProps) {
  const [items, setItems] = useState<WolfpackerItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchWolfpacker() {
      try {
        let myInit = {
          cache: true,
          headers: {
            "Content-type": "application/json",
          },
        };
        const apiResponse = await API.get("apida839c78", "/items", myInit);
        const feedArray = apiResponse.feedArray || [];

        const wolfpackerItems = feedArray.map(
          (feedItem: {
            title: string;
            link: string;
            pubDate: string;
            author: string;
          }) => ({
            title: feedItem.title,
            link: feedItem.link,
            pubDate: feedItem.pubDate,
            author: feedItem.author,
          })
        );
        setItems(wolfpackerItems.slice(0, 6));
      } catch (error) {
        console.error("Error fetching RSS feed", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWolfpacker();
  }, []);

  return (
    <div className={`RSS`}>
      <div style={{ marginBottom: "1rem" }}>
        <a href={homepage} style={{ textDecoration: "none" }}>
          <h1>{title}</h1>
        </a>
      </div>
      {isLoading ? (
        <div
          className="spinner-border text-primary "
          role="status"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          {items.map((item, index) => (
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
                  {`${item.author} - ${item.pubDate}`}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

export default Wolfpacker;
