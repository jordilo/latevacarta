import { Component, OnInit } from '@angular/core';
import { IProduct, ICategory } from '../../api/catalog';
import { CatalogService } from 'src/app/api/catalog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { IBusinessLanguage } from 'src/app/api/business';
import { BusinessService } from 'src/app/api/business.service';
import { ILanguage } from 'src/app/api/metadata';
import { MetadataService } from 'src/app/api/metadata.service';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {

  public defaultProduct: IProduct;
  public data$: Observable<[ICategory[], ILanguage[], IBusinessLanguage[], string]>;
  constructor(
    private catalogService: CatalogService,
    private router: Router,
    private metaService: MetadataService,
    private businessService: BusinessService,
    private activeRouter: ActivatedRoute) { }

  public ngOnInit(): void {

    this.data$ = this.activeRouter.params
      .pipe(switchMap(({ businessId }) =>
        combineLatest([
          this.catalogService.getCategories(businessId),
          this.metaService.getLanguages(),
          this.businessService.getById(businessId).pipe(map(({ languages }) => languages)),
          this.businessService.getById(businessId).pipe(map(({ default_lang }) => default_lang))
        ])));
  }

  public saveProduct(category: IProduct) {
    this.catalogService.insertProduct(category)
      .subscribe(() => this.router.navigate(['../'], { relativeTo: this.activeRouter }));
  }
}
