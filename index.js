
const fs = require('fs')
const superagent = require('superagent')

const readFileName = `${__dirname}/dosg.txt`
const writeFileName = `${__dirname}/dog-img.txt`

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('Could not find the source file 😭')
            resolve(data)
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('File not found')
            resolve('success')
        })
    })
}

// With Promise
readFilePro(readFileName)
    .then(data => {
        console.log('File content: (with promise): ' + data)
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    })
    .then(res => {
        console.log(res.body.message)
        return writeFilePro(writeFileName, res.body.message)
    })
    .then(() => {
        console.log('Data written to the file')
    })
    .catch(err => {
        console.log('Error occured ' + err.message)
    })