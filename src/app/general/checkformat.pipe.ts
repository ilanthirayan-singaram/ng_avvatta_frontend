import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkformat'
})
export class CheckformatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    // console.log(value)
    return null;
  }

}
