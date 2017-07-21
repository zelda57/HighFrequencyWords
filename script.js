$(document).ready(function () {
    console.log("Starting");
    start();
});

g = {};

function start() {
    init();
    newGame();
}

function init() {
    g.wordList = "the,that,not,look,put,and,with,then,don't,could,a,all,were,come,house,to,we,go,will,old,said,can,little,into,too,in,are,as,back,by,he,up,no,from,day,I,had,mum,children,made,of,my,one,him,time,it,her,them,Mr,I'm,was,what,do,get,if,you,there,me,just,help,they,out,down,now,Mrs,on,this,dad,came,called,she,have,big,oh,here,is,went,when,about,off,for,be,it's,got,asked,at,like,see,their,saw,his,some,looked,people,make,but,so,very,your,an".split(",");

    $("#reset").click(function () {
        g.currentGuess = "";
        $("#answer").html("");
        $(".wordLetter").css("color", "red");
        $(".wordLetter").attr("data-used", "0");
    });
}

function newGame() {
    g.round = 0;
    g.score = 0;
    g.currentGuess = "";
    g.currentWord = "";
    $("#answerTick").css("display", "none");
    $("#reset").css("display", "inline-block");
    newRound();
}

function newRound() {
    // resets
    g.currentGuess = "";
    $("#word").click(function (e) {
        checkLetterClick(e);
    });
    // pick word
    var newWord = Math.floor(Math.random() * g.wordList.length);
    g.currentWord = g.wordList[newWord];
    console.log(g.currentWord);
    for (i = 0; i < g.currentWord.length; i++) {
        var div = $("<div>", { id: "wordLetter" + i, class: "wordLetter" });
        div.html(g.currentWord.substr(i, 1));
        $("#word").append(div);
    }
}

function nextRound() {
    console.log("Next Round");
}

function checkLetterClick(e) {
    if (g.currentWord) {
        var word = e.target.id;
        if ($("#" + word).attr("data-used") !== "1") {
            console.log("click " + e.target.id + " which is " + $("#" + e.target.id).text());
            $("#" + word).attr("data-used", "1");
            $("#" + word).css("color", "silver");
            g.currentGuess += $("#" + word).text();
            console.log(":" + g.currentGuess);
            $("#answer").html(g.currentGuess);
        }
        if (g.currentGuess === g.currentWord) {
            console.log("Correct.");
            $("#answerTick").css("display", "inline-block");
            $("#reset").css("display", "none");
            $("#word").html("<div onclick='nextRound();' style='cursor: pointer;'>Correct. Click for next word</div>");
        }
    }
}