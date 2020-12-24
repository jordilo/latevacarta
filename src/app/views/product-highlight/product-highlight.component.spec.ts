import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockPipe } from 'ng-mocks';
import { LoaderComponent } from '../../components/loader/loader.component';
import { FilterUsedProductsPipe } from './filter-used-products.pipe';
import { ProductHighlightComponent } from './product-highlight.component';

describe('ProductHighlightComponent', () => {
  let component: ProductHighlightComponent;
  let fixture: ComponentFixture<ProductHighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductHighlightComponent,
        MockComponent(LoaderComponent),
        MockPipe(FilterUsedProductsPipe),
      ],
      imports: [ReactiveFormsModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
