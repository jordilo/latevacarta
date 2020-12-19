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
    // this.apo
    return this.getBusinessAnalytics(businessId, 'first_visit');
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
