import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    outputs: ['updateSortType', 'updateSearchText', 'toggleSidebar'],
})
export class MenuComponent implements OnInit {
    @ViewChild('searchInput') searchElement: ElementRef;

    toggleSidebar: EventEmitter<any> = new EventEmitter<any>();
    updateSortType: EventEmitter<number> = new EventEmitter<number>();
    updateSearchText: EventEmitter<string> = new EventEmitter<string>();
    handleShortcuts : EventEmitter<any> = new EventEmitter<any>();
    sortType: Number;

    constructor() { 
        this.sortType = 0;
        this.handleShortcuts.subscribe((next)=> {
            console.log(this.searchElement);
            this.setShortcuts();
        });
    }

    public setShortcuts() {
        document.addEventListener('keydown', (e) => {
            if(e.keyCode==70 && e.ctrlKey) this.searchElement.nativeElement.focus();
            if(e.keyCode == 83 && e.ctrlKey) this.sort();
        });
    }

    sort() {
        switch(this.sortType) {
            case 0: 
                this.sortType = 1;
                this.updateSortType.emit(1);
                console.log(this.sortType);
                break;
            case 1: 
                this.sortType = -1;
                this.updateSortType.emit(-1); 
                break;
            case -1: 
                this.sortType = 0; 
                this.updateSortType.emit(0);
                break;
            default: 
                this.sortType = 0;
                this.updateSortType.emit(0); 
                break;
        }
    }

    onToggleSidebar() {
        this.toggleSidebar.emit();
    }

    onSearchTextChange(text:string) {
        console.log(text);
        this.updateSearchText.emit(text);
    }

    ngOnInit() { 

    }
}