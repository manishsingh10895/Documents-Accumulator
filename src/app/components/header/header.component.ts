import { Component, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    outputs: ['updateFileTypes']
})
export class HeaderComponent {
    updateFileTypes: EventEmitter<string[]> = new EventEmitter<string[]>();

    constructor() {
    }

    fileTypes = {
        presentation: { extensions:  ['.ppt', '.pptx', '.odp'], selected: false },
        spreadsheet: { extensions: ['.xls', '.xlsx', '.ods'], selected: false },
        word: { extensions: ['.doc', '.docx', '.odt'], selected: false },
        pdf:  {extensions: ['.pdf'], selected: false },
        all: { extensions: ['.ppt', '.pptx', '.odp', '.xls', '.xlsx', '.ods', '.doc', '.docx', '.odt', '.pdf'], selected: true } 
    }

    selectedFileTypes : { };

    unselectAllOtherTypes(fileType: string) {
        Object.keys(this.fileTypes)
            .filter(key => key != fileType)
            .forEach(k => {
                this.fileTypes[k].selected = false;
            });
    }

    toggleFileType(fileType: string) {
        this.fileTypes[fileType].selected = !this.fileTypes[fileType].selected;

        if(fileType == 'all') {
            this.unselectAllOtherTypes(fileType);
        }

        let selectedFileTypes = [];
        
        Object.keys(this.fileTypes)
            .filter(k => this.fileTypes[k].selected)
            .forEach(key => {
                selectedFileTypes = selectedFileTypes.concat(this.fileTypes[key].extensions);
            });

        this.updateFileTypes.emit(selectedFileTypes);
    }
}