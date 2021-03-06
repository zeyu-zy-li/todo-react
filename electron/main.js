// Modules to control application life and create native browser window
const {app, Menu, BrowserWindow, Tray} = require('electron')
const path = require('path')

let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  const baseURL = "http://localhost:3000";
  const template = [
    {
      label: 'File',
      submenu: [{ role: 'quit' }]
    },
    {
      label: 'Edit',
      submenu: [{role: 'undo'}, {role: 'redo'}]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'All',
          click() {mainWindow.webContents.send("filterChange", "All")}
        },
        {
          label: 'Active',
          click() {mainWindow.webContents.send("filterChange", "Active")}
        },
        {
          label: 'Completed',
          click() {mainWindow.webContents.send("filterChange", "Completed")}
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // and load the index.html of the app.
  mainWindow.loadURL(baseURL);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('minimize', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  tray = new Tray(path.join(__dirname, "../public/favicon.ico"));
  tray.on('click', () => {
    mainWindow.show();
  })

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
