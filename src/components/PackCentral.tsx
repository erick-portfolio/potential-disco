import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import SiteFeed, { RSSItem } from "./SiteFeed";

interface PackCentralItem {
  title: string;
  link: string;
  pubDate: string;
  author: string;
}

interface PackCentralProps {
  title: string;
  homepage: string;
  isDarkMode: boolean;
}

function PackCentral({ homepage, title, isDarkMode }: PackCentralProps) {
  const [items, setItems] = useState<PackCentralItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const urlRoot = "https://ncstate.rivals.com";
      const urlPath = "/more_news";
      const url = urlRoot + urlPath;

      const responseRaw = await API.get("proxy", `/proxy?url=${encodeURIComponent(url)}`, {});
      const response = responseRaw.feedContents.toString();
      const feedArray: PackCentralItem[] = [];

      // Parsing logic using cheerio
      // ...

      setItems(feedArray.slice(0, 6));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching RSS feed", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

export default PackCentral;
