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
}

function newGame() {
    g.round = 0;
    g.score = 0;
    g.currentGuess = "";
    g.currentWord = "";
    g.currentWordJumbled = "";
    newRound();
}

function newRound() {
    // pick word
    var newWord = Math.floor(Math.random() * g.wordList.length);
    g.currentWord = g.wordList[newWord];
    g.currentWordJumbled = g.currentWord;
    console.log(g.currentWord);
    // jumble
    var wArr = g.currentWordJumbled.split("");
    for (i = 0; i < 10; i++) {
        var an = Math.floor(Math.random() * g.currentWordJumbled.length)
        var bn = Math.floor(Math.random() * g.currentWordJumbled.length)
        var c = wArr[an];
        wArr[an] = wArr[bn];
        wArr[bn] = c;
    }
    g.currentWordJumbled = wArr.join("");

    for (i = 0; i < g.currentWordJumbled.length; i++) {
        var div = $("<div>", { id: "wordLetter" + i, class: "wordLetter" });
        div.html(g.currentWordJumbled.substr(i, 1));
        $("#word").append(div);
    }

    // sctivate click
    $("#word").click(function (e) {
        letterClicked(e);
    })

    // stuff
    $("#reset").css("display", "inline-block");
}

function letterClicked(e) {
    var clicked = e.target;
    var id = clicked.id;
    var letter = $(clicked).text();
    console.log("Click " + id + " = " + letter);

    if ($(clicked).attr("data-clicked")!=="1") {
        $(clicked).attr("data-clicked", "1");
        g.currentGuess += letter;
        $("#answer").text(g.currentGuess);
    }
}

