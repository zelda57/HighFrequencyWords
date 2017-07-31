$(document).ready(function () {
    // doc ready 
    m = new module();
    m.start();
})

var module = (function () {
    var r = {};

    r.start = function () {
        console.log("Starting Now!");
    }

    return r;
})