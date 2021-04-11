import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITemplate } from './business';
import { GET_LANGUAGES, GET_TEMPLATES } from './medatata.queries';
import { ILanguage } from './metadata.d';
@Injectable({
  providedIn: 'root',
})
export class MetadataService {

  constructor(private apollo: Apollo) { }

  public getLanguages(): Observable<ILanguage[]> {
    return this.apollo.watchQuery<{ language: ILanguage[] }>({
      query: GET_LANGUAGES,
    }).valueChanges.pipe(map(({ data }) => data.language));
  }

  public getTemplates(): Observable<ITemplate[]> {
    return this.apollo.watchQuery<{ templates: ITemplate[] }>({
      query: GET_TEMPLATES,
    }).valueChanges.pipe(map(({ data }) => [...data.templates]));
  }

}
