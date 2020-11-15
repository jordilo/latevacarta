import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ICategory } from 'src/app/api/catalog';
import { InsertFullCatalog } from 'src/app/api/utils';
import { CatalogService } from '../../api/catalog.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {

  public businessId$: Observable<string>;
  public categories$: Observable<ICategory[]>;
  public businessId: string;
  constructor(private router: ActivatedRoute, private catalogService: CatalogService) { }

  public ngOnInit(): void {
    this.businessId$ = this.router.params.pipe(map(({ businessId }) => businessId));

    this.categories$ = this.businessId$
      .pipe(
        tap((businessId) => this.businessId = businessId),
        switchMap((businessId) => this.catalogService.getCategories(businessId)));

  }
  public removeCategory(categoryId: string, businessId: string) {
    const areYoure = confirm('Are your sure ?');
    if (areYoure) {
      this.catalogService.removeCategory(categoryId, businessId)
        .subscribe(() => {
          this.categories$ = this.catalogService.getCategories(this.businessId);
        });
    }
  }
  public insertCatalog(data: InsertFullCatalog) {
    this.catalogService.insertFullCatalog(data).subscribe();
  }
}
