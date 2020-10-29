import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BusinessService } from 'src/app/api/business.service';
import { ICategory } from '../../api/catalog';
import { CatalogService } from '../../api/catalog.service';
import { IBusinessLanguage } from './../../api/business.d';
import { ILanguage } from './../../api/metadata.d';
import { MetadataService } from './../../api/metadata.service';

@Component({
  selector: 'app-category-creation',
  templateUrl: './category-creation.component.html',
  styleUrls: ['./category-creation.component.css'],
})
export class CategoryCreationComponent implements OnInit {

  public defaultCategory: ICategory;
  public data$: Observable<[ICategory[], ILanguage[], IBusinessLanguage[], string]>;
  constructor(
    private catalogService: CatalogService,
    private metaService: MetadataService,
    private businessService: BusinessService,
    private router: Router,
    private activeRouter: ActivatedRoute) { }

  public ngOnInit(): void {
    this.defaultCategory = {} as ICategory;
    this.data$ = this.activeRouter.params
      .pipe(switchMap(({ businessId }) =>
        combineLatest([
          this.catalogService.getCategories(businessId),
          this.metaService.getLanguages(),
          this.businessService.getById(businessId).pipe(map(({ languages }) => languages)),
          this.businessService.getById(businessId).pipe(map(({ default_lang }) => default_lang)),
        ])));
  }

  public saveCategory(category: ICategory) {

    const businessId = (this.activeRouter.params as any).value.businessId;
    category.business_id = businessId;
    this.catalogService.insertCategory(category)
      .subscribe(() => this.router.navigate(['../'], { relativeTo: this.activeRouter }));
  }

}
