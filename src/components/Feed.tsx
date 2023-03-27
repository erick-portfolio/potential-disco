import { Timeline } from "react-twitter-widgets";

export function Feed() {
  return (
    <div className="mt-5">
      <Timeline
        dataSource={{
          sourceType: "list",
          ownerScreenName: "ErickGa03448617",
          slug: "1639559616253100032",
        }}
        options={{
          height: "800",
        }}
      />
    </div>
  );
}

export default Feed;
