import { Injectable } from '@angular/core';
import { Directory } from '../models/directory.model';

@Injectable()
export class Utility {

    //extract directory name from path
    extractDirectory(path:string) {
        let x = path.split('/');
        return x[x.length-1];
    }

    extractDirectoryPath(filepath: string) {
        console.log(filepath);
        let x = filepath.split('/').filter((val, index) => {
            return index < filepath.split('/').length - 1;
        }).join('/');
        console.log(x);
        return x;
    }

    //Check is directory is present
    IsDirectoryPresent(fullName, directories: Directory[]) {
        directories.forEach((item)=> {
            if(item.fullName === fullName) return true;
        });
        return false;
    }
} 