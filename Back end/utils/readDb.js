
const fs = require ('fs');
const path = require('path');



const filePath = path.join(__dirname, '../db', 'initialDbBackup.json');

const data = fs.readFileSync(filePath)
const dataParsed = JSON.parse(data)

function readDb () {
    return dataParsed
}
module.exports =  readDb
