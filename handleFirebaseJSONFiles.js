var fs = require("fs-extra");
var path = require("path");

const validOptions = ["pro", "dev", "production", "development"];

const matchesBetweenEnvsAndValidOptions = process.argv.reduce(
  (acc, current) => {
    return validOptions.includes(current.substr(0, 3))
      ? current.substr(0, 3)
      : null;
  }
);

if (matchesBetweenEnvsAndValidOptions === "pro") {
  copyProdFirebaseJson();
} else if (matchesBetweenEnvsAndValidOptions === "dev") {
  copyDevFirebaseJson();
} else {
  console.error("Error: Invalid Argument");
  return new Error("Invalid Argument");
}

function copyProdFirebaseJson() {
  fs.copySync(path.resolve(__dirname, "firebase.prod.json"), "firebase.json");
}
function copyDevFirebaseJson() {
  fs.copySync(path.resolve(__dirname, "firebase.dev.json"), "firebase.json");
}
