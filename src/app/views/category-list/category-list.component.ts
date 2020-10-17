import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../api/catalog.service';
import { ICategory } from 'src/app/api/catalog';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  public categories$: Observable<ICategory[]>;

  constructor(private catalogService: CatalogService) { }

  public ngOnInit(): void {
    this.categories$ = this.catalogService.getCategories();
  }
  public removeCategory(categoryId: string) {

  }
}
