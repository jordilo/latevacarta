import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, take } from 'rxjs/operators';
import { ICategory, IProduct, IProductHighlight } from './catalog';
import {
  GET_ALL_CATEGORIES,
  GET_ALL_PRODUCTS,
  GET_CATEGORY,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS_HIGHLIGHT,
  INSERT_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY,
} from './catalog.queries';
import { GET_CATALOG, INSERT_PRODUCT, INSERT_PRODUCTS_HIGHLIGHT, REMOVE_PRODUCT, UPDATE_PRODUCT } from './catalog.queries';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {

  constructor(private apollo: Apollo) { }

  public getCatalog(businessId: string) {
    return this.apollo.watchQuery<{ category: ICategory[] }>({
      query: GET_CATALOG,
      variables: {
        businessId,
      },
    }).valueChanges.pipe(map(({ data }) => data.category));
  }

  public getCategories(businessId: string) {
    return this.apollo.watchQuery<{ category: ICategory[] }>({
      query: GET_ALL_CATEGORIES,
      variables: {
        businessId,
      },
    }).valueChanges.pipe(map(({ data }) => data.category));
  }
  public getCategoryById(categoryId: string) {
    return this.apollo.watchQuery<{ category_by_pk: ICategory }>({
      query: GET_CATEGORY,
      variables: {
        categoryId,
      },
    }).valueChanges.pipe(map(({ data }) => data.category_by_pk));
  }

  public insertCategory(category: ICategory) {
    delete category.id;
    return this.apollo.mutate<ICategory>({
      mutation: INSERT_CATEGORY,
      variables: {
        category: {
          business_id: category.business_id,
          name: category.name,
          name_languages: { data: category.name_languages },
          parent_category: category.parent_category,
        },
      },
      refetchQueries: [
        {
          query: GET_ALL_CATEGORIES,
          variables: { businessId: category.business_id },
        },
        {
          query: GET_CATALOG,
          variables: {
            businessId: category.business_id,
          },
        },
      ],
    });
  }

  public editCategory(category: ICategory, businessId: string) {
    return this.apollo.mutate({
      mutation: UPDATE_CATEGORY,
      variables: {
        id: category.id,
        name: category.name,
        parent_category: category.parent_category,
        languages: category.name_languages.map((lang) => ({ ...lang, category_id: category.id })),
      },
      refetchQueries: [
        {
          query: GET_CATEGORY,
          variables: { categoryId: category.id },
        },
        {
          query: GET_ALL_CATEGORIES,
          variables: { businessId: category.business_id || businessId },
        },
        {
          query: GET_CATALOG,
          variables: {
            businessId,
          },
        },
      ],
    }).pipe(take(1));
  }

  public removeCategory(categoryId: string, businessId: string) {
    return this.apollo.mutate({
      mutation: REMOVE_CATEGORY,
      variables: {
        id: categoryId,
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: GET_ALL_CATEGORIES,
          variables: { businessId },
        },
        {
          query: GET_CATALOG,
          variables: {
            businessId,
          },
        },
      ],
    });
  }

  public getProducts(businessId: string) {
    return this.apollo.watchQuery<{ product: IProduct[] }>({
      query: GET_ALL_PRODUCTS,
      variables: {
        businessId,
      },
    }).valueChanges.pipe(map(({ data }) => data.product));
  }
  public getProductById(productId: string) {
    return this.apollo.watchQuery<{ product_by_pk: IProduct }>({
      query: GET_PRODUCT_BY_ID,
      variables: {
        id: productId,
      },
    }).valueChanges.pipe(map(({ data }) => data.product_by_pk));
  }

  public insertProduct(product: IProduct) {
    delete product.id;
    return this.apollo.mutate<IProduct>({
      mutation: INSERT_PRODUCT,
      variables: {
        product: {
          id: product.id,
          name: product.name,
          description: product.description,
          category_id: product.category_id,
          is_active: product.is_active,
          feature_image: product.feature_image,
          price: product.price,
          business_id: product.business_id,
          name_languages: { data: product.name_languages },
          description_languages: { data: product.description_languages },
        },
      },
      refetchQueries: [{
        query: GET_ALL_PRODUCTS,
        variables: {
          businessId: product.business_id,
        },
      },
      {
        query: GET_CATALOG,
        variables: {
          businessId: product.business_id,
        },
      }],
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
        price: product.price,
        name_languages: product.name_languages.map((lang) => ({ ...lang, product_id: product.id })),
        description_languages: product.description_languages.map((lang) => ({ ...lang, product_id: product.id })),
      },
      refetchQueries: [
        {
          query: GET_ALL_PRODUCTS,
          variables: {
            businessId: product.business_id,
          },
        },
        {
          query: GET_PRODUCT_BY_ID,
          variables: {
            id: product.id,
          },
        },
        {
          query: GET_CATALOG,
          variables: {
            businessId: product.business_id,
          },
        }],
    });
  }

  public removeProduct(productId: string, businessId: string) {
    return this.apollo.mutate<IProduct>({
      mutation: REMOVE_PRODUCT,
      variables: {
        id: productId,
      },
      refetchQueries: [
        {
          query: GET_ALL_PRODUCTS,
          variables: {
            businessId,
          },
        },
        {
          query: GET_CATALOG,
          variables: {
            businessId,
          },
        }],
    });
  }

  public getHightlightProducts(businessId: string) {
    return this.apollo.watchQuery<{ product_highlight: IProductHighlight[] }>({
      query: GET_PRODUCTS_HIGHLIGHT,
      variables: {
        businessId,
      },
    }).valueChanges.pipe(map(({ data }) => data.product_highlight));
  }
  public addHighlightProducts(productsIds: string[], businessId: string) {
    return this.apollo.mutate<IProduct>({
      mutation: INSERT_PRODUCTS_HIGHLIGHT,
      variables: {
        businessId,
        productsHighlighted: productsIds.map((product_id) => ({ product_id, business_id: businessId })),
      },
      refetchQueries: [{
        query: GET_PRODUCTS_HIGHLIGHT,
        variables: {
          businessId,
        },
      }],
    });
  }
}
