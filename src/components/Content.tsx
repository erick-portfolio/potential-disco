import { Websites, Feed } from ".";

interface ContentProps {
  isDarkMode: boolean;
}

export function Content({ isDarkMode }: ContentProps) {
  return (
    <div className={`Content ${isDarkMode ? "dark" : ""}`} style={{ paddingLeft: "20px", paddingRight: "20px" }}>
      <div className="">
        <div className="row">
          <div className="col-md-10"><Websites isDarkMode={isDarkMode} /></div>
          <div className="col-md-2"><Feed isDarkMode={isDarkMode} /></div>
        </div>
      </div>
    </div>
  );
}

export default Content;
