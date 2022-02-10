var cli

var difficulties = {
    "Hard": { // Use translate to get this
        Norsk: ["Hovedstaden i Norge er Oslo", "Norge er ett land i Europa", "Harald V er kongen i Norge", "Norge er det fjerde største landet i Europa"],
        English: ["London is the capital of England", "Queen Elizabeth II is queen of the United Kingdom", ""],
        Deutsch: ["Früher war Deutschland ein getrenntes Land", "Deutschland ist ein Wirtschaftlich starkes Land"],
        Español: [""],
    },
    "Easy": { // Use translate to get this
        Norsk: ["Hovedstad", "Oslo", "Norge", "Europa", "Sommer", "Vinter"],
        English: ["Queen", ""],
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