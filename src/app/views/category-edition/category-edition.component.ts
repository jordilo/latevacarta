import { BusinessService } from 'src/app/api/business.service';
import { MetadataService } from './../../api/metadata.service';
import { IBusinessLanguage } from './../../api/business.d';
import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/api/catalog';
import { CatalogService } from 'src/app/api/catalog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ILanguage } from 'src/app/api/metadata';

@Component({
  selector: 'app-category-edition',
  templateUrl: './category-edition.component.html',
  styleUrls: ['./category-edition.component.css']
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
              this.businessService.getById(businessId).pipe(map(({ default_lang }) => default_lang))
            ])
          )
        );
  }

  public saveCategory(category: ICategory, businessId: string) {
    this.catalogService.editCategory(category, businessId)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.activeRouter }));
  }

}
