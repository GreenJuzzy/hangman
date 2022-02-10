var censorString = (string) => {
    var result = ""
    for (i in string.split("")) {
        if (string.split("")[i] == " ") {
            result += " "
        }
        if (string.split("")[i] !== " ") {
            result += "_"
        }
    }
    return result
}

var revealLetter = (correctMessage, theCensored, letter) => {
    var string = theCensored.split("")
    var correcta = correctMessage.split("")
    var ifCorrect = false
    var completed = false
    for (i in string) {
        var correctSplit = correcta[i].toString().toLowerCase()
        if (correctSplit == letter.toLowerCase()) {
            ifCorrect = true
            string[i] = correcta[i]
        }
    }

    string = string.join("")

    
    if (!string.includes("_")) completed = true
    return { string, ifCorrect, completed }
}

var theCorrect = "This message is censored"

var censored = censorString(theCorrect)

console.log(typeof theCorrect, typeof censored)
console.log(revealLetter(theCorrect, censored, "e"))