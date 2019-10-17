import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipo'
})
export class TipoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == 100) {
      return "Gato";
    }
    else if (value == 200) {
      return "Perro";
    }
    else if (value >= 0 && value < 2) {
      return "Cachorro";
    }
    else if (value >= 2 && value < 8) {
      return "Adulto";
    }
    else if (value >= 8 && value < 90) {
      return "Viejo";
    }
    else {
      return value;
    }
  }

}
