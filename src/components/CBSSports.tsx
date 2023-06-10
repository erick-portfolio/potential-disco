import "./RSS.css";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import cheerio from "cheerio";
import SiteFeed, { RSSItem } from "./SiteFeed";

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

export default CBSSports;
