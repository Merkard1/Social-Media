const createTemplate = require("./templates/createTemplate");

const layer = process.argv[2];
const sliceName = process.argv[3];

const layers = ["4_features", "5_entities", "2_pages"];

if (!layer || !layers.includes(layer)) {
  throw new Error(`Укажите слой ${layers.join(" или ")}`);
}

if (!sliceName) {
  throw new Error("Укажите название слайса");
}

createTemplate(layer, sliceName);
