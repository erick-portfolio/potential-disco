import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import SiteFeed from "./SiteFeed";
import "./RSS.css";
import cheerio from "cheerio";
import { API } from "aws-amplify";

interface TechnicianItem {
  title: string;
  link: string;
  pubDate: string;
  author: string;
}

interface TechnicianProps {
  title: string;
  homepage: string;
  isDarkMode: boolean;
}

function Technician({ homepage, title, isDarkMode }: TechnicianProps) {
  const [items, setItems] = useState<TechnicianItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const urlRoot = "https://www.technicianonline.com";
      const urlPath = "/sports";
      const url = urlRoot + urlPath;

      const responseRaw = await API.get("proxy", `/proxy?url=${encodeURIComponent(url)}`, {});
      const response = responseRaw.feedContents.toString();
      const $ = cheerio.load(response);
      const feedArray: TechnicianItem[] = [];
      $(".tnt-headline.headline").each((index, element) => {
        const feed: TechnicianItem = {
          author: "",
          link:
            urlRoot +
            ($(element)
              .find("a")
              .attr("href") || ""),
          pubDate: "Latest",
          title: $(element).text(),
        };
        feedArray.push(feed);
      });
      $("article").each((index, element) => {
        const feed: TechnicianItem = {
          author: $(element).find("[id^='author']").text(),
          link: "https://www.technicianonline.com/" + $(element).find("a").attr("href"),
          pubDate: $(element).find(".asset-date").text(),
          title: $(element).find(".tnt-asset-link").attr("aria-label") || "Title Error",
        };
        feedArray.push(feed);
      });

      setItems(feedArray);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching RSS feed", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    await fetchData();
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

export default Technician;
