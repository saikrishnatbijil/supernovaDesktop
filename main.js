const path = require("path");
const { app, BrowserWindow, dialog, ipcMain, Menu } = require("electron");
const TrayGenerator = require("./TrayGenerator");
const Store = require('electron-store');

process.env.NODE_ENV = "production";

const isMac = process.platform === "darwin";
const isDev = process.env.NODE_ENV === "production";

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: isDev ? 630 : 1000,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    alwaysOnTop: true,
    hiddenInMissionControl: true,
  });
  if(app.dock.isVisible()) {
    app.dock.hide();
  }
  // open devtools if in development mode
  if (!isDev) {
    mainWindow.webContents.openDevTools();
  }
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
};

const schema = {
  launchAtStart: true
}
const store = new Store(schema);

// App is ready
app.whenReady().then(() => {
  createWindow();
  const Tray = new TrayGenerator(mainWindow, store, '12');
  Tray.createTray();
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.on("closed", () => (mainWindow = null));

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Menu template
const menuTemplate = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: "Quit",
              click: () => app.quit(),
              accelerator: "CmdOrCtrl+Q",
            },
          ],
        },
      ]
    : []),
  {
    role: "fileMenu",
  },
];

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
