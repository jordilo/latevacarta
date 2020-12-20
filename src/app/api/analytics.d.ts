
export type AnalyticEventName =
    'first_visit' |
    'page_view' |
    'open-modal' |
    'search-item' |
    'select-language';
export interface IAnalytics {
    eventName: AnalyticEventName,
    data: number[],
    dates: string[],
    total: number;
}