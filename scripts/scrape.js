var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

    request("http://www.skysports.com/f1/news", function(error, response, body) {
        console.log("scrape test 1");
        var $ = cheerio.load(body);
        var results = [];

        $(".news-list__headline").each(function(i, element) {

            console.log("scrape test 2");

            var title = $(this).children("a").text().trim();
            var sum = $(this).children("p").text().trim();

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
        cb(results);
    });
};

module.exports = scrape;