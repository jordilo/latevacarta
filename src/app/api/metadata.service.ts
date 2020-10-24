import { map } from 'rxjs/operators';
import { GET_LANGUAGES } from './medatata.queries';
import { ILanguage } from './metadata.d';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(private apollo: Apollo) { }

  public getLanguages(): Observable<ILanguage[]> {
    return this.apollo.watchQuery<{ language: ILanguage[] }>({
      query: GET_LANGUAGES
    }).valueChanges.pipe(map(({ data }) => data.language));
  }
}
