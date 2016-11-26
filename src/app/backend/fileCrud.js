const fs = require('fs');

let deleteFile = (filepath, done) => {
    fs.unlink(filepath, (err)=> {
        if(err) done(err);
        else done(null);
    });
};

module.exports = { 
    deleteFile: deleteFile
};