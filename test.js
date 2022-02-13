var str = "This is a message"
var letter = "E"

str.split("").forEach(element => {
    console.log(element ,element.toLowerCase() == letter.toLowerCase())
});