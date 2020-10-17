import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSummaryComponent } from './catalog-summary.component';

describe('CatalogSummaryComponent', () => {
  let component: CatalogSummaryComponent;
  let fixture: ComponentFixture<CatalogSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
