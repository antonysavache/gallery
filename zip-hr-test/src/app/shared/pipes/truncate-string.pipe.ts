import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateString'
})
export class TruncateStringPipe implements PipeTransform {

  transform(text: string, countOfSymbols: number): unknown {
    if (text.length > countOfSymbols) {
      return text.slice(0, countOfSymbols) + '...';
    }
    return text;
  }

}
