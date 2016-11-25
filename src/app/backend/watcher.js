"use strict";

const chokidar = require('chokidar');

let log = console.log.bind(console);

let watcher;

let ignoreDirs = ['node_modules', 'bower_components', '.'];

module.exports = (dirs) => {
    if(watcher) watcher.close();

    watcher = chokidar.watch(dirs , {
        ignored: /node_modules|bower_components|\./,
        persistent: true
    });

    watcher
        .on('add', path => handleFileAddition(path))
        .on('change', path => handleFileChange(path))
        .on('unlink', path => handleFileDeletion(path));
}


let handleFileAddition = (path) => {
    log("File Added", path);
};


let handleFileDeletion = (path) => {
    log("File Deleted", path);
};

let handleFileChange = path => {
    log('File Changed', path);
};