import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels, QrcodeComponent } from '@techiediaries/ngx-qrcode';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-business-qr',
  templateUrl: './business-qr.component.html',
  styleUrls: ['./business-qr.component.css'],
})
export class BusinessQrComponent implements OnInit {

  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  @ViewChild(QrcodeComponent, { static: false }) public qr: QrcodeComponent;
  public url$: Observable<string>;

  public hostname = window.location.hostname.replace('admin.', '');

  constructor(private activatedRouter: ActivatedRoute) { }

  public ngOnInit(): void {
    // TODO fins the way to extract params from parent
    this.url$ = this.activatedRouter.params.pipe(map(({ businessId }) => {
      const url = `${window.location.protocol}//qr.${this.hostname}/${businessId}`;
      return url;
    }));
  }
  public print() {
    // tslint:disable-next-line:no-console
    console.log(this.qr.qrcElement.nativeElement.querySelector('img').src);
  }
}
