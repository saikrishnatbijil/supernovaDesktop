const axios = require("axios");
const Toastify = require("toastify-js");
const { contextBridge, ipcRenderer } = require("electron");


contextBridge.exposeInMainWorld("axios", {
  get: (url) => axios.get(url),
});

contextBridge.exposeInMainWorld("Toastify", {
  toast: (options) => Toastify(options).showToast(),
});

