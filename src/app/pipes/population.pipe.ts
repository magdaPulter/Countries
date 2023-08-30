import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'population',
  standalone: true,
})
export class PopulationPipe implements PipeTransform {

  transform(value: number): string {
    const reverseValue = value.toString().split('').reverse()
    return reverseValue.map((v,i) => (i) % 3 == 0 ? ' ' + v : v)
    .join('')
    .trim()
    .replaceAll(' ', '.')
    .split('')
    .reverse()
    .join('');
  }
}
