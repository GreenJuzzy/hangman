var cliselect = require("cli-select")
var chalk = require("chalk")

var translations = require("./data.json")

/**
 * Chooses random value in array
 * @param {String[]} array 
 * @returns Value
 */

exports.randomValue = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

/**
 * @param {String[]} array Options to choose
 * @returns Selected value
 */

exports.select = async (array, title) => {
    if (title) console.log(title + "\n")

    return new Promise((resolve) => {
        cliselect({
            values: array, defaultValue: 0, selected: chalk.cyan(">"), unselected: chalk.grey(">"), valueRenderer: (value, selected) => {
                return value
            }
        }).then(({ value }) => {
            console.clear()
            resolve(value)

        })
    })

}

/**
 * 
 * @param {string} fromLanguage Language to translate from
 * @param {string} toLanguage Language to translate to
 * @param {string} word The word to translate
 */

/*
exports.translate = (fromLanguage, toLanguage, word) => {
    for (i in translations.translations[fromLanguage]) {
        var selected = translations.translations[fromLanguage]

        if (typeof selected == "string") {
            if(selected.includes(word)) return translations.translations[fromLanguage]
        }

        if (typeof selected == "object") {

        }

    }
}
*/

/**
 * 
 * @param {string} string String to censor
 * @returns Censored string Default _
 */

exports.censorString = (string, censorKey = "_") => {
    var result = ""
    string = string.split("")

    for (i in string) {
        if (string[i] == " ") {
            result += " "
        } else {
            result += censorKey
        }
    }

    return result
}

/**
 * @param {string} completeString The full uncensored string
 * @param {string} censoredString The progress of censored string
 * @param {string} letter The letter to reveal
 */

exports.revealLetter = (completeString, censoredString, letter) => {
    var string = censoredString.split("")
    var correct = completeString.split("")
    var isCorrect = false
    var isCompleted = false

    for (i in string) {
        var correctSplit = correct[i].toString().toLowerCase()

        if (correctSplit == letter.toLowerCase()) {
            isCorrect = true
            string[i] = correct[i]
        }
    }

    string = string.join("")

    if (!string.includes("_")) isCompleted = true
    return { isCorrect, isCompleted, string }
}

exports.translate = (fromLanguage, word) => {

    for (k in translations.translations[fromLanguage]) {
        var selected = translations.translations[fromLanguage][k]
        if (typeof selected == "string") {
            if (word == selected) return k
        }

        else if (typeof selected == "object") {
            for (a in translations.translations[fromLanguage][k]) {
                if (word == translations.translations[fromLanguage][k][a]) return a
            }
        }
    }
}
