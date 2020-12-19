import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IBusiness } from 'src/app/api/business';
import { IAnalytics } from '../../api/analytics';
import { AnalyticsService } from '../../api/analytics.service';
import { BusinessService } from './../../api/business.service';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css'],
})
export class BusinessDetailComponent implements OnInit {

  public business$: Observable<IBusiness>;
  public firstVisit$: Observable<IAnalytics>;
  public views$: Observable<IAnalytics>;
  constructor(
    private router: ActivatedRoute,
    private businessService: BusinessService,
    private analyticsService: AnalyticsService,
  ) { }

  public ngOnInit(): void {
    this.business$ = this.router.params
      .pipe(switchMap(({ businessId }) => this.businessService.getById(businessId)));

    this.firstVisit$ = this.router.params
      .pipe(switchMap(({ businessId }) => this.analyticsService.getFirstVisit(businessId)));
    this.views$ = this.router.params
      .pipe(switchMap(({ businessId }) => this.analyticsService.getViews(businessId)));
  }

}
