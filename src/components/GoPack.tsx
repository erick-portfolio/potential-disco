import "./RSS.css";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import SiteFeed, { RSSItem } from "./SiteFeed";

interface GoPackItem {
  title: string;
  link: string;
  pubDate: string;
  author: string;
}

interface GoPackProps {
  url: string;
  title: string;
  homepage: string;
  isDarkMode: boolean;
}

function GoPack({ homepage, url, title, isDarkMode }: GoPackProps) {
  const [items, setItems] = useState<GoPackItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await API.get("proxy", `/proxy?url=${encodeURIComponent(url)}`, {});
      const jsonData = response.feedContents;
      const goPackItems: GoPackItem[] = jsonData.map((item: any) => ({
        title: item.title,
        link: "https://gopack.com" + item.url,
        pubDate: item.content_date,
        author: item.writer || "",
      }));

      setItems(goPackItems.slice(0, 6));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching RSS feed", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const handleRefresh = () => {
    setIsLoading(true);
    fetchData();
  };

  return (
    <SiteFeed
      title={title}
      homepage={homepage}
      isDarkMode={isDarkMode}
      items={items.map((item) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        author: item.author,
      }))}
      isLoading={isLoading}
      onRefresh={handleRefresh}
    />
  );
}

export default GoPack;
