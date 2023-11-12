function transformGoPackData(jsonData) {
    return jsonData.map(item => ({
        title: item.title,
        link: 'https://gopack.com' + item.url,
        pubDate: item.content_date,
        author: item.writer ?? ''
    }));
}

module.exports = transformGoPackData;
