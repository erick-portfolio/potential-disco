import Wolfpacker from "./Wolfpacker";
import RSSAtom from "./RSSAtom";
import RSS from "./RSS";
import GoPack from "./GoPack";
import CBSSports from "./CBSSports";
import Technician from "./Technician";

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
          <RSSAtom
            homepage="https://www.backingthepack.com/"
            url="https://www.backingthepack.com/rss/current.xml"
            title="Backing The  Pack"
            isDarkMode={isDarkMode}
          />
        </div>
        <div className="col-md-4">
          <RSS
            homepage="https://packinsider.com/"
            url="https://packinsider.com/feed/"
            title="Pack Insider"
            isDarkMode={isDarkMode}
          />
        </div>
        <div className="col-md-4">
          <RSS
            homepage="https://bustingbrackets.com/acc/nc-state-wolfpack/"
            url="https://bustingbrackets.com/acc/nc-state-wolfpack/feed/"
            title="Busting Brackets"
            isDarkMode={isDarkMode}
          />
        </div>
        <div className="col-md-4">
          <GoPack
            homepage="https://www.gopack.com/"
            url="https://gopack.com/services/adaptive_components.ashx?type=stories&count=6&start=0&sport_id=0"
            title="Go Pack"
            isDarkMode={isDarkMode}
          />
        </div>
        <div className="col-md-4">
          <Wolfpacker
            homepage="https://www.on3.com/teams/nc-state-wolfpack/"
            title="The Wolfpacker"
            isDarkMode={isDarkMode}
          />
        </div>
        <div className="col-md-4">
          <CBSSports
            homepage="https://www.cbssports.com/college-football/teams/NCST/nc-state-wolfpack/"
            url="https://www.cbssports.com/college-football/teams/NCST/nc-state-wolfpack/"
            title="CBS Sports"
            isDarkMode={isDarkMode}
          />
        </div>
        <div className="col-md-4">
          <Technician
            homepage="https://www.technicianonline.com/"
            title="Technician"
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
}

export default Websites;
