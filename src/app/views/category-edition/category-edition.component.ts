import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/api/catalog';
import { CatalogService } from 'src/app/api/catalog.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, merge, forkJoin, zip } from 'rxjs';
import { switchMap, tap, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-category-edition',
  templateUrl: './category-edition.component.html',
  styleUrls: ['./category-edition.component.css']
})
export class CategoryEditionComponent implements OnInit {

  public editionData$: Observable<[ICategory, ICategory[]]>;

  constructor(private catalogService: CatalogService, private activeRouter: ActivatedRoute) { }

  public ngOnInit(): void {
    const categoryObs =
      this.activeRouter.params.pipe(switchMap(({ id }) => this.catalogService.getById(id)));

    this.editionData$ = forkJoin([categoryObs, this.catalogService.getCategories()])
      .pipe(tap(console.log), map((d => d)));
  }

  public saveCategory(category: ICategory) {
    console.log(category);
  }

}
