import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from './../../api/catalog.d';

@Pipe({
  name: 'filterUsedProducts',
})
export class FilterUsedProductsPipe implements PipeTransform {

  transform(value: IProduct[], productId: string, alreadyUsedProducts: string[]): unknown {
    if (!value) {
      return [];
    }
    return value
      .filter(({ id }) => id === productId || !alreadyUsedProducts.some((produId) => produId === id && produId !== productId));

  }

}
