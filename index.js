var cliselect = require("cli-select")
var chalk = require("chalk")
var readline = require("readline")

process.setMaxListeners(Infinity)

var allLanguages = ""
var languagesArray = []

var options = {
    tries: 10,
    finished: false
}

var storage = {
    wrongLetters: ""
}

var difficulties = {
    "Hard": { // Use translate to get this
        Norsk: ["Hovedstaden i Norge er Oslo", "Norge er ett land i Europa", "Harald V er kongen i Norge", "Norge er det fjerde største landet i Europa"],
        English: ["London is the capital of England", "Queen Elizabeth II is queen of the United Kingdom", ""],
        Deutsch: ["Früher war Deutschland ein getrenntes Land", "Deutschland ist ein Wirtschaftlich starkes Land"],
        Español: [""],
    },
    "Easy": { // Use translate to get this
        Norsk: ["Hovedstad", "Oslo", "Norge", "Europa", "Sommer", "Vinter"],
        English: ["Queen"],
        Deutsch: ["Auffrischen", "Zug", "Vrienden", ""],
        Español: ["Amiga", ""]
    }
}

var translations = {
    "Norsk": {
        start: ["Språk"],
        which: ["Hvilken vansklighetsgrad vil du velge?"],
        difficulty: ["Vanskelig", "Lett"],
        correct: ["Det riktige svaret var,"],
        state: ["Du vant!", "Du tapte!"],
        again: ["Vil du spille på nytt?"],
        answer: ["Ja.", "Nei."],
        end: ["Takk for at du spilte!"]
    },
    "English": {
        start: ["Language"],
        which: ["What difficulty would you like to choose?"],
        difficulty: ["Hard", "Easy"],
        correct: ["The correct answer was,"],
        state: ["You win!", "You lost!"],
        again: ["Would you like to play again?"],
        answer: ["Yes.", "No."],
        end: ["Thank you for playing!"]
    },
    "Deutsch": {
        start: ["Sprache"],
        which: ["Auf welcher Schwierigkeits Stufe willst du spielen?"],
        difficulty: ["Schwer", "Einfach"],
        correct: ["Die richtige Antwort war,"],
        state: ["Gewonnen!", "Verloren!"],
        again: ["Nochmal spielen?"],
        answer: ["Ja.", "Nein."],
        end: ["Vielen dank fürs Spielen!"],
        characters: {
            "ae": "ä",
            "AE": "Ä",
            "oe": "ö",
            "OE": "Ö",
            "UE": "Ü",
            "ue": "ü",
            "ss": "ß",
            "SS": "ß"
        }
    },
    "Español": {
        start: ["Idioma"],
        which: ["¿Qué dificultad te gustaría elegir?"],
        difficulty: ["Difícil", "Fácil"],
        correct: ["La respuesta correcta fue,"],
        state: ["¡Tú ganas!", "¡Perdiste!"],
        again: ["¿Te gustaría volver a jugar?"],
        answer: ["Si.", "No."],
        end: ["¡Gracias por jugar!"]
    }
}


var sleep = (ms = 100) => new Promise((r) => setTimeout(r, ms));

/**
 * 
 * @param {String[]} Array Expects array
 * @example
 * var buyThisPet = randomArray(["Cat", "Dog", "Parrot"])
 */

var randomArray = (Array) => {
    return Array[Math.floor(Math.random() * Array.length)]
}

/**
 * 
 * @param {String[]} Array Expects array
 * @example
 * await select(["Cat", "Dog", "Parrot"]).then(console.log)
 */

var select = (Array) => {
    return cliselect({
        values: Array, defaultValue: 0, selected: chalk.cyan(">"), unselected: chalk.grey(">"), valueRenderer: (value, selected) => {
            return value
        }
    })
}



/**
 * 
 * @param {String} fromLanguage The language the word is in.
 * @param { "start" | which" | "difficulty" | "correct" | "state" | "again" | "answer" | "end"} element 
 * @param {String} word The word you want to translate from.
 * @example
 * // Only made for this.
 * var translatedMessage = translate("Norwegian", "answer", "Ja.")
 */

var translate = (fromLanguage, element, word) => {
    for (_ in translations[fromLanguage]) {
        for (r in translations[fromLanguage][element]) {
            for (i in translations[fromLanguage][element][r]) {
                if (translations[fromLanguage][element][i].toLowerCase() == word.toLowerCase()) return translations["English"][element][i]
            }
        }
    }
}

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


languagesArray = Object.keys(translations)
languagesArray.map((value, index, array) => {
    if (array[index + 1]) {
        allLanguages += `${translations[value].start[0]} | `
    } else {
        allLanguages += `${translations[value].start[0]}`
    }
})


async function main() {
    var selectedLanguage
    var selectedDifficulty
    var randomWord
    var currentWord


    async function wonGame() {
        console.clear()

        console.log(`${translations[selectedLanguage].state[0]}\n\n${translations[selectedLanguage].correct}`)
    }

    async function lostGame() {
        

        console.log(translations[selectedLanguage].state[1])
    }

    async function ask() {
        console.log(allLanguages, "\n")
        await select(languagesArray).then(result => {
            selectedLanguage = result.value
            console.clear()
        })

        console.log(translations[selectedLanguage].which[0], "\n")
        await select(translations[selectedLanguage].difficulty).then(result => {
            selectedDifficulty = result.value
            randomWord = randomArray(difficulties[translate(selectedLanguage, "difficulty", selectedDifficulty)][selectedLanguage])
            currentWord = censorString(randomWord)
            console.clear()
        })
    }

    async function askLetter() {
        process.stdin.resume()
        console.log(`${currentWord}\n\nYou have ${chalk.cyan(options.tries)} tries left.\n\n${storage.wrongLetters}`)
        await sleep()
        
        process.stdin.once("data", data => {

            data = data.toString()
            data = data.replace("\r\n", "")
            data = data.length >= 2 ? selectedLanguage == "Deutsch" ? translations[selectedLanguage].characters[data] != undefined ? translations[selectedLanguage].characters[data] : data : data : data
            if (data == "") return askLetter()
            console.log(data)
            if (data.length >= 3) return askLetter()
            currentWord = revealLetter(randomWord, currentWord, data).string
            var revealed = revealLetter(randomWord, currentWord, data)
            
            if (revealed.completed) return wonGame()
            if (revealed.ifCorrect == false) options.tries--
            if (revealed.ifCorrect == false) storage.wrongLetters += `${data} `
            if (options.tries == 0) return lostGame()

            
            askLetter()
        })
        

    }


    async function startGame() {
        askLetter()

    }

    console.clear()
    await ask()
    
    console.clear()
    await startGame()


}

main()


/* Deutsch
Ü = ue
Ä = ae
Ö = oe
ß = ss
*/