import RSS from './RSS';

export function Websites() {
  return (
    <div className="album py-5">
      <div className="row">
        <div className="col-md-4">
          <RSS url="https://rss.app/feeds/5lxKEhZY0MIWlhNa.xml" title='CBS Sports' />
        </div>
        <div className="col-md-4">
          <RSS url="https://rss.app/feeds/bXj52Mdm2lqsC8Xe.xml" title='Inside Pack Sports' />
        </div>
        <div className="col-md-4">
          <RSS url="https://rss.app/feeds/SKuOSGkvoiukNpK5.xml" title='The Wolfpacker Home' />
        </div>
        <div className="col-md-4">
          <RSS url="https://rss.app/feeds/MsjlAfcmoci3EEJB.xml" title='Busting Brackets' />
        </div>
        <div className="col-md-4">
          <RSS url="https://rss.app/feeds/YPScssqlk0pBw7pj.xml" title='Pack Insider' />
        </div>
        <div className="col-md-4">
          <RSS url="https://rss.app/feeds/iQCeBDPOUO0YMw8W.xml" title='Pack Pride' />
        </div>
        <div className="col-md-4">
          <RSS url="https://rss.app/feeds/Av0Lou3zEW0ndNyZ.xml" title='Backing The Pack' />
        </div>
      </div>
    </div>
  );
}

export default Websites;
