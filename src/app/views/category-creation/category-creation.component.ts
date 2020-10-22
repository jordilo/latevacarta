import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../api/catalog';
import { CatalogService } from '../../api/catalog.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category-creation',
  templateUrl: './category-creation.component.html',
  styleUrls: ['./category-creation.component.css']
})
export class CategoryCreationComponent implements OnInit {

  public defaultCategory: ICategory;
  public categories$: Observable<ICategory[]>;
  constructor(private catalogService: CatalogService, private activeRouter: ActivatedRoute) { }

  public ngOnInit(): void {
    this.defaultCategory = {} as ICategory;
    this.categories$ = this.activeRouter.params
      .pipe(switchMap(({ businessId }) => this.catalogService.getCategories(businessId)));
  }

  public saveCategory(category: ICategory) {
    // TODO investigation to get unknown parent parameter
    const businessId = (this.activeRouter.params as any).value.businessId;
    category.business_id = businessId;
    this.catalogService.insertCategory(category).subscribe();
  }

}
