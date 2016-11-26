import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fileName'})
export class FileNamePipe implements PipeTransform{
    transform(input: string, arg: number) {
        return input.split(' ').map(item => {
            let slice = item;
            if(item.length > arg) {
                slice = item.slice(0, arg - 1) + ' ' + this.appendSpace(item.slice(arg, item.length), arg);
            } 

            return slice;
        }).join(' ');
    }

    appendSpace(str: string, arg: number) {
        if(str.length < arg) return str;

        return str.slice(0, arg - 1) + ' ' + this.appendSpace(str.slice(arg, str.length), arg);
    }
}

