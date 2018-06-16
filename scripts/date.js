var dateGenerator = function() {

    var date = new Date();
    var formDate = "";
    formDate += (date.getMonth() + 1) + "_";
    formDate += date.getDate() + "_";
    formDate += date.getFullYear();
    return formDate;
};

module.exports = dateGenerator;