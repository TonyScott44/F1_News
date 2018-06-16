var request = require("request");
var cheerio = require("cheerio");

var scrape = function (callback) {

    request("http://www.skysports.com/f1/news", function(error, response, html) {

        var $ = cheerio.load(html);
        var results = [];

        $("a.news-list__headline-link").each(function(i, element) {

            var title = $(this).text().trim();
            var sum = $(this).children("news-list__snippet").text().trim();

            if(title && sum) {
                var titleFormat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumFormat =  sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var newData = {
                    headline: titleFormat,
                    summary: sumFormat
                };
                results.push(newData);
            }
        });
        callback(results);
    });
};

module.exports = scrape;