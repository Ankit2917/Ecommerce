import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordLimit'
})
export class WordLimitPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: string, wordLimit: number = 6): string {
    if (!value) return '';
 
    const words = value.split(' ');
    if (words.length <= wordLimit) {
      return value;
    }
    let a = words.slice(0, wordLimit).join(' ') + '...';
    return a
  }
}
