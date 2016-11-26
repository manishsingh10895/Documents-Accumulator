import { Component, Input, OnInit, ElementRef, EventEmitter } from '@angular/core';
import { File } from '../../models/file.model';
import { FileManager } from '../../services/fileManager';
import { Utility } from '../../services/utility';
const { ipcRenderer } = require('electron');

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss'],
    outputs: ['onUpdate']
})
export class FileComponent implements OnInit{
    @Input('file') file;
    onUpdate: EventEmitter<any> = new EventEmitter<any>();
    contextMenuOpen: boolean = false;
    ngOnInit() {

    }

    constructor(private el: ElementRef, private fileManager: FileManager, private utility: Utility) {
        this.el.nativeElement.addEventListener('contextmenu', e => {
            this.handleContextMenu(e);
        });
    }

    handleContextMenu(e : Event) {

        e.preventDefault();
        e.stopPropagation();
        let contextMenu = document.getElementById('context-menu');
        
        let menuItems = contextMenu.querySelectorAll('.item');

        for(let i =0; i< menuItems.length; i++) {
            this.handleMenuItemClick(menuItems[i], contextMenu);
        }

        this.contextMenuOpen = !this.contextMenuOpen;

        console.log(this.contextMenuOpen);

        if(this.contextMenuOpen) {
            let pos = this.getPosition(e);
            contextMenu.style.left = pos.x + 'px';
            contextMenu.style.top = pos.y + 'px';       
            contextMenu.classList.add('active');            
        } else {
            contextMenu.classList.remove('active');
        }
    }

    handleMenuItemClick(item: Element, contextMenu: Element) {
        item.addEventListener('click', e => {
            e.stopPropagation();
            e.preventDefault();
            
            let action: string = item.getAttribute('data-action');

            switch(action) {
                case 'open-location': 
                    ipcRenderer.send('open-file-location', { filepath: this.file.fullName });
                    break;
                default: break; 
            }

            contextMenu.classList.remove('active');
            this.contextMenuOpen = false;
        });
    }

    openFile(path) {
        ipcRenderer.send('open-pdf-file', { filePath: path });
    }

    getPosition(e) {
        var posx = 0;
        var posy = 0;

        if (!e) e = window.event;

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + 
                            document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + 
                            document.documentElement.scrollTop;
        }

        return {
            x: posx,
            y: posy
        }
    }

    deleteFile() {
        ipcRenderer.send('delete-file', { filepath: this.file.fullName });
        this.fileManager.fileStructure[this.file.directory]
            .forEach((item:File, index)=> {
                if(item.fullName == this.file.fullName) {
                    this.fileManager.fileStructure[this.file.directory].splice(index, 1);
                    this.fileManager.persistData();
                }
            });

        this.onUpdate.emit();
    }

    toggleFavorite(e: Event) {
        e.preventDefault();
        e.stopPropagation();

        this.file.isFavorite = !this.file.isFavorite;    
        this.fileManager.fileStructure[this.file.directory]
            .forEach((item:File, index)=> {
                if(item.fullName == this.file.fullName) {
                    this.fileManager.fileStructure[this.file.directory][index] = this.file;
                    this.fileManager.persistData();
                }
            });
    }

}