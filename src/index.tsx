import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter } from "react-router-dom";

const twitterFeedConfig = JSON.parse(process.env.REACT_APP_TWITTER_FEED_CONFIG!);
const rssConfig = JSON.parse(process.env.REACT_APP_RSS_CONFIG!);
const brandText = process.env.REACT_APP_BRAND_TEXT!;
const disclaimer = process.env.REACT_APP_DISCLAIMER!;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <App 
      rssConfig={rssConfig}
      twitterFeedConfig={twitterFeedConfig}
      brandText={brandText}
      disclaimer={disclaimer}/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
