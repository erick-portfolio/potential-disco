import "./RSS.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import SiteFeed, { RSSItem } from "./SiteFeed";

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
  const [items, setItems] = useState<RSSItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        setItems(
          atomItems.slice(0, 6).map((item) => ({
            title: item.title,
            link: item.link,
            pubDate: item.updated,
            author: item.author,
          }))
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Atom feed", error);
        setIsLoading(false);
      });
  }, [url]);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const str = await response.text();

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
      setItems(
        atomItems.slice(0, 6).map((item) => ({
          title: item.title,
          link: item.link,
          pubDate: item.updated,
          author: item.author,
        }))
      );
    } catch (error) {
      console.error("Error fetching Atom feed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SiteFeed
      title={title}
      homepage={homepage}
      isDarkMode={isDarkMode}
      items={items}
      isLoading={isLoading}
      onRefresh={handleRefresh}
    />
  );
}

export default RSSAtom;
