import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { BusinessService } from 'src/app/api/business.service';
import { ICategory } from 'src/app/api/catalog';
import { CatalogService } from 'src/app/api/catalog.service';
import { ILanguage } from 'src/app/api/metadata';
import { IBusinessLanguage } from './../../api/business.d';
import { MetadataService } from './../../api/metadata.service';

@Component({
  selector: 'app-category-edition',
  templateUrl: './category-edition.component.html',
  styleUrls: ['./category-edition.component.css'],
})
export class CategoryEditionComponent implements OnInit {

  public editionData$: Observable<[
    ICategory,
    ICategory[],
    string,
    ILanguage[],
    IBusinessLanguage[],
    string
  ]>;

  constructor(
    private catalogService: CatalogService,
    private metaService: MetadataService,
    private businessService: BusinessService,
    private router: Router,
    private activeRouter: ActivatedRoute) { }

  public ngOnInit(): void {
    this.editionData$ =
      this.activeRouter.params
        .pipe(
          mergeMap(({ businessId, categoryId }) =>
            combineLatest([
              this.catalogService.getCategoryById(categoryId),
              this.catalogService.getCategories(businessId),
              of(businessId),
              this.metaService.getLanguages(),
              this.businessService.getById(businessId).pipe(map(({ languages }) => languages)),
              this.businessService.getById(businessId).pipe(map(({ default_lang }) => default_lang)),
            ]),
          ),
        );
  }

  public saveCategory(category: ICategory, businessId: string) {
    this.catalogService.editCategory(category, businessId)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.activeRouter }));
  }

}
