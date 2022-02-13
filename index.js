var cliselect = require("cli-select")
var chalk = require("chalk")


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
    "Hard": {
        Norsk: ["Hovedstaden i Norge er Oslo", "Norge er ett land i Europa", "Harald V er kongen i Norge", "Norge er det fjerde største landet i Europa"],
        English: ["London is the capital of England", "Queen Elizabeth II is queen of the United Kingdom"],
        Deutsch: ["Frher war Deutschland ein getrenntes Land", "Deutschland ist ein Wirtschaftlich starkes Land"],
        Español: ["Madrid es la capital de España"],
    },
    "Easy": {
        Norsk: ["Hovedstad", "Oslo", "Norge", "Europa", "Sommer", "Vinter"],
        English: ["Queen", "London", "Math", "Physical", "Activities", "Pod", "Calender", "Backpack", "Telescope", "Night", "Day", "Sky", "Nights", "Nightsky", "Door", "Iron", "Wood", "Tree", "Leave", "Lost", "Win", "Place", "Sugar", "Dad", "Mom"],
        Deutsch: ["Auffrischen", "Zug", "Vrienden", "Freundin", "Ziel", "Kirche", "Lampe", "Übermorgen", "Normalität", "Schrank", "Sicherheit", "Universum", "Prozent", "Deutschland"],
        Español: ["Amiga", "Madrid", "Cafè", "Silla", "Tarjetas", "Escritorio", ]
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
        end: ["Takk for at du spilte!"],
        left: (word, tries, letters) => {
            return `${word}\n\nDu har ${tries} forsøk igjen.\n\n${letters}`
        },
        characters: {
            "ae": "æ",
            "AE": "Æ",
            "oo": "ø",
            "OO": "Ø",
            "aa": "å",
            "AA": "Å"
        }
    },
    "English": {
        start: ["Language"],
        which: ["What difficulty would you like to choose?"],
        difficulty: ["Hard", "Easy"],
        correct: ["The correct answer was,"],
        state: ["You win!", "You lost!"],
        again: ["Would you like to play again?"],
        answer: ["Yes.", "No."],
        end: ["Thank you for playing!"],
        left: (word, tries, letters) => {
            return `${word}\n\nYou have ${tries} tries left.\n\n${letters}`
        }
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
        left: (word, tries, letters) => {
            return `${word}\n\nSie haben noch ${tries} Versuche.\n\n${letters}`
        },
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
        end: ["¡Gracias por jugar!"],
        left: (word, tries, letters) => {
            return `${word}\n\nTe quedan ${tries} intentos,\n\n${letters}`
        },
        characters: {
            "aa": "à",
            "AA": "à",
            "ee": "è",
            "EE": "È",
            "ii": "ì",
            "II": "Ì",
            "oo": "ò",
            "OO": "Ò",
            "uu": "ü",
            "UU": "Ü",
            "nn": "ñ",
            "NN": "Ñ"
        }
    }
}


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
 * @param {"start" | which" | "difficulty" | "correct" | "state" | "again" | "answer" | "end"} element 
 * @param {String} word The word you want to translate from.
 * @example
 * // Only made for this.
 * var translatedMessage = translate("Norwegian", "answer", "Ja.")
 */

var translate = (fromLanguage, element, word) => {
    for (_ in translations[fromLanguage]) {
        for (language in translations[fromLanguage][element]) {
            for (i in translations[fromLanguage][element][language]) {
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
    var correct = correctMessage.split("")
    var ifCorrect = false
    var completed = false
    for (i in string) {
        var correctSplit = correct[i].toString().toLowerCase()
        if (correctSplit == letter.toLowerCase()) {
            ifCorrect = true
            string[i] = correct[i]
        }
    }

    string = string.join("")


    if (!string.includes("_")) completed = true
    return { string, ifCorrect, completed, }
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
        process.stdin.pause()
        console.log(`${translations[selectedLanguage].state[0]}\n\n${translations[selectedLanguage].correct} ${chalk.cyan(randomWord)}`)
    }

    async function lostGame() {
        console.clear()
        process.stdin.pause()
        console.log(`${translations[selectedLanguage].state[1]}\n\n${translations[selectedLanguage].correct} ${chalk.cyan(randomWord)}`)
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
        console.clear()
        process.stdin.resume()
        console.log(translations[selectedLanguage].left(currentWord, chalk.cyan(options.tries), storage.wrongLetters))
        process.stdin.once("data", data => {
            process.stdin.pause()

            data = data.toString()
            data = data.replace("\r\n", "")
            data = data.length > 1 ? selectedLanguage == "Deutsch" || selectedLanguage == "Español" || selectedLanguage == "Norsk" ? translations[selectedLanguage].characters[data] != undefined ? translations[selectedLanguage].characters[data] : data : data : data
            for(i in storage.wrongLetters.split(" ")) {
                if(storage.wrongLetters.split(" ")[i].toLowerCase() == data.toLowerCase()) return askLetter()
            }
            if (data == "") return askLetter()
            if (data.length > 1) return askLetter()
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