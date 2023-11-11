import { Websites, SidebarImage, Schedule } from ".";

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
          <div className="col-md-2">
            <div className="row">
              <Schedule isDarkMode={isDarkMode} />
            </div>
            <div className="row">
              <SidebarImage isDarkMode={isDarkMode} path="/pack-chronicle-logo.png" title="AI Generated Art 1" />
              </div>
              <div className="row">
              <SidebarImage isDarkMode={isDarkMode} path="/pack-chronicle-navbar-logo.png" title="AI Generated Art 2" />
              </div>
          </div>
          <div className="col-md-10">
            <Websites
              isDarkMode={isDarkMode}
              rssList={rssConfig}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
