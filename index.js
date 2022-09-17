/**
 * Stores how many tries and wrong letters
 */

 var storage = {
    tries: 5,
    stageCounter: 1,
    wrongLetters: []
}

var functions = require("./functions")
var translations = require("./data.json")
const chalk = require("chalk")


async function startGame() {
    process.stdin.pause()
    
    storage = {
        tries: 5,
        stageCounter: 1,
        wrongLetters: []
    }

    console.clear()

    // Asks the user for language selection ( translations.language -> English, Deutsch... )
    var languageName = await functions.select(translations.languages, translations.languages.map(h => translations.translations[h].language).join(" | "))
    var language = translations.translations[languageName]

    // Asks the user to chose difficulty
    var difficulty = await functions.select(language.difficulty, language.option)
    var randomWord = functions.randomValue(translations.difficulties[functions.translate(languageName, difficulty)][languageName])

    // Replaces all characters with underline ( _ )
    var censoredString = functions.censorString(randomWord)
    var completeWord = randomWord

    await askLetter(censoredString, completeWord, languageName)
}

async function askLetter(censoredString, completeString, languageName) {
    console.clear()
    process.stdin.resume()

    console.log(translations.stages[storage.stageCounter].join("\n"))
    console.log(`\n`)
    console.log(censoredString)
    console.log(`\n`)
    console.log(storage.wrongLetters.join(" "))

    process.stdin.once("data", data => {
        data = data.toString().trim()
        process.stdin.pause()

        if (data.length > 1 && languageName !== "English" && translations.translations[languageName].characters[data]) data = translations.translations[languageName].characters[data]

        if (data.length === 0 || data.length >= 2) return askLetter(censoredString, completeString, languageName)

        if (storage.wrongLetters.includes(data.toLowerCase())) return askLetter(censoredString, completeString, languageName)
        censoredString = functions.revealLetter(completeString, censoredString, data)

        if (censoredString.isCompleted) return wonGame(censoredString.string, completeString, languageName)
        if (!censoredString.isCorrect) {
            storage.tries--
            storage.stageCounter++
            storage.wrongLetters.push(data.toLowerCase())
        }

        if (storage.tries <= 0) return lostGame(censoredString.string, completeString, languageName)


        askLetter(censoredString.string, completeString, languageName)
    })



}

async function wonGame(censoredString, completeString, languageName) {
    console.clear()


    console.log(translations.stages[storage.stageCounter].join("\n"))
    console.log(`\n`)
    console.log(completeString)

    console.log(translations.translations[languageName].state.won)
    console.log(`\n`)
    var playAgain = await functions.select([translations.translations[languageName].answer.yes, translations.translations[languageName].answer.no], translations.translations[languageName].again)

    if(functions.translate(languageName, playAgain) == "yes") {
        startGame()
    } else {
        console.clear()
        console.log(translations.translations[languageName].end)
    }
}

async function lostGame(censoredString, completeString, languageName) {
    console.clear()

    var splitCensored = censoredString.split("")

    for(i in splitCensored) {
        if(splitCensored[i] == "_") splitCensored[i] = chalk.red(completeString.split("")[i])
    }

    console.log(translations.stages["6"].join("\n"))
    console.log(`\n`)
    console.log(splitCensored.join(""))

    console.log(translations.translations[languageName].state.lost)
    console.log(`\n`)
    var playAgain = await functions.select([translations.translations[languageName].answer.yes, translations.translations[languageName].answer.no], translations.translations[languageName].again)

    if(functions.translate(languageName, playAgain) == "yes") {
        startGame()
    } else {
        console.clear()
        console.log(translations.translations[languageName].end)
    }
}


startGame()
