import "./Feed.css";
import { Timeline } from "react-twitter-widgets";

interface FeedProps {
  isDarkMode: boolean;
}

export function Feed({ isDarkMode }: FeedProps) {
  const options = {
    height: "1600",
    theme: isDarkMode ? "dark" : "light",
    chrome: "noheader nofooter noborders transparent noscrollbar",
  };

  return (
    <div className="mt-5">
      <Timeline
        dataSource={{
          sourceType: "list",
          ownerScreenName: "ErickGa03448617",
          slug: "1639559616253100032",
        }}
        options={options}
      />
    </div>
  );
}

export default Feed;
