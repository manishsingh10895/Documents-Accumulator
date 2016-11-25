const fs = require('fs');
const dataFilePath = './data.json';
const watcher = require('./watcher');

let saveData = (data, cb)=> {
    fs.writeFile(dataFilePath, data, 'utf-8', (err)=> {
        let parsed = JSON.parse(data);
        let dirs = [];
        Object.keys(parsed).forEach((item)=> {
            dirs.push(item);
        });
        watcher(dirs);
        cb(err);        
    });
};

let fetchData = (cb)=> {
    fs.readFile(dataFilePath, 'utf-8', (err, data)=> {
        if(err) { console.log("ERROR",err); return cb(err); }
        return cb(null, data); 
    });
};

module.exports = {
    saveData: saveData,
    fetchData: fetchData
};