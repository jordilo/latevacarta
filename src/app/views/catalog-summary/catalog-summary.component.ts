import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../api/catalog.service';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/api/catalog';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-catalog-summary',
  templateUrl: './catalog-summary.component.html',
  styleUrls: ['./catalog-summary.component.css']
})
export class CatalogSummaryComponent implements OnInit {

  public catalog$: Observable<ICategory[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService) { }

  public ngOnInit(): void {

    this.catalog$ = this.activatedRoute.parent.parent.params
      .pipe(switchMap(({ id }) => this.catalogService.getCatalog(id)));
  }

}
