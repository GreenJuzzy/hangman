var cliselect = require("cli-select")
var chalk = require("chalk")

var selectedLanguage
var difficulty

var randomArray = (Array) => {
    return Array[Math.floor(Math.random() * Array.length)]
}

var select = (Data) => {
    return cliselect({
        values: Data, defaultValue: 0, selected: chalk.cyan(">"), unselected: chalk.grey(">"), valueRenderer: (value, selected) => {
            return value
        }
    })
}

var hard = {
    Norsk: ["Hovedstaden i Norge er Oslo", "Norge er ett land i Europa", "Harald V er kongen i Norge"],
    English: ["London is the capital of England", "Queen Elizabeth II is queen of the United Kingdom", ""],
    Deutch: [""],
    Spanish: [""],
}

var easy = {
    Norsk: ["Hovedstad", "Oslo", "Norge", "Europa", "Sommer", "Vinter"],
    English: [""],
    Deutch: [""],
    Spanish: [""]
}

var translations = {
    Norsk: {
        difficulty: ["Vanskelig", "Lett"]
    },
    English: {
        difficulty: ["Hard", "Easy"]
    }
}

async function ask() {
    await select(["Norsk", "English", "Deutch", "Espnaol"]).then(result => {
        selectedLanguage = result.value
        console.clear()
    })

    

    select(translations[selectedLanguage].difficulty).then(result => {
        randomDifficulty
        result.value[Math.random(Math.floor() * hard[selectedLanguage])]
        
    })
}

async function main() {



}

ask()