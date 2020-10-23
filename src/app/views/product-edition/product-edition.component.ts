import { Component, OnInit } from '@angular/core';
import { ICategory, IProduct } from 'src/app/api/catalog';
import { CatalogService } from 'src/app/api/catalog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.css']
})
export class ProductEditionComponent implements OnInit {

  public editionData$: Observable<[IProduct, ICategory[]]>;

  constructor(
    private catalogService: CatalogService,
    private router: Router,
    private activeRouter: ActivatedRoute) { }

  public ngOnInit(): void {
    this.editionData$ =
      this.activeRouter.params
        .pipe(
          mergeMap(({ businessId, productId }) =>
            combineLatest([
              this.catalogService.getProductById(productId),
              this.catalogService.getCategories(businessId)
            ])
          )
        );

  }

  public saveProduct(product: IProduct) {
    this.catalogService.editProduct(product)
      .subscribe(() => this.router.navigate(['../../'], { relativeTo: this.activeRouter }));
  }

}
