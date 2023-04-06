"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const handler = async (event) => {
    const urlRoot = 'https://www.on3.com';
    const urlPath = '/teams/nc-state-wolfpack';
    const url = urlRoot + urlPath; // Replace with the URL of the website you want to scrape
    try {
        const response = await axios_1.default.get(url);
        const $ = cheerio_1.default.load(response.data);
        const feedArray = [];
        $('article.ArticleFeed_container__mAuAz').each((index, element) => {
            const feed = {
                author: $(element).find('.ArticleFeed_authorblock__eesEX  .MuiTypography-root.MuiLink-root.MuiLink-underlineNone.ArticleFeed_name__OZ2nP.MuiTypography-caption.MuiTypography-colorPrimary').text(),
                link: urlRoot + ($(element).find('a.MuiTypography-root.MuiLink-root.MuiLink-underlineHover').attr('href') || ""),
                pubDate: $(element).find('.MuiTypography-root.ArticleFeed_date__rTL2d.MuiTypography-caption.MuiTypography-colorTextPrimary').text(),
                title: $(element).find('.MuiTypography-root.ArticleFeed_title__ct_XL.MuiTypography-h6.MuiTypography-colorTextPrimary').text(),
            };
            feedArray.push(feed);
        });
        console.log(feedArray);
        return {
            statusCode: 200,
            body: JSON.stringify({ feedArray }),
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            }
        };
    }
    catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to scrape website' }),
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            }
        };
    }
};
exports.handler = handler;
