import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IProduct } from 'src/app/api/catalog';
import { CatalogService } from '../../api/catalog.service';
import { InsertFullCatalog } from '../../api/utils';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  public businessId$: Observable<string>;
  public products$: Observable<IProduct[]>;

  constructor(private catalogService: CatalogService, private router: ActivatedRoute) { }

  public ngOnInit(): void {
    this.businessId$ = this.router.params.pipe(map(({ businessId }) => businessId));

    this.products$ = this.businessId$
      .pipe(switchMap((businessId) => this.catalogService.getProducts(businessId)));

  }

  public insertCatalog(data: InsertFullCatalog) {
    this.catalogService.insertFullCatalog(data).subscribe();
  }

  public removeProduct(productId: string, businessId: string) {
    const areYourSure = confirm('Are you sure');
    if (areYourSure) {
      this.catalogService.removeProduct(productId, businessId).subscribe();
    }
  }

}
