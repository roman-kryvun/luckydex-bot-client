// const fsp = require("fs/promises");
// const axios = require('axios')
import fsp from "fs/promises";
import axios from 'axios';

const FILE_PATH = "./output/generations.json";

const getData = (url) => {
  return axios.get(url)
    .then(res =>  res.data)
    .catch(error => {
      console.log(error)
    })
}

try {
  fsp.unlink(FILE_PATH, "");
  //file removed
} catch (err) {
  console.error(err);
}

const writeJSON = content => {
  fsp.appendFile(FILE_PATH, content, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
};

writeJSON('{')

const promises = new Array(9).fill(0).map(async (_, i) => {
  return await getData('https://pokeapi.co/api/v2/generation/' + (1+i)) // URL
    .then(response => {
      const {pokemon_species = []} = response
      const result = `
,"${1+i}": ${JSON.stringify(pokemon_species)}`;
      writeJSON(result);
      return console.log(i + " done");
    })
    .catch(error => {
      console.log(error); // Logs an error if there was one
    });
});

Promise.all(promises).then(() => writeJSON(`
}`))
