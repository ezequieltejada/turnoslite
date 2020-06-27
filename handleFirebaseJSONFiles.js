var fs = require("fs-extra");
var path = require("path");

const validOptions = ["pro", "dev", "production", "development"];
const files = [
  ".firebaserc",
  "firebase.json",
  "firestore.rules",
  "firestore.indexes.json",
];

const matchesBetweenEnvsAndValidOptions = process.argv.reduce(
  (acc, current) => {
    return validOptions.includes(current.substr(0, 3))
      ? current.substr(0, 3)
      : null;
  }
);

if (matchesBetweenEnvsAndValidOptions === "pro") {
  copyFirebaseFiles("production");
} else if (matchesBetweenEnvsAndValidOptions === "dev") {
  copyFirebaseFiles("development");
} else {
  console.error("Error: Invalid Argument");
  return new Error("Invalid Argument");
}

function copyFirebaseFiles(folder) {
  for (const file of files) {
    fs.copySync(path.resolve(__dirname, "firebaseEnvs", folder, file), file);
  }
}
