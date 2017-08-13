var d = {
    "A" : "Q",
    "B" : "W",
    "C" : "S",
    "D" : "A",
    "E" : "E",
    "F" : "R",
    "G" : "F",
    "H" : "D",
    "I" : "T",
    "J" : "Y",
    "K" : "H",
    "L" : "G",
    "M" : "U",
    "N" : "I",
    "O" : "K",
    "P" : "J",
    "Q" : "O",
    "R" : "P",
    "S" : "L",
    "T" : "Z",
    "U" : "C",
    "V" : "X",
    "W" : "V",
    "X" : "N",
    "Y" : "B",
    "Z" : "M"
}
var d1 = {
    "Q" : "A",
    "W" : "B",
    "S" : "C",
    "A" : "D",
    "E" : "E",
    "R" : "F",
    "F" : "G",
    "D" : "H",
    "T" : "I",
    "Y" : "J",
    "H" : "K",
    "G" : "L",
    "U" : "M",
    "I" : "N",
    "K" : "O",
    "J" : "P",
    "O" : "Q",
    "P" : "R",
    "L" : "S",
    "Z" : "T",
    "C" : "U",
    "X" : "V",
    "V" : "W",
    "N" : "X",
    "B" : "Y",
    "M" : "Z"
}
function enc(s, n) {
    var opt = "";
    var lines = s.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var words = lines[i].split(" ");
        for (var j = 0; j < words.length; j++) {
            var word = words[j];
            for (var k = 0; k < word.length; k++) {
                temp = word.charAt(k);
                if (temp.match("[A-Za-z]")) {
                    temp = temp.toUpperCase();
                    for (var l = 0; l < n; l++) {
                        temp = d[temp];
                    }
                    opt += temp.charCodeAt();
                } else {
                    opt += "#" + (temp.charCodeAt() * n + n) + "#";
                }
            }
            opt += " ";
        }
        opt += "\n";
    }
    return opt;
}
function dec(s) {
    var opt = "";
    var lines = s.split("\n");
    var n = lines[0] % 6;
    for (var i = 1; i < lines.length; i++) {
        var words = lines[i].split(" ");
        for (var j = 0; j < words.length; j++) {
            var word = words[j];
            var ind = 0;
            while (ind < word.length) {
                var temp = "";
                if (word.charAt(ind) != "#") {
                    temp += word.charAt(ind++);
                    temp += word.charAt(ind++);
                    temp = String.fromCharCode(temp);
                    for (var k = 0; k < n; k++) {
                        temp = d1[temp];
                    }
                } else {
                    ind++;
                    while (word.charAt(ind) != "#") {
                        temp += word.charAt(ind++);
                    }
                    ind++;
                    temp = (temp - n) / n
                    temp = String.fromCharCode(temp);
                }
                opt += temp;
            }
            opt += " ";
        }
        opt += "\n";
    }
    return opt;
}
function encrypt() {
    var n = Math.floor(Math.random() * 10000000);
    while (n % 6 == 0) {
        n = Math.floor(Math.random() * 10000000);
    }
    var inp = document.getElementById("in").value;
    document.getElementById("out").value = n + "\n" + enc(inp, n % 6);
}
function decrypt() {
    var inp = document.getElementById("in").value;
    document.getElementById("out").value = dec(inp);
}
