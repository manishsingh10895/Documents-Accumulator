import { Component, ElementRef, 
        AfterContentInit, ContentChild, 
        OnInit, Input, 
        NgZone, ViewChild
    } from '@angular/core';
import { FileManager } from '../../services/fileManager';
import { FilterPipe } from '../../pipes/filter-files.pipe';
import { Utility } from '../../services/utility';
import { MenuComponent } from '../menu/menu.component';

const { ipcRenderer } = require('electron');

let jQuery = require('jquery');

import { File } from '../../models/file.model';
import { Directory } from '../../models/directory.model';

@Component ({
    selector: 'files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.scss']
})

export class FilesComponent implements OnInit, AfterContentInit {
    @ViewChild('folderInput') folderElement: ElementRef;
    @ViewChild(MenuComponent) menuComponent: MenuComponent;

    @Input() files: File[] = [];
    directories: Directory[] = [];
    zone:NgZone;
    loading:boolean = false;
    searchText: String = '';
    sortType: Number;
    selectedFileTypes:string[] = [];

    ngOnInit() {
        
    }

    ngAfterContentInit() {
        this.setShortcuts();
    }

    constructor(private fileManager: FileManager, private filter: FilterPipe, private utility: Utility) {
        this.sortType = 0;
        this.zone = new NgZone({enableLongStackTrace: false});
        this.setRendererEventhandlers();
        this.setUpInitialData();
    }

    moveToTop() {
        let x = 1;
        let frame = () => { 
            if(document.body.scrollTop == 0) clearInterval(interval);
            x++;
            document.body.scrollTop-= x*5;
        }

        let interval = setInterval(frame, 1);
    }

    //Set keyboard shortcuts
    setShortcuts() {
        document.addEventListener('keydown', (e) => {
            if(e.keyCode==78 && e.ctrlKey) this.folderElement.nativeElement.click();
            if(e.keyCode==68 && e.ctrlKey) this.toggleSidebar();
            if(e.keyCode==84 && e.ctrlKey) this.moveToTop();
        });
        // this.headerComponent.setShortcuts();
        this.menuComponent.handleShortcuts.emit();
    }

    //Initialise data
    setUpInitialData() {
        this.updateData();
    }

    updateData() {
        this.files = [];
        this.directories = [];
        Object.keys(this.fileManager.fileStructure).forEach(key => {
            this.directories.push({ fullName: key, name: this.utility.extractDirectory(key) });
            this.files = this.files.concat(this.fileManager.fileStructure[key]);
        });
    }

    updateSortType(type) {
        this.sortType = type;
    }

    updateFileTypes(fileTypes) {
        this.selectedFileTypes = fileTypes;
    }

    updateSearchText(text:string) {
        this.searchText = text;
    }

    toggleSidebar() {
        jQuery('.ui.sidebar')
        .sidebar('toggle')
        ;
    }

    openFile(path) {
        ipcRenderer.send('open-pdf-file', { filePath: path });
    }

    private AddAllFiles() {
        this.files = [];
        this.directories.forEach((item)=> {
            this.files = this.files.concat(this.fileManager.fileStructure[item.fullName]);
        });
    }

    private AddFavorites() {
        this.files = [];
        this.directories.forEach((item)=> {
            this.files = this.files.concat(this.fileManager.fileStructure[item.fullName]
                                .filter((file:File)=> {
                                    return file.isFavorite;
                                }));
        });
    }

    onAddFiles(directory:any) {
        if(directory == 'All') { this.AddAllFiles(); this.toggleSidebar(); return; }
        if(directory == 'favorite') { this.AddFavorites(); this.toggleSidebar(); return; }

        this.files = this.fileManager.fileStructure[directory.fullName];
        this.toggleSidebar();
    }

    fileChange(e) {
        let directory = e.target.files[0].path;
        let directoryName = this.utility.extractDirectory(directory);
        
        if(jQuery.inArray(directoryName, this.directories) == -1) {
            ipcRenderer.send('fetch-all-files', { directory: directory });
            this.loading = true;
            
            jQuery('.add-directory')
            .transition('scale')
            ;
        }
    }

    // Handle electron's renderer thread events
    setRendererEventhandlers() {
         ipcRenderer.on('data-fetched', (err, args)=> {
            if(args.error) return console.log(args.error);
            this.zone.run(()=> {
                this.fileManager.fileStructure = args.data;
                this.setUpInitialData();
            });
        });

        ipcRenderer.on('all-files-fetched', (e,args) => {
            this.zone.run(()=> {                
                let fullDirectory = args.directory;
                let directory = this.utility.extractDirectory(fullDirectory);
                                
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
}