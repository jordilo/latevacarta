import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IProduct } from 'src/app/api/catalog';
import { CatalogService } from '../../api/catalog.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  public products$: Observable<IProduct[]>;

  constructor(private catalogService: CatalogService, private router: ActivatedRoute) { }

  public ngOnInit(): void {
    this.products$ = this.router.params
      .pipe(switchMap(({ businessId }) => this.catalogService.getProducts(businessId)));
  }

  public removeProduct(productId: string, businessId: string) {
    const areYourSure = confirm('Are you sure');
    if (areYourSure) {
      this.catalogService.removeProduct(productId, businessId).subscribe();
    }
  }

}
