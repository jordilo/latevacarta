import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GET_ALL_CATEGORIES,
  INSERT_CATEGORY,
  GET_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID
} from './catalog.queries';
import { map, take } from 'rxjs/operators';
import { ICategory, IProduct } from './catalog';
import { INSERT_PRODUCT, UPDATE_PRODUCT, REMOVE_PRODUCT, GET_CATALOG } from './catalog.queries';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private apollo: Apollo) { }

  public getCatalog(businessId: string) {
    return this.apollo.watchQuery<{ category: ICategory[] }>({
      query: GET_CATALOG,
      variables: {
        businessId
      }
    }).valueChanges.pipe(map(({ data }) => data.category));
  }

  public getCategories(businessId: string) {
    return this.apollo.watchQuery<{ category: ICategory[] }>({
      query: GET_ALL_CATEGORIES,
      variables: {
        businessId
      }
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

  public getProducts(businessId: string) {
    return this.apollo.watchQuery<{ product: IProduct[] }>({
      query: GET_ALL_PRODUCTS,
      variables: {
        businessId
      }
    }).valueChanges.pipe(map(({ data }) => data.product));
  }
  public getProductById(productId: string) {
    return this.apollo.watchQuery<{ product_by_pk: IProduct }>({
      query: GET_PRODUCT_BY_ID,
      variables: {
        id: productId
      }
    }).valueChanges.pipe(map(({ data }) => data.product_by_pk));
  }

  public insertProduct(product: IProduct) {
    delete product.id;
    product.feature_image = 'null';
    return this.apollo.mutate<IProduct>({
      mutation: INSERT_PRODUCT,
      variables: {
        product
      }
    });
  }
  public editProduct(product: IProduct) {
    return this.apollo.mutate<IProduct>({
      mutation: UPDATE_PRODUCT,
      variables: {
        id: product.id,
        category_id: product.category_id,
        description: product.description,
        is_active: product.is_active,
        name: product.name,
        feature_image: product.feature_image,
        price: product.price
      }
    });
  }

  public removeProduct(productId: string) {
    return this.apollo.mutate<IProduct>({
      mutation: REMOVE_PRODUCT,
      variables: {
        id: productId
      }
    });
  }
}
