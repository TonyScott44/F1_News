$(document).ready(function() {

    $('.parallax').parallax();

    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    initPage();

    function initPage() {
        articleContainer.empty();

        $.get("/api/headlines?saved=false")
            .then(function (data) {

                if (data && data.length) {
                    renderArticles(data);
                } else {
                    renderEmpty();
                }
            });
    }

    function renderArticles(articles) {

        var articleCards = [];

        for (var i = 0; i < articles.length; i++) {
            articlesCards.push(createCard(articles[i]));
        }

        articleContainer, append(articleCards);
    }

    function createCard(article) {
        var card =
            $(["<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "</h3>",
                article.headline,
                "<a class='btn btn-success save'>",
                "Save Article",
                "</a>",
                "</h3>",
                "<div>",
                "<div class='panel-body'>",
                article.summary,
                "</div>",
                "<div>"
            ].join(""));

        card.data("_id", article.id);

        return card;
    }

    function renderEmpty() {

        var emptyAlert =
            $(["<div class='alert alert-warning text-center'>",
                "<h4>We apologize, there are no new aritcles at this time.</h4>",
                "</div>",
                "<div class='panel-default'>",
                "<div class='panel-heading text-center'>",
                "<h3>Explore more options.</h3>",
                "</div>",
                "<div class='panel-body text-center'>",
                "<h4><a class='scrape-new'>Try Generating New Articles</a></h4>",
                "</h4><a href='/saved'>View Saved Articles</a></h4>",
                "</div>",
                "</div>"
            ].join(""));
        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {
        var articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true;

        $.ajax({
            method: "PATCH",
            url: "/api/headlines",
            data: articleToSave
        })
            .then(function (data) {
                if (data.ok) {
                    initPage();

                }
            });
    }

    function handleArticleScrape() {
        console.log("Scrape function entered.")
        $.get("/api/fetch")
            .then(function (data) {
                initPage();
                bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "</h3>");
            });
    }
});