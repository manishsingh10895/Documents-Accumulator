import { Pipe, PipeTransform } from '@angular/core';
import { File } from '../models/file.model';

@Pipe({name: 'fileType'})
export class FileTypePipe implements PipeTransform {
    transform(input:File[], args: string[] ) {
        return input.filter((file)=> {
            return new RegExp(args.join('|')).test(file.extension);
        });
    }
}