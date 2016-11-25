import { Component, Input, EventEmitter } from '@angular/core';
import { Directory } from '../../models/directory.model';

@Component ({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    outputs: ['onAddFiles'],    
})
export class SidebarComponent {
    @Input('directories') directories;

    onAddFiles: EventEmitter<Directory> = new EventEmitter<Directory>();

    onDirectoryClick(directory:any) {
       this.onAddFiles.emit(directory);
    }
}