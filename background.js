var minimongo = require("minimongo");
var LocalDb = minimongo.LocalStorageDb;
var db = new LocalDb()
db.addCollection("annotations")

chrome.omnibox.onInputEntered.addListener((text) => {
    const textSplit = text.split(' ')
    const operation = textSplit[0]
    const data = textSplit[1]

    switch (operation) {
        case 'C':
            const doc = { writing: data }
            db.annotations.upsert(doc, () => {
                console.log(db)
            })
            break
        case 'R':
            db.annotations.findOne({ writing: data }, {}, (res) => {
                console.log("Annotation data: " + res.name);
            })
            break
        default:
            console.log(`${operation} is not a valid operation.`)
    }
})