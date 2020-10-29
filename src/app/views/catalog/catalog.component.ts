import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IBusiness } from 'src/app/api/business';
import { BusinessService } from 'src/app/api/business.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {

  public business$: Observable<IBusiness>;
  constructor(private router: ActivatedRoute, private businessService: BusinessService) { }

  public ngOnInit(): void {
    this.business$ = this.router.params
      .pipe(switchMap(({ businessId }) => this.businessService.getById(businessId)));
  }

}
