const { remove } = require('lodash');
var minimongo = require('minimongo');

var LocalDb = minimongo.IndexedDb;
var RemoteDb = minimongo.RemoteDb
var localDb = new LocalDb({ namespace: 'TestingStorage' })
var remoteDb = new RemoteDb('http://localhost:3000/')

console.log(remoteDb)

const collections = { C1: 'c1', C2: 'c2' }

chrome.runtime.onInstalled.addListener(() => {
    localDb.addCollection(collections.C1)
    remoteDb.addCollection(collections.C1)
})

chrome.omnibox.onInputEntered.addListener((text) => {
    const textSplit = text.split(' ')
    const collection = textSplit[2]
    const data = { [`${textSplit[3]}`]: textSplit[4] }


    if (textSplit[0] === 'l') {
        switch (textSplit[1]) {
            case 'c':
                if (collection === collections.C1) {
                    localDb.collections[collections.C1].upsert(data)
                }
                else {
                    localDb.collections[collections.C2].upsert(data)
                }
                break
            case 'r':
                if (collection === collections.C1) {
                    console.log(data)
                    localDb.collections[collections.C1].findOne(data, {}, function (res) {
                        console.log(res)
                    })
                }
                else {
                    localDb.collections[collections.C2].find(data, {}, (res) => {
                        console.log(res)
                    })
                }
                break
            case 'd':
                if (collection === collections.C1) {
                    localDb.collections[collections.C1].remove(data, () => { })
                }
                else {
                    localDb.collections[collections.C2].remove(data, () => { })
                }
                break
            default:
                console.log(`${operation} is not a valid operation.`)
        }

    } else {
        switch (textSplit[1]) {
            case 'c':
                console.log('case "c"')
                if (collection === collections.C1) {
                    console.log('upserting data')
                    try {
                        console.log(data)
                        remoteDb.collections[collections.C1].upsert(data)
                    }
                    catch { console.log('err') }
                }
                else {
                    remoteDb.collections[collections.C2].upsert(data)
                }
                break
            case 'r':
                if (collection === collections.C1) {
                    console.log(data)
                    remoteDb.collections[collections.C1].findOne(data, {}, function (res) {
                        console.log(res)
                    })
                }
                else {
                    remoteDb.collections[collections.C2].find(data, {}, (res) => {
                        console.log(res)
                    })
                }
                break
            case 'd':
                if (collection === collections.C1) {
                    remoteDb.collections[collections.C1].remove(data, () => { })
                }
                else {
                    remoteDb.collections[collections.C2].remove(data, () => { })
                }
                break
            default:
                console.log(`${operation} is not a valid operation.`)
        }
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