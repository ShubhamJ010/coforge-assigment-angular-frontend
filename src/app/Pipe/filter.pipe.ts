import { Pipe, PipeTransform } from '@angular/core';
import { UserData } from '../Model/userData.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(ud: UserData[], filter: string): any[] {
    if (!ud || !filter) {
      return ud;
    }
    filter = filter.toLowerCase();

    return ud.filter((ud) => {
      return ud.firstName.toLowerCase().includes(filter);
    });
  }
}
