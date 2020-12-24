import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { QrcodeComponent } from '@techiediaries/ngx-qrcode';
import { MockComponent } from 'ng-mocks';
import { BrandImageComponent } from '../../components/brand-image/brand-image.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { BusinessQrComponent } from './business-qr.component';

describe('BusinessQrComponent', () => {
  let component: BusinessQrComponent;
  let fixture: ComponentFixture<BusinessQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BusinessQrComponent,
        LoaderComponent,
        MockComponent(QrcodeComponent),
        MockComponent(BrandImageComponent),
      ],
      imports: [ReactiveFormsModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
