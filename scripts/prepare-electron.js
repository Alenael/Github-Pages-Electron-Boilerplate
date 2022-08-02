/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const copydir = require("copy-dir");
const electronPkgJson = require("../electron/package.json");
const parentPkgJson = require("../package.json");

const src = path.join(__dirname, "..", ".webpack/renderer/main_window/");
const dest = path.join(__dirname, "..", "electron", "out-resources");

// Copy build dir to electron out-resources, which is where electron-forge
// looks for source files.
rimraf.sync(dest);
copydir(src, dest, {});

// Overwrite nested package.json version, because this is what electron-forge
// uses to set the version in the Electron app.
electronPkgJson.version = parentPkgJson.version;
fs.writeFileSync(path.join(__dirname, "..", "electron", "package.json"), JSON.stringify(electronPkgJson, null, 2));
