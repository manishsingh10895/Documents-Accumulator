"use strict";

const { ipcMain } = require('electron');
const { spawn }  = require('child_process');
const FileFinder = require('./fileFinder');
const DataManager = require('./dataManager');
const { shell } = require('electron');


let handleEvents = (mainWindow) => {
    handleFetchFiles(mainWindow);
    handleDataPersistance(mainWindow); 
};

let handleDataPersistance = mainWindow => {
    ipcMain.on('save-data', (err, args)=> {
        DataManager.saveData(args.data, (err)=> {
            mainWindow.send('data-saved', { error: err });
        });      
    });

    ipcMain.on('fetch-data', (err)=> {
        DataManager.fetchData((error, data) => {
            if(error) return mainWindow.send('data-fetched', { error: error });
            let validData = JSON.parse(data);
            mainWindow.send('data-fetched', { data: validData });
        });
    });
};

let handleFetchFiles = (mainWindow) => {
    ipcMain.on('fetch-all-files', (err, args)=> {
        FileFinder.findFilesInDirectory('.pdf', args.directory, (err, files, dir)=> {
            let response = { error: null, files: null };
            if(err) mainWindow.send('all-files-fetched', { error: err });

            mainWindow.send('all-files-fetched', { files: files, directory: args.directory });
        });
    });

    ipcMain.on('open-pdf-file', (err, args)=> {
        shell.openItem(args.filePath);
    });
}

module.exports = mainWindow => handleEvents(mainWindow); 