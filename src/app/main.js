/**
 * Include our app
 */
const {app, BrowserWindow, Menu } = require('electron');
const  backend = require('./backend'); 
const augurypath = "/home/hp/.config/google-chrome/Default/Extensions/elgalmkoelokbchhkhacckoklkejnhcd/1.2.5_0";

// browser-window creates a native window
let mainWindow = null;

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const createWindow = () => {

  // Initialize the window to our specified dimensions
  
  mainWindow = new BrowserWindow({ width: 1200, height: 900 });
  // makeMenu();
  // Set Event Handlers
  backend.EventHandler(mainWindow);
  
  // Tell Electron where to load the entry point from
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  

  // Clear out the main window when the app is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

let makeMenu = () => {
  const template = [
    {
      label: 'View',
      submenu: [
        {
          label: 'Key Bindings',
          click() { mainWindow.send('open-bindings'); }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};