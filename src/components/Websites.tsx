import Wolfpacker from "./Wolfpacker";
import RSSAtom from "./RSSAtom";
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
          <RSSAtom homepage="https://www.backingthepack.com/" url="https://www.backingthepack.com/rss/current.xml" title="Backing The Pack" isDarkMode={isDarkMode} />
          </div>
      </div>
    </div>
  );
}

export default Websites;
