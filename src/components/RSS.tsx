import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
}

interface RSSProps {
  url: string;
  title: string;
}

function RSS({ url, title }: RSSProps) {
  const [items, setItems] = useState<RSSItem[]>([]);

  useEffect(() => {
    console.log("Fetching RSS feed from", url);

    fetch(url)
      .then((response) => {
        console.log("Received response", response);
        return response.text();
      })
      .then((str) => {
        console.log("Parsing XML", str);
        return new window.DOMParser().parseFromString(str, "text/xml");
      })
      .then((data) => {
        console.log("Parsing RSS feed", data);

        const items = data.querySelectorAll("item");
        const rssItems: RSSItem[] = [];

        items.forEach((item) => {
          rssItems.push({
            title: item.querySelector("title")?.textContent ?? "",
            link: item.querySelector("link")?.textContent ?? "",
            pubDate: item.querySelector("pubDate")?.textContent ?? "",
            content: item.querySelector("content")?.textContent ?? "",
          });
        });

        console.log("Parsed items", rssItems);

        setItems(rssItems.slice(0, 6));
      })
      .catch((error) => {
        console.error("Error fetching RSS feed", error);
      });
  }, [url]);

  return (
    <div>
      <h1>{title}</h1>
      {items.map((item, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Card.Title>
              <a href={item.link}>{item.title}</a>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {new Date(item.pubDate).toLocaleString()}
            </Card.Subtitle>
            {item.content && (
              <Card.Text
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.content) }}
              />
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

function sanitizeHtml(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent || "";
}

export default RSS;
