import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ICategory } from 'src/app/api/catalog';
import { InsertFullCatalog } from 'src/app/api/utils';
import { CatalogService } from '../../api/catalog.service';

@Component({
  selector: 'app-catalog-summary',
  templateUrl: './catalog-summary.component.html',
  styleUrls: ['./catalog-summary.component.css'],
})
export class CatalogSummaryComponent implements OnInit {

  public businessId$: Observable<string>;
  public catalog$: Observable<ICategory[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService) { }

  public ngOnInit(): void {
    this.businessId$ = this.activatedRoute.params.pipe(map(({ businessId }) => businessId));

    this.catalog$ = this.businessId$
      .pipe(switchMap((businessId) => this.catalogService.getCatalog(businessId)));
  }

  public insertCatalog(data: InsertFullCatalog) {
    this.catalogService.insertFullCatalog(data).subscribe();
  }
}
