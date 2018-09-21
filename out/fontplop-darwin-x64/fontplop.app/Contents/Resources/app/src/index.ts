import { app, BrowserWindow, ipcMain, Menu, shell, dialog } from "electron";
import installExtension, {
    REACT_DEVELOPER_TOOLS
} from "electron-devtools-installer";
import { enableLiveReload } from "electron-compile";
import processFonts from "./process-fonts";
import * as path from "path";

const checkUpdates = require("./checkupdates");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;
const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
    enableLiveReload({ strategy: "react-hmr" });
}

const createWindow = async () => {
    mainWindow = new BrowserWindow({
        width: isDevMode ? 800 : 230,
        height: isDevMode ? 800 : 200,
        resizable: !!isDevMode,
        show: false,
        backgroundColor: "#000",
        titleBarStyle: "hiddenInset",
        fullscreen: false,
        fullscreenable: false,
        maximizable: false,
        icon: path.join(__dirname, "src/fontplop-app-icon.png")
    });

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // Open the DevTools.
    if (isDevMode) {
        await installExtension(REACT_DEVELOPER_TOOLS);
        mainWindow.webContents.openDevTools();
    }

    mainWindow.once("ready-to-show", () => {
        if (mainWindow) {
            mainWindow.show();
        }
    });

    // Emitted when the window is closed.
    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    // Call auto-updater
    mainWindow.webContents.on("did-frame-finish-load", () => {
        // checkUpdates()
        if (!isDevMode) {
            checkUpdates();
        }
    });

    const showOpen = function() {
        dialog.showOpenDialog(
            {
                properties: ["openFile", "openDirectory", "multiSelections"],
                filters: [{ name: "fontplop", extensions: ["ttf", "otf"] }]
            },
            filePaths => {
                processFonts(filePaths);
            }
        );
    };

    const menu = Menu.buildFromTemplate([
        {
            submenu: [
                {
                    label: "About fontplop",
                    click: () => {
                        shell.openExternal("http://www.fontplop.com");
                    }
                },
                {
                    label: "Check for Updates...",
                    click: () => checkUpdates({ forceCheck: true })
                },
                { type: "separator" },
                { role: "quit" }
            ]
        },
        {
            label: "File",
            submenu: [
                {
                    label: "Open",
                    click: function() {
                        showOpen();
                    }
                }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

/*
  The following creates a listener to handle files dropped onto the window
  and files dropped onto app icon in dock or in Finder
*/
ipcMain.on("process-fonts", (event: any, files: Array<string>) => {
    event.preventDefault();
    processFonts(files);
});

app.on("open-file", function(event: any, filePaths: Array<string>) {
    event.preventDefault();

    if (app.isReady()) {
        processFonts(filePaths);
    } else {
        app.once("ready", () => {
            processFonts(filePaths);
        });
    }
});
