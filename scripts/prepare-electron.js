/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const electronPkgJson = require("../electron/package.json");
const parentPkgJson = require("../package.json");

// Overwrite nested package.json info with parents - No longer needs to be updated twice
electronPkgJson.name = parentPkgJson.name;
electronPkgJson.productName = parentPkgJson.productName;
electronPkgJson.version = parentPkgJson.version;
electronPkgJson.description = parentPkgJson.description;
fs.writeFileSync(path.join(__dirname, "..", "electron", "package.json"), JSON.stringify(electronPkgJson, null, 2));
