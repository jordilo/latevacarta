import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { IBusinessLanguage } from 'src/app/api/business';
import { BusinessService } from 'src/app/api/business.service';
import { CatalogService } from 'src/app/api/catalog.service';
import { ILanguage } from 'src/app/api/metadata';
import { MetadataService } from 'src/app/api/metadata.service';
import { ICategory, IProduct } from '../../api/catalog';
import { ToastService } from './../../toast.service';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css'],
})
export class ProductCreationComponent implements OnInit {

  public defaultProduct: IProduct;
  public data$: Observable<[ICategory[], ILanguage[], IBusinessLanguage[], string]>;
  public businessId$: Observable<string>;
  constructor(
    private catalogService: CatalogService,
    private metaService: MetadataService,
    private businessService: BusinessService,
    private toast: ToastService,
    private router: Router,
    private activeRouter: ActivatedRoute) { }

  public ngOnInit(): void {
    this.businessId$ = this.activeRouter.params.pipe(map(({ businessId }) => businessId));
    this.data$ = this.businessId$
      .pipe(
        switchMap((businessId) =>
          combineLatest([
            this.catalogService.getCategories(businessId),
            this.metaService.getLanguages(),
            this.businessService.getById(businessId).pipe(map(({ languages }) => languages)),
            this.businessService.getById(businessId).pipe(map(({ default_lang }) => default_lang)),
          ])));
  }

  public saveProduct(category: IProduct) {
    this.businessId$.pipe(
      switchMap((categoryId: string) => {
        category.business_id = categoryId;
        return this.catalogService.insertProduct(category);
      }))
      .pipe(tap(() => this.toast.open('Info', 'Product created successfully')))
      .subscribe(() => this.router.navigate(['../'], { relativeTo: this.activeRouter }));
  }
}
