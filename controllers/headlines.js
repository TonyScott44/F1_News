var scrape = require("../scripts/scrape");
var dateGen = require("../scripts/date");

var Headline = require("../models/Headline");

module.exports = {
    fetch: function(callback) {
        scrape(function(data) {
            var articles = data;
            for (var i=0; i < articles.length; i++) {
                articles[i].data = dateGen();
                articles[i].saved = false;
            }
            Headline.collection.insertMany(articles, {ordered:false}, function(err, docs) {
                callback(err, docs);
            });
        });
    },
    delete: function(query, callback) {
        Headline.remove(query, cb);
    },
    get: function(query, callback) {
        Headline.find(query)
            .sort({
                _id: -1
            })
            .exec(function(err, doc) {
                callback(doc);
            });
    },
    update: function(query, callback) {
        Headline.update({__id: query._id}, {
            $set:query
        }, {}, callback);
    }
}
