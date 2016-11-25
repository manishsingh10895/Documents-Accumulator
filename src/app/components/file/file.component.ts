import { Component, Input } from '@angular/core';

const { ipcRenderer } = require('electron');

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss']
})
export class FileComponent {
    @Input('file') file;

    openFile(path) {
        ipcRenderer.send('open-pdf-file', { filePath: path });
    }
}