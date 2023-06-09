import "./RSS.css";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import cheerio from "cheerio";

interface CBSSportsItem {
  title: string;
  link: string;
  pubDate: string;
  author: string;
}

interface CBSSportsProps {
  url: string;
  title: string;
  homepage: string;
  isDarkMode: boolean;
}

function CBSSports({ homepage, url, title, isDarkMode }: CBSSportsProps) {
  const [items, setItems] = useState<CBSSportsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponseRaw = await API.get("proxy", `/proxy?url=${encodeURIComponent(url)}`, {});
        const $ = cheerio.load(apiResponseRaw.feedContents);
        const itemElements = $('.NewsFeed-item');

        const rssItems: CBSSportsItem[] = [];

        itemElements.each((_index, element) => {
          const title = $(element).find(".NewsFeed-title").text().trim();
          const link = $(element).find(".NewsFeed-title a").attr("href") || "";
          const pubDate = $(element).find(".NewsFeed-date").text().trim();
          const author = $(element).find(".NewsFeed-author").text().trim();

          const rssItem: CBSSportsItem = {
            title,
            link,
            pubDate,
            author,
          };
          rssItems.push(rssItem);
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

export default CBSSports;
