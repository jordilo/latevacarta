import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandImageComponent } from './brand-image.component';

describe('BrandImageComponent', () => {
  let component: BrandImageComponent;
  let fixture: ComponentFixture<BrandImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrandImageComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('hola', () => {
    expect(2).toBe(2);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
