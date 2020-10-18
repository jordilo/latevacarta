import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_CATEGORIES, INSERT_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY, REMOVE_CATEGORY } from './catalog.queries';
import { map, take } from 'rxjs/operators';
import { ICategory } from './catalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private apollo: Apollo) { }

  public getCategories() {
    return this.apollo.watchQuery<{ category: ICategory[] }>({
      query: GET_ALL_CATEGORIES
    }).valueChanges.pipe(map(({ data }) => data.category));
  }
  public getCategoryById(categoryId: string) {
    return this.apollo.watchQuery<{ category_by_pk: ICategory }>({
      query: GET_CATEGORY,
      variables: {
        categoryId
      }
    }).valueChanges.pipe(map(({ data }) => data.category_by_pk));
  }

  public insertCategory(category: ICategory) {
    delete category.id;
    return this.apollo.mutate<ICategory>({
      mutation: INSERT_CATEGORY,
      variables: {
        category
      }
    });
  }

  public editCategory(category: ICategory) {
    return this.apollo.mutate({
      mutation: UPDATE_CATEGORY,
      variables: {
        id: category.id,
        name: category.name,
        parent_id: category.parent_id
      }
    }).pipe(take(1));
  }

  public removeCategory(categoryId: string) {
    return this.apollo.mutate({
      mutation: REMOVE_CATEGORY,
      variables: {
        id: categoryId
      }
    });
  }
}
