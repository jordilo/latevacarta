import { Pipe, PipeTransform } from '@angular/core';
import { ILanguage } from './../../api/metadata.d';

@Pipe({
  name: 'filterLanguages',
})
export class FilterLanguagesPipe implements PipeTransform {

  transform(value: ILanguage[], totalLanguages: ILanguage[]): ILanguage[] {
    let result: ILanguage[] = value;
    if (totalLanguages.length) {
      result = value.filter((dfLang) => totalLanguages.every((tlng) => dfLang.code !== tlng.code));
    }
    return result;
  }

}
