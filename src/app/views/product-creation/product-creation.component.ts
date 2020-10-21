import { Component, OnInit } from '@angular/core';
import { IProduct, ICategory } from '../../api/catalog';
import { CatalogService } from 'src/app/api/catalog.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {

  public defaultProduct: IProduct;
  public categories$: Observable<ICategory[]>;
  constructor(private catalogService: CatalogService, private router: ActivatedRoute) { }

  public ngOnInit(): void {
    this.categories$ = this.router.params
      .pipe(switchMap(({ businessId }) => this.catalogService.getCategories(businessId)));
  }

  public saveProduct(category: IProduct) {
    this.catalogService.insertProduct(category).subscribe();
  }
}
