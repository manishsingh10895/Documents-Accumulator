import { Pipe, PipeTransform } from '@angular/core';
import { File } from '../models/file.model';

@Pipe({ name: 'sort' })
export class SortPipe implements PipeTransform{
    transform(item: File[], args: number) {
        console.log(args);
        return item.sort((a,b) => {
            if(a.name > b.name) return args * 1;
            else if (a.name < b.name) return args * -1;
            else return 0;
        });
    }
}