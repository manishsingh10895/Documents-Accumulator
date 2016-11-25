import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { File } from '../models/file.model';

@Pipe({ name: 'filter' })
@Injectable()
export class FilterPipe implements PipeTransform{
    transform(items: File[], args:string): any {
        var res = items.filter((item)=> {
            try {
                let reg = new RegExp(args.toLowerCase());
                return reg.test(item.name.toLowerCase());
            } catch(ex) {
                console.log(ex);
                return true;
            }
         });
        console.log(res); 
        return res;
    }
}