import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets } from 'chart.js';
import moment from 'moment';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IBusiness } from 'src/app/api/business';
import { IAnalytics } from '../../api/analytics';
import { AnalyticsService } from '../../api/analytics.service';
import { BusinessService } from './../../api/business.service';

interface IAnalyticsChartData {
  data: ChartDataSets[];
  dates: Label[];
}

function mapAnalytics(data: IAnalytics, totalDays): IAnalyticsChartData {
  const firstDay = moment().add(-28, 'days');
  const allData = [...Array(totalDays).keys()]
    .map(() => {
      let currentValue = 0;
      const currentDay = firstDay.add(1, 'days').format('YYYY-MM-DD');
      const index = data.dates.findIndex((date) => moment(date).format('YYYY-MM-DD') === currentDay);
      if (index !== -1) {
        currentValue = data.data[index];
      }

      return [currentValue, currentDay];

    });
  return {
    data: [{ data: allData.map((d) => d[0]), label: 'views' }],
    dates: allData.map((d) => d[1]),
  } as IAnalyticsChartData;
}

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css'],
})
export class BusinessDetailComponent implements OnInit {

  public business$: Observable<IBusiness>;
  public firstVisit$: Observable<IAnalyticsChartData>;
  public views$: Observable<IAnalyticsChartData>;
  constructor(
    private router: ActivatedRoute,
    private businessService: BusinessService,
    private analyticsService: AnalyticsService,
  ) { }

  public ngOnInit(): void {
    this.business$ = this.router.params
      .pipe(switchMap(({ businessId }) => this.businessService.getById(businessId)));

    this.firstVisit$ = this.router.params
      .pipe(switchMap(({ businessId }) => this.analyticsService.getFirstVisit(businessId)),
        map((data) => mapAnalytics(data, 28)));
    this.views$ = this.router.params
      .pipe(
        switchMap(({ businessId }) => this.analyticsService.getViews(businessId)),
        map((data) => mapAnalytics(data, 28)));
  }

}
