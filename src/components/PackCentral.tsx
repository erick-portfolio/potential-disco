import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./RSS.css";
import cheerio from "cheerio";
import axios from "axios";


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

  useEffect(() => {
    const urlRoot = "https://ncstate.rivals.com";
    const urlPath = "/more_news ";
    const anyOrigin = "https://api.allorigins.win/raw?url=";
    const url = anyOrigin + urlRoot + urlPath;

    async function fetchPackCentral() {
      try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const feedArray: PackCentralItem[] = [];
        console.log('body');
        console.log($('body').text());

        $(".ticker-article").each((index, element) => {
          console.log($(element).text());
          const feed: PackCentralItem = {
            author: $(element)
              .find(
                ".ArticleFeed_authorblock__eesEX  .MuiTypography-root.MuiLink-root.MuiLink-underlineNone.ArticleFeed_name__OZ2nP.MuiTypography-caption.MuiTypography-colorPrimary"
              )
              .text(),
            link:
              urlRoot +
              ($(element)
                .find(
                  "a.MuiTypography-root.MuiLink-root.MuiLink-underlineHover"
                )
                .attr("href") || ""),
            pubDate: $(element)
              .find(
                ".MuiTypography-root.ArticleFeed_date__rTL2d.MuiTypography-caption.MuiTypography-colorTextPrimary"
              )
              .text(),
            title: $(element)
              .find(
                ".MuiTypography-root.ArticleFeed_title__ct_XL.MuiTypography-h6.MuiTypography-colorTextPrimary"
              )
              .text(),
          };
          feedArray.push(feed);
        });

        setItems(feedArray.slice(0, 6));
      } catch (error) {
        console.error("Error fetching RSS feed", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPackCentral();
  }, []);

  return (
    <div className={`RSS`}>
      <div style={{ marginBottom: "1rem" }}>
        <a href={homepage} style={{ textDecoration: "none" }}>
          <h1>{title}</h1>
        </a>
      </div>
      {isLoading ? (
        <div
          className="spinner-border text-primary "
          role="status"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          {items.map((item, index) => (
            <Card
              key={index}
              className="mb-3"
              // style background transparent
              style={{ backgroundColor: "transparent" }}
            >
              <Card.Body>
                <Card.Title>
                <a href={item.link}>{item.title}</a>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {`${item.author} - ${item.pubDate}`}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

export default PackCentral;
