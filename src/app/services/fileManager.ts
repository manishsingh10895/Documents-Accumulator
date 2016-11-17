import { Injectable } from '@angular/core';
const { ipcRenderer } = require('electron');

@Injectable()
export class FileManager {
    public fileStructure: Object = {};
    public directories = [];

    constructor() {
        ipcRenderer.on('data-saved', (err) => {
            if(err) console.log(err);
            else console.log('Data Saved');
        });   

        this.getData();
    }

    persistData() {
        console.log("Data Persitence");
        ipcRenderer.send('save-data', { data: JSON.stringify(this.fileStructure) });
    }

    getData() {
        console.log("Fetch Data Started");  
        ipcRenderer.send('fetch-data');
    }
}