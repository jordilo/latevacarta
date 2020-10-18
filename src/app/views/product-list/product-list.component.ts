import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../api/catalog.service';
import { IProduct } from 'src/app/api/catalog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products$: Observable<IProduct[]>;

  constructor(private catalogService: CatalogService) { }

  public ngOnInit(): void {
    this.products$ = this.catalogService.getProducts();
  }

  public removeProduct(productId: string) {
    const areYourSure = confirm('Are you sure');
    if (areYourSure) {
      this.catalogService.removeProduct(productId).subscribe();
    }
  }

}
