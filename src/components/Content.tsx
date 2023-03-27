import { Websites, Feed } from ".";

export function Content() {
  return (
    <div className="Content" style={{ paddingLeft: "20px" }}>
      <div className="">
        <div className="row">
          <div className="col-md-10"><Websites /></div>
          <div className="col-md-2"><Feed /></div>
        </div>
      </div>
    </div>
  );
}

export default Content;
