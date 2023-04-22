const fs = require("fs/promises");
const fsp = require("fs/promises");
const imageToBase64 = require("image-to-base64");
const GEN = require("./gen8.json");
console.log("gen ", GEN.length);
const FILE_PATH = "./relult.css";

try {
  fsp.unlink(FILE_PATH, "");
  //file removed
} catch (err) {
  console.error(err);
}

const writeCSS = content => {
  fsp.appendFile(FILE_PATH, content, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
};

const getName = i =>
  (i?.name || i?.href)
    .replaceAll(" ", "-")
    .replaceAll(":", "")
    .replaceAll("'", "")
    .replaceAll(".", "");

const promises = GEN.map(async i => {
  imageToBase64(i.img_normal) // Image URL
    .then(response => {
      const result = `
.pok-${getName(i)} {
  background-image: url(data:image/png;base64,${response});
}`;
      writeCSS(result);
      return console.log(getName(i) + " done");
    })
    .catch(error => {
      console.log(error); // Logs an error if there was one
    });

  imageToBase64(i.img_shiny) // Image URL
    .then(response => {
      const result = `
.poksh-${getName(i)} {
  background-image: url(data:image/png;base64,${response});
}`;
      writeCSS(result);
      return console.log(getName(i) + " shine done");
      // return console.log(result);
      // console.log(response); // "iVBORw0KGgoAAAANSwCAIA..."
    })
    .catch(error => {
      console.log(error); // Logs an error if there was one
    });
});
