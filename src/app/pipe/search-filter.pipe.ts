import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], filterField: string, keyword: string): any {
    if (!filterField || !keyword) {
      return value;
    }
    return value.filter(item => {
      const fieldValue = item[filterField];
      return fieldValue.indexOf(keyword) >= 0;
    });
  }
}
