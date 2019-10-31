import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localidad'
})
export class LocalidadPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == -10) {
      return "Avellaneda Centro";
    }
    else if (value == -11) {
      return "Dock Sud";
    }
    if (value == -12) {
      return "Gerli";
    }
    if (value == -13) {
      return "Piñeyro";
    }
    if (value == -14) {
      return "Sarandi";
    }
    if (value == -15) {
      return "Villa Dominico";
    }
    if (value == -15) {
      return "Wilde";
    }
    else {
      return value;
    }
  }

}
