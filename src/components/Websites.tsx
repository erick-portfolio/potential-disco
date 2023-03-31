import RSS from "./RSS";

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
        {/* Loop through each item in the rssList array */}
        {rssList.map(({ homepage, url, title }) => (
          <div className="col-md-4" key={url}>
            {/* Render an instance of the RSS component for each item */}
            <RSS homepage={homepage} url={url} title={title} isDarkMode={isDarkMode} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Websites;
