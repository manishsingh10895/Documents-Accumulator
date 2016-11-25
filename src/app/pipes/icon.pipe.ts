import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'icon' })
export class IconPipe implements PipeTransform {
    transform(input: string, args: string) {
        let x = input;
        x = x.slice(1,x.length);
        x = x + '-icon.png';
        return x;
    }
}