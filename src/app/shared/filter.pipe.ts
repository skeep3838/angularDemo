import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterdStatus: string, propName: string): any {
    console.log(value);
    if (value.length === 0) {
      return value;
    }
    const rtnArr = [];
    for (const item of value) {
      if (item[propName] ===filterdStatus) {
        rtnArr.push(item);
      }
    }
    return rtnArr;
  }
}
