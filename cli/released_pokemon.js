// const fsp = require("fs/promises");
// const axios = require('axios')
import fsp from 'fs/promises'
import axios from 'axios'

const FILE_PATH = './output/released_pokemon.json'

const getData = url => {
  return axios
    .get(url)
    .then(res => res.data)
    .catch(error => {
      console.log(error)
    })
}

try {
  fsp.unlink(FILE_PATH, '')
  //file removed
} catch (err) {
  console.error(err)
}

const writeJSON = content => {
  fsp.appendFile(FILE_PATH, content, err => {
    if (err) {
      console.error(err)
    }
    // file written successfully
  })
}

getData('https://pogoapi.net/api/v1/released_pokemon.json')
  .then(response => {
    const result = JSON.stringify(Object.keys(response))
    writeJSON(result)
  })
  .catch(error => {
    console.log(error) // Logs an error if there was one
  })
