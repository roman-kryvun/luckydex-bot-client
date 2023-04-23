import fsp from "fs/promises"
const FILE_PATH = "./data.json";
import axios from'axios';


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

const result = {}

const promises = new Array(1010).fill(0).map(async (_, i) => {
  return await getData('https://pokeapi.co/api/v2/pokemon-species/' + (1+i)) // URL

    .then(response => {
      const {is_baby, is_legendary,is_mythical,has_gender_differences,forms_switchable} = response

      result[1+i + ''] = { "is_baby": is_baby, "is_legendary": is_legendary, "is_mythical": is_mythical, "has_gender_differences": has_gender_differences, "forms_switchable": forms_switchable };
//       const result = `
// ,"${1+i}": { "is_baby": ${is_baby}, "is_legendary": ${is_legendary}, "is_mythical": ${is_mythical}, "has_gender_differences": ${has_gender_differences}, "forms_switchable": ${forms_switchable} }`;
//       writeJSON(result);
      return console.log('done  '+i);
    })
    .catch(error => {
      console.error('error '+i);
      console.log(error); // Logs an error if there was one
    });
});

// writeJSON('{')
// Promise.all(promises).then(() => writeJSON(`
// }`))

Promise.all(promises).then(() => writeJSON(JSON.stringify(result)));
