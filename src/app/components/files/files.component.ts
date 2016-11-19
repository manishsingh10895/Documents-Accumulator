import { Component, ElementRef, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import { FileManager } from '../../services/fileManager';
import { FilterPipe } from '../../pipes/filter-files.pipe';

const { ipcRenderer } = require('electron');

let jQuery = require('jquery');


import { File } from '../../models/file.model';
import { Directory } from '../../models/directory.model';

@Component ({
    selector: 'files',
    templateUrl: './files.component.html',

    styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
    @ViewChild('searchInput') searchElement: ElementRef;
    @ViewChild('folderInput') folderElement: ElementRef;

    @Input() files: File[] = [];
    directories: Directory[] = [];
    zone:NgZone;
    loading:boolean = false;
    searchText: String;
    sortType: Number;

    ngOnInit() {
        document.onkeydown = (e) => {
            if(e.keyCode==78 && e.ctrlKey) this.folderElement.nativeElement.click();
            if(e.keyCode==68 && e.ctrlKey) this.toggleSidebar();
            if(e.keyCode==70 && e.ctrlKey) this.searchElement.nativeElement.focus();
        };  
    }



    IsDirectoryPresent(fullName) {
        this.searchText = '';
        this.directories.forEach((item)=> {
            console.log(item.fullName);
            if(item.fullName === fullName) return true;
        });
        return false;
    }

    setUpInitialData() {
        Object.keys(this.fileManager.fileStructure).forEach(key => {
            console.log(key);
            this.directories.push({ fullName: key, name: this.extractDirectory(key) });
            this.files = this.files.concat(this.fileManager.fileStructure[key]);
        });
    }

    sort() {
        switch(this.sortType) {
            case 0: this.sortType = 1; break;
            case 1: this.sortType = -1; break;
            case -1: this.sortType = 0; break;
            default: this.sortType = 0; break;
        }
    }

    onSearchKeyPress() {
        
    }

    constructor(private fileManager: FileManager, private filter: FilterPipe) {
        this.sortType = 0;
        this.zone = new NgZone({enableLongStackTrace: false});

        ipcRenderer.on('data-fetched', (err, args)=> {
            if(args.error) return console.log(args.error);
            console.log(args);
            this.zone.run(()=> {
                this.fileManager.fileStructure = args.data;
                this.setUpInitialData();
            });
        });

        ipcRenderer.on('all-files-fetched', (e,args) => {
            this.zone.run(()=> {
                
                let fullDirectory = args.directory;
                let directory = this.extractDirectory(fullDirectory);
                                
                this.files = args.files;
                this.directories.push({ name: directory, fullName: fullDirectory});
                        
                this.fileManager.fileStructure[args.directory] = this.files;
                this.loading = false;

                jQuery('.add-directory')
                    .transition('scale')
                    ;

                this.fileManager.persistData();
            });
        });
    }

    toggleSidebar() {
        jQuery('.ui.sidebar')
        .sidebar('toggle')
        ;
    }

    openFile(path) {

        ipcRenderer.send('open-pdf-file', { filePath: path });
    }

    extractDirectory(path:string) {
        let x = path.split('/');
        return x[x.length-1];
    }

    private AddAllFiles() {
        this.files = [];
        this.directories.forEach((item)=> {
            this.files = this.files.concat(this.fileManager.fileStructure[item.fullName]);
        });
    }

    onDirectoryClick(directory:any) {
        if(directory == 'All') { this.AddAllFiles(); this.toggleSidebar(); return; }
        console.log(this.fileManager);
        console.log(directory.fullName);
        
        this.files = this.fileManager.fileStructure[directory.fullName];
        this.toggleSidebar();
    }

    fileChange(e) {
        let directory = e.target.files[0].path;
        let directoryName = this.extractDirectory(directory);
        
        if(jQuery.inArray(directoryName, this.directories) == -1) {
            ipcRenderer.send('fetch-all-files', { directory: directory });
            this.loading = true;
            jQuery('.add-directory')
            .transition('scale')
            ;
        }
    }
}