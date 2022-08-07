(() => {
  "use strict";
  var e = {};
  ((e) => {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
      Object.defineProperty(e, "__esModule", { value: !0 });
  })(e);
  const o = require("electron");
  var n = function () {
    var e = new o.BrowserWindow({ height: 600, width: 800, webPreferences: { preload: void 0 } });
    e.loadURL(`file://${require("path").resolve(__dirname, "..", "renderer", "main_window", "index.html")}`),
      e.webContents.openDevTools();
  };
  o.app.on("ready", n),
    o.app.on("window-all-closed", function () {
      "darwin" !== process.platform && o.app.quit();
    }),
    o.app.on("activate", function () {
      0 === o.BrowserWindow.getAllWindows().length && n();
    }),
    (module.exports = e);
})();
//# sourceMappingURL=index.js.map
