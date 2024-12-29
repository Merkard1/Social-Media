// rm -rf ./node_modules/.cashe - Mac/Linux

const fs = require("fs");
const path = require("path");

// Path to the node_modules/.cache directory
const cacheDir = path.join(__dirname, "../node_modules/.cache");

if (fs.existsSync(cacheDir)) {
  fs.rm(cacheDir, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error(`Error deleting .cache directory: ${err}`);
    } else {
      console.log(".cache directory deleted successfully");
    }
  });
} else {
  console.log(".cache directory does not exist.");
}
