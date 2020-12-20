import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnalyticEventName, IAnalytics } from './analytics';
import { ANALYTICS_QUERY } from './analytics.queries';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {

  constructor(private apollo: Apollo) { }

  public getFirstVisit(businessId): Observable<IAnalytics> {
    return this.getBusinessAnalytics(businessId, 'first_visit');
  }
  public getViews(businessId): Observable<IAnalytics> {
    return this.getBusinessAnalytics(businessId, 'page_view');
  }
  public getModalsOpened(businessId): Observable<IAnalytics> {
    return this.getBusinessAnalytics(businessId, 'open-modal');
  }
  public getChangeLanguage(businessId): Observable<IAnalytics> {
    return this.getBusinessAnalytics(businessId, 'select-language');
  }
  public getSearches(businessId): Observable<IAnalytics> {
    return this.getBusinessAnalytics(businessId, 'search-item');
  }

  private getBusinessAnalytics(businessId: string, eventName: AnalyticEventName) {
    return this.apollo.watchQuery<{ analytics: IAnalytics }>({
      query: ANALYTICS_QUERY,
      variables: {
        businessId,
        eventName,
      },
    }).valueChanges.pipe(map((response) => response.data.analytics));
  }
}
