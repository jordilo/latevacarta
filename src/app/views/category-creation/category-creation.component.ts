import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../api/catalog';
import { CatalogService } from '../../api/catalog.service';
import { ActivatedRoute } from '@angular/router';

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
    this.categories$ = this.catalogService.getCategories();
  }

  public saveCategory(category: ICategory) {
    // TODO investigation to get unknown parent parameter
    const businessId = (this.activeRouter.parent.parent.parent.params as any).value.id;
    category.business_id = businessId;
    this.catalogService.insertCategory(category).subscribe();
  }

}
