import { Component, OnInit } from '@angular/core';
import { ICategory, IProduct } from 'src/app/api/catalog';
import { CatalogService } from 'src/app/api/catalog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { BusinessService } from 'src/app/api/business.service';
import { MetadataService } from 'src/app/api/metadata.service';
import { IBusinessLanguage } from 'src/app/api/business';
import { ILanguage } from 'src/app/api/metadata';

@Component({
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.css']
})
export class ProductEditionComponent implements OnInit {

  public editionData$: Observable<[IProduct, ICategory[], ILanguage[], IBusinessLanguage[], string]>;

  constructor(
    private catalogService: CatalogService,
    private metaService: MetadataService,
    private businessService: BusinessService,
    private router: Router,
    private activeRouter: ActivatedRoute) { }

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
              this.businessService.getById(businessId).pipe(map(({ default_lang }) => default_lang))
            ])
          )
        );

  }

  public saveProduct(product: IProduct) {
    this.catalogService.editProduct(product)
      .subscribe(() => this.router.navigate(['../../'], { relativeTo: this.activeRouter }));
  }

}
