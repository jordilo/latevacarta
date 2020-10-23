import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/api/catalog';
import { CatalogService } from 'src/app/api/catalog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-category-edition',
  templateUrl: './category-edition.component.html',
  styleUrls: ['./category-edition.component.css']
})
export class CategoryEditionComponent implements OnInit {

  public editionData$: Observable<[ICategory, ICategory[]]>;

  constructor(
    private catalogService: CatalogService,
    private router: Router,
    private activeRouter: ActivatedRoute) { }

  public ngOnInit(): void {
    this.editionData$ =
      this.activeRouter.params
        .pipe(
          mergeMap(({ businessId, categoryId }) =>
            combineLatest([
              this.catalogService.getCategoryById(categoryId),
              this.catalogService.getCategories(businessId)
            ])
          )
        );

  }

  public saveCategory(category: ICategory) {
    this.catalogService.editCategory(category)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.activeRouter }));
  }

}
