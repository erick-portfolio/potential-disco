import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import SiteFeed from "./SiteFeed";
import "./RSS.css";
import cheerio from "cheerio";
import { API } from "aws-amplify";

interface InsidePackItem {
  title: string;
  link: string;
  pubDate: string;
  author: string;
}

interface InsidePackProps {
  title: string;
  homepage: string;
  isDarkMode: boolean;
}

function InsidePack({ homepage, title, isDarkMode }: InsidePackProps) {
  const [items, setItems] = useState<InsidePackItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const responseRaw = await API.get("proxy", `/proxy?url=${encodeURIComponent("https://insidepacksports.com/premium/feed")}`, {});
      const response = responseRaw.feedContents.toString();
      const $ = cheerio.load(response);
      const feedArray: InsidePackItem[] = [];
      $(".story.item").each((index, element) => {
        const feed: InsidePackItem = {
          author: $(element).find(".author-link").text(),
          link:
            homepage +
            ($(element)
              .find("a")
              .attr("href") || ""),
          pubDate: $(element).find(".details")
            .clone()    //clone the element
            .children() //select all the children
            .remove()   //remove all the children
            .end()  //again go back to selected element
            .text(),
          title: $(element).find(".title").text(),
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

export default InsidePack;
