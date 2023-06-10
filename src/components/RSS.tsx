import "./RSS.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import SiteFeed, { RSSItem } from "./SiteFeed";

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

  const handleRefresh = async () => {
    setIsLoading(true);
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
    } catch (error) {
      console.error("Error fetching RSS feed", error);
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

export default RSS;
