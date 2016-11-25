import { Injectable } from '@angular/core';
import { Directory } from '../models/directory.model';

@Injectable()
export class Utility {

    //extract directory name from path
    extractDirectory(path:string) {
        let x = path.split('/');
        return x[x.length-1];
    }

    //Check is directory is present
    IsDirectoryPresent(fullName, directories: Directory[]) {
        directories.forEach((item)=> {
            if(item.fullName === fullName) return true;
        });
        return false;
    }
} 