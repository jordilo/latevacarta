import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/api/catalog';
import { CatalogService } from 'src/app/api/catalog.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, NEVER } from 'rxjs';
import { mergeMap, tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-category-edition',
  templateUrl: './category-edition.component.html',
  styleUrls: ['./category-edition.component.css']
})
export class CategoryEditionComponent implements OnInit {

  public editionData$: Observable<[ICategory, ICategory[]]>;

  constructor(private catalogService: CatalogService, private activeRouter: ActivatedRoute) { }

  public ngOnInit(): void {
    this.editionData$ =
      this.activeRouter.params
        .pipe(
          mergeMap(({ id }) => combineLatest([this.catalogService.getCategoryById(id), this.catalogService.getCategories()]))
        );

  }

  public saveCategory(category: ICategory) {
    this.catalogService.editCategory(category).subscribe();
  }

}
