import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { IBusinessLanguage } from 'src/app/api/business';
import { BusinessService } from 'src/app/api/business.service';
import { ICategory, IProduct } from 'src/app/api/catalog';
import { CatalogService } from 'src/app/api/catalog.service';
import { ILanguage } from 'src/app/api/metadata';
import { MetadataService } from 'src/app/api/metadata.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.css'],
})
export class ProductEditionComponent implements OnInit {

  public editionData$: Observable<[IProduct, ICategory[], ILanguage[], IBusinessLanguage[], string]>;

  constructor(
    private catalogService: CatalogService,
    private metaService: MetadataService,
    private businessService: BusinessService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private toast: ToastService,
  ) { }

  public ngOnInit(): void {
    this.editionData$ =
      this.activeRouter.params
        .pipe(
          mergeMap(({ businessId, productId }) =>
            combineLatest([
              this.catalogService.getProductById(productId),
              this.catalogService.getCategories(businessId),
              this.metaService.getLanguages(),
              this.businessService.getById(businessId).pipe(map(({ languages }) => languages)),
              this.businessService.getById(businessId).pipe(map(({ default_lang }) => default_lang)),
            ]),
          ),
        );

  }

  public saveProduct(product: IProduct) {
    this.catalogService.editProduct(product)
      .pipe(tap(() => this.toast.open('Info', 'Product saved successfully')))
      .subscribe(() => this.router.navigate(['../../'], { relativeTo: this.activeRouter }));
  }

}
