import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArrowClockwise } from 'react-bootstrap-icons';

export interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  author: string;
}

interface SiteFeedProps {
  title: string;
  homepage: string;
  isDarkMode: boolean;
  items: RSSItem[];
  isLoading: boolean;
  onRefresh: () => void; // Add onRefresh prop
}

function SiteFeed({ title, homepage, isDarkMode, items, isLoading, onRefresh }: SiteFeedProps) {
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh(); // Call the onRefresh callback prop
    }
  };

  return (
    <div className="RSS">
      <div className="header">
        <h1>
          <div className="row">
            <div className="col-10">
              <Link className="title-link" to={homepage} style={{ textDecoration: "none" }}>
                {title}
              </Link>
            </div>
            <div className="col-2">
              <Button onClick={handleRefresh} variant={!isDarkMode ? "light" : "dark"} className="refresh-button">
                <ArrowClockwise />
              </Button>
            </div>
          </div>
        </h1>
      </div>
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

export default SiteFeed;
