const fs = require("fs/promises");
const fsp = require("fs/promises");
// const imageToBase64 = require("image-to-base64");
// const GEN = require("./gen8.json");
// console.log("gen ", GEN.length);
const FILE_PATH = "./data.json";
const axios = require('axios')


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

const promises = new Array(902).fill(0).map(async (_, i) => {
  return await getData('https://pokeapi.co/api/v2/pokemon-species/' + (1+i)) // URL

    .then(response => {
      const {is_baby, is_legendary,is_mythical,has_gender_differences,forms_switchable} = response
      const result = `${i === 0 ? '' : ','}
"${1+i}": { "is_baby": ${is_baby}, "is_legendary": ${is_legendary}, "is_mythical": ${is_mythical}, "has_gender_differences": ${has_gender_differences}, "forms_switchable": ${forms_switchable} }`;
      writeJSON(result);
      return console.log(i + " done");
    })
    .catch(error => {
      console.log(error); // Logs an error if there was one
    });
});

Promise.all(promises).then(() => writeJSON(`
}`))
