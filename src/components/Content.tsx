import { Websites, Feed } from ".";

interface ContentProps {
  isDarkMode: boolean;
  twitterFeedConfig: {
    sourceType: string;
    ownerScreenName: string;
    slug: string;
  };
  rssConfig: {
    url: string;
    homepage: string;
    title: string;
  }[];
}

export function Content({ isDarkMode, twitterFeedConfig, rssConfig }: ContentProps) {
  return (
    <div
      className={`Content ${isDarkMode ? "dark" : ""}`}
      style={{ paddingLeft: "20px", paddingRight: "20px" }}
    >
      <div className="">
        <div className="row">
          <div className="col-md-10">
            <Websites
              isDarkMode={isDarkMode}
              rssList={rssConfig}
            />
          </div>
          <div className="col-md-2">
            <Feed isDarkMode={isDarkMode}
            dataSource={twitterFeedConfig} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
