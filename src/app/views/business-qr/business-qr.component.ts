import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-business-qr',
  templateUrl: './business-qr.component.html',
  styleUrls: ['./business-qr.component.css']
})
export class BusinessQrComponent implements OnInit {

  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  public url$: Observable<string>;

  public hostname = window.location.hostname.replace('admin.', '');

  constructor(private activatedRouter: ActivatedRoute) { }

  public ngOnInit(): void {
    // TODO fins the way to extract params from parent
    this.url$ = this.activatedRouter.parent.params.pipe(map(({ businessId }) => {
      const url = `${window.location.protocol}//${this.hostname}/${businessId}`;
      return url;
    }));
  }

}
