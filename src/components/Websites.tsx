import RSS from './RSS';

interface WebsitesProps {
  isDarkMode: boolean;
}

export function Websites({ isDarkMode }: WebsitesProps) {
  return (
    <div className={`album py-5 ${isDarkMode ? "bg-dark" : ""}`}>
      <div className="row">
        <div className="col-md-4">
          <RSS url="https://rss.app/feeds/SKuOSGkvoiukNpK5.xml" title='The Wolfpacker Home' isDarkMode={isDarkMode} />
        </div>
        <div className="col-md-4">
          <RSS url="https://rss.app/feeds/MsjlAfcmoci3EEJB.xml" title='Busting Brackets' isDarkMode={isDarkMode} />
        </div>
        <div className="col-md-4">
          <RSS url="https://rss.app/feeds/YPScssqlk0pBw7pj.xml" title='Pack Insider' isDarkMode={isDarkMode} />
        </div>
        <div className="col-md-4">
          <RSS url="https://rss.app/feeds/iQCeBDPOUO0YMw8W.xml" title='Pack Pride' isDarkMode={isDarkMode} />
        </div>
        <div className="col-md-4">
          <RSS url="https://rss.app/feeds/Av0Lou3zEW0ndNyZ.xml" title='Backing The Pack' isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
}

export default Websites;
