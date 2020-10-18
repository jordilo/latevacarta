import { Component, OnInit } from '@angular/core';
import { ICategory, IProduct } from 'src/app/api/catalog';
import { CatalogService } from 'src/app/api/catalog.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.css']
})
export class ProductEditionComponent implements OnInit {

  public editionData$: Observable<[IProduct, ICategory[]]>;

  constructor(private catalogService: CatalogService, private activeRouter: ActivatedRoute) { }

  public ngOnInit(): void {
    this.editionData$ =
      this.activeRouter.params
        .pipe(
          mergeMap(({ productId }) =>
            combineLatest([
              this.catalogService.getProductById(productId),
              this.catalogService.getCategories()
            ])
          )
        );

  }

  public saveProduct(product: IProduct) {
    this.catalogService.editProduct(product).subscribe();
  }

}
