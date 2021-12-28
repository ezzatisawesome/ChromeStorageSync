const { remove } = require("lodash");
var minimongo = require("minimongo");

var LocalDb = minimongo.IndexedDb;
var RemoteDb = minimongo.RemoteDb
var db = new LocalDb({ namespace: 'TestingStorage' })
var db2 = new RemoteDb()

const collections = { C1: 'c1', C2: 'c2' }

chrome.runtime.onInstalled.addListener(() => {
    db.addCollection(collections.C1)
    db.addCollection(collections.C2)
})

chrome.omnibox.onInputEntered.addListener((text) => {
    const textSplit = text.split(' ')
    const collection = textSplit[1]

    const data = { [`${textSplit[2]}`]: textSplit[3] }

    switch (textSplit[0]) {
        case 'c':
            if (collection === collections.C1) {
                db.collections[collections.C1].upsert(data)
            }
            else {
                db.collections[collections.C2].upsert(data)
            }
            break
        case 'r':
            if (collection === collections.C1) {
                console.log(data)
                db.collections[collections.C1].findOne(data, {}, function (res) {
                    console.log(res)
                })
            }
            else {
                db.collections[collections.C2].find(data, {}, (res) => {
                    console.log(res)
                })
            }
            break
        case 'd':
            if (collection === collections.C1) {
                db.collections[collections.C1].remove(data, () => { })
            }
            else {
                db.collections[collections.C2].remove(data, () => { })
            }
            break
        default:
            console.log(`${operation} is not a valid operation.`)
    }
})


// The Road goes ever on and on,
// Down from the door where it began.
// Now far ahead the Road has gone,
// And I must follow, if I can,
// Pursuing it with eager feet,
// Until it joins some larger way
// Where many paths and errands meet.
// And whither then? I cannot say.

// The Road goes ever on and on
// Out from the door where it began.
// Now far ahead the Road has gone,
// Let others follow it who can!
// Let them a journey new begin,
// But I at last with weary feet
// Will turn towards the lighted inn,
// My evening-rest and sleep to meet.