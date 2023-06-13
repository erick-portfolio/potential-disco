import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import SiteFeed, { RSSItem } from "./SiteFeed";
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

    useEffect(() => {

        async function fetchInsidePack() {
            try {
                const responseRaw = await API.get("proxy", `/proxy?url=${encodeURIComponent("https://insidepacksports.com/premium/feed")}`, {});
                const response = responseRaw.feedContents.toString();
                const $ = cheerio.load(response);
                const feedArray: InsidePackItem[] = [];
                $(".story.item").each((index, element) => {
                    console.log($(element).find(".title").text());
                    const feed: InsidePackItem = {
                        author: $(element).find(".author-link").text(),
                        link:
                            homepage +
                            ($(element)
                                .find(
                                    "a"
                                )
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


                setItems(feedArray.slice(0, 6));
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching RSS feed", error);
                setIsLoading(false);
            }
        }

        fetchInsidePack();
    }, []);

    const handleRefresh = async () => {
        setIsLoading(true);
        const refreshedItems: InsidePackItem[] = [];
        try {
            const urlRoot = "https://www.on3.com";
            const urlPath = "/teams/nc-state-wolfpack";
            const url = urlRoot + urlPath;

            const responseRaw = await API.get("proxy", `/proxy?url=${encodeURIComponent(url)}`, {});
            const response = responseRaw.feedContents.toString();
            const $ = cheerio.load(response);
            $("article").each((index, element) => {
                const refreshedItem: InsidePackItem = {
                    author: $(element)
                        .find(
                            ".ArticleFeed_authorblock__eesEX  .MuiTypography-root.MuiLink-root.MuiLink-underlineNone.ArticleFeed_name__OZ2nP.MuiTypography-caption.MuiTypography-colorPrimary,  .ArticleCover_author__O0ZMp"
                        )
                        .text(),
                    link:
                        urlRoot +
                        ($(element)
                            .find(
                                "a.MuiTypography-root.MuiLink-root.MuiLink-underlineHover, .ArticleCover_titlelink__TvbbB"
                            )
                            .attr("href") || ""),
                    pubDate: $(element)
                        .find(
                            ".MuiTypography-root.ArticleFeed_date__rTL2d.MuiTypography-caption.MuiTypography-colorTextPrimary, .ArticleCover_time__vAnWk"
                        )
                        .text(),
                    title: $(element)
                        .find(
                            ".MuiTypography-root.ArticleFeed_title__ct_XL.MuiTypography-h6.MuiTypography-colorTextPrimary, .ArticleCover_title__7E2I0"
                        )
                        .text(),
                };
                refreshedItems.push(refreshedItem);
            });

            setItems(refreshedItems.slice(0, 6));
        } catch (error) {
            console.error("Error refreshing RSS feed", error);
        } finally {
            setIsLoading(false);
        }
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
