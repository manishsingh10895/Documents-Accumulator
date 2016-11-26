"use strict";

const fs = require('fs');
const path = require('path');

let FindFilesInDirectory = (fileType, dir, sourceDir, done)=> {
  var results = [];
  
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);

    list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item)); //remove hidden folders
    list = list.filter(item => !(/bower_components|node_modules/g).test(item));

    var i = 0;
    (function next() {
      var file = list[i++];
      let fileName = file;

      if (!file) return done(null, results, dir);

      file = path.resolve(dir, file);
      let fullFileName = file;
      let extension = path.extname(fullFileName);

      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {

          FindFilesInDirectory(fileType, file, sourceDir, function(err, res) {
            results = results.concat(res);
            next();
          });

        } else {
            let size = ByteToMegaByte(stat['size']);

            let fileObject = { 
                        name: fileName,
                        fullName: fullFileName,
                        extension: extension,
                        size: size, 
                        isFavorite: false,
                        directory: sourceDir
            };

            if(fileType.constructor == Array) {
                fileType.forEach((item) => {
                    if(file.indexOf(item) >= 0)
                        results.push(fileObject);
                })
            } else { 
                if(file.indexOf(fileType)>=0) results.push(fileObject);
            }
            next();
        }
      });
    })();
  });
};


let ByteToMegaByte = (bytes) =>  {
    return Math.round((bytes/1048576) * 100) / 100;
}

let FindFileTypesInDirectory = (fileType, dir, cb) => {
    var files = [];
    let areFilesRemaining = true;
    fs.readdir(dir, (err, list)=> {
        if(err) cb(err);

        areFilesRemaining = list.length;
        if(!areFilesRemaining) return cb(null, files, dir);

        list.forEach((file, index)=> {
            let fileName = file;
            file = path.resolve(dir, file); //determine the absolute path
            let fullFileName = file;
            let fileExtension = path.extname(fullFileName);

            fs.stat(file, (err, stat)=> {
                if(stat && stat.isDirectory()) {
                    FindFileTypesInDirectory(fileType, file,    (err, res)=> {
                        files = files.concat(res);
                        if(!--areFilesRemaining) cb(null, files, dir);
                    });
                } else {
                    if(file.indexOf(fileType)>=0) files.push({ name: fileName, fullName: fullFileName, extension: fileExtension });
                    if(--areFilesRemaining) cb(null, files, dir);
                }
            });
        });
    });
}



module.exports =  { 
    findFileTypesInDirectory: FindFileTypesInDirectory,
    findFilesInDirectory: FindFilesInDirectory 
};