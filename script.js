$(document).ready(function () {
    // doc ready 
    m = new module();
    m.start();
})

var module = (function () {
    // object literal to return
    var retObj = {};

    // global vars
    var globs = {}

    function newGame() {
        // start a new game
        globs.wordList = "the,that,not,look,put,and,with,then,don't,could,a,all,were,come,house,to,we,go,will,old,said,can,little,into,too,in,are,as,back,by,he,up,no,from,day,I,had,mum,children,made,of,my,one,him,time,it,her,them,Mr,I'm,was,what,do,get,if,you,there,me,just,help,they,out,down,now,Mrs,on,this,dad,came,called,she,have,big,oh,here,is,went,when,about,off,for,be,it's,got,asked,at,like,see,their,saw,his,some,looked,people,make,but,so,very,your,an".split(",");
        globs.wordListLen = globs.wordList.length;

        newRound();
    };

    function newRound() {
        //reset counters etc for a new round
        globs.currentWord = "";
        globs.currentJumble = "";
        globs.currentGuess = "";
        globs.currentLetterstried = "";
        globs.answer = "";

        // run functions
        pickWord();
        displayWord();
        newRoundEventsCreate();
    }

    function pickWord() {
        // pick a new word
        globs.currentWordNumber = Math.floor(Math.random() * (globs.wordListLen));
        globs.currentWord = globs.wordList[globs.currentWordNumber];
        console.log("New word " + globs.currentWordNumber + " : " + globs.wordList[globs.currentWordNumber])

        jumbleWord();
    }

    function jumbleWord() {
        // jumble word
        var word = globs.currentWord.split("");
        for (i = 0; i < 20; i++) {
            var firstLetter = Math.floor(Math.random() * word.length);
            var secondLetter = Math.floor(Math.random() * word.length);
            if (firstLetter != secondLetter) {
                var tempLetter = word[firstLetter];
                word[firstLetter] = word[secondLetter];
                word[secondLetter] = tempLetter;
            }
        }
        globs.currentJumble = word.join("");
        console.log("Jumbled " + globs.currentJumble);
    }

    function displayWord() {
        var word = globs.currentJumble;
        for (var letter = 0; letter < word.length; letter++) {
            var div = $("<div/>", { id: "letter" + letter, class: "letter", text: word[letter] })
            $("#word").append(div);
        }
    }

    function newRoundEventsCreate() {
        // create click events
        // add to wordHolderInner and catch as it bubbles up
        $("#wordHolderInner").click(function (e) { letterClicked(e); });
    }

    function letterClicked(e) {
        if (e.target.id === "reset") {
            resetClicked();
        } else {
            var clickedElement = $("#" + e.target.id);
            if (clickedElement.attr("data-used") == undefined || clickedElement.attr("data-used") == "0") {
                clickedElement.addClass("letterPicked");
                var letterClicked = clickedElement.text();
                clickedElement.attr("data-used", "1");
                console.log("Clicked " + letterClicked);
                var div = $("<div/>", { id: "Result" + letterClicked, class:"letter", text: letterClicked });
                $("#answer").append(div);
                globs.answer += letterClicked;

                checkForFinish();
            } else { console.log("Already clicked"); }
        }
    }

    function resetClicked() {
        // clicked reset to removed checked letters
        $(".letter").removeClass("letterPicked").attr("data-used","0");
        $("#answer").html("");
        globs.answer = "";
        console.log("Reset");
    }

    function checkForFinish() {
        // spawned after click. See if all letters clicked
        if (globs.currentWord.length === globs.answer.length) {
            if (globs.currentWord == globs.answer) {
                console.log("Correct")
            } else { console.log("Wrong");}
        } else { console.log("all letters not picked yet");}
    }

    // start app
    retObj.start = function () {
        console.log("Starting Now!");
        newGame();
    }

    return retObj;
})