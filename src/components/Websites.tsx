import Wolfpacker from "./Wolfpacker";
import RSSAtom from "./RSSAtom";
import RSS  from './RSS';
import PackCentral from "./PackCentral";

interface RssList {
  url: string;
  title: string;
  homepage: string;
}

interface WebsitesProps {
  isDarkMode: boolean;
  rssList: RssList[];
}

export function Websites({ isDarkMode, rssList }: WebsitesProps) {
  return (
    <div className="album py-5">
      <div className="row">
          <div className="col-md-4">
            <Wolfpacker homepage="https://www.on3.com/teams/nc-state-wolfpack/" title="The Wolfpacker" isDarkMode={isDarkMode} />
          </div>
          <div className="col-md-4">
          <RSSAtom homepage="https://www.backingthepack.com/" url="https://api.allorigins.win/raw?url=https%3A%2F%2Fwww.backingthepack.com%2Frss%2Fcurrent.xml" title="Backing The  Pack" isDarkMode={isDarkMode} />
          </div>
          <div className="col-md-4">
          <RSS homepage="https://packinsider.com/" url="https://api.allorigins.win/raw?url=https%3A%2F%2Fpackinsider.com%2Ffeed%2F" title="Pack Insider" isDarkMode={isDarkMode} />
          </div>
          <div className="col-md-4">
          <RSS homepage="https://gopack.com/" url="https://api.allorigins.win/raw?url=https://gopack.com/rss.aspx" title="Go Pack" isDarkMode={isDarkMode} />
          </div>
          <div className="col-md-4">
          <RSS homepage="https://bustingbrackets.com/acc/nc-state-wolfpack/" url="https://api.allorigins.win/raw?url=https://bustingbrackets.com/acc/nc-state-wolfpack/feed/" title="Busting Brackets" isDarkMode={isDarkMode} />
          </div>
          {/* <div className="col-md-4">
          <PackCentral homepage="https://ncstate.rivals.com/" title="Wolfpack Central" isDarkMode={isDarkMode} />
          </div> */}
      </div>
    </div>
  );
}

export default Websites;
