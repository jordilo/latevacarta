import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IBusiness } from 'src/app/api/business';
import { BusinessService } from '../../api/business.service';

@Component({
  selector: 'app-business-qr',
  templateUrl: './business-qr.component.html',
  styleUrls: ['./business-qr.component.scss'],
})
export class BusinessQrComponent implements OnInit {

  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  @ViewChildren('content') public contents: QueryList<ElementRef<HTMLDivElement>>;
  public data$: Observable<{ business: IBusiness, url: string }>;

  public hostname = window.location.hostname.replace('admin.', '');
  public form: FormGroup;
  public sizes = [{
    name: 'small',
    size: 250,
  },
  {
    name: 'medium',
    size: 500,
  },
  {

    name: 'large',
    size: 1000,
  }];

  constructor(private business: BusinessService, private activatedRouter: ActivatedRoute, private fb: FormBuilder) { }

  public ngOnInit(): void {

    this.form = this.fb.group({
      size: this.sizes[0].size,
    });

    // TODO fins the way to extract params from parent
    const url$ = this.activatedRouter.params.pipe(map(({ businessId }) => {
      const url = `${window.location.protocol}//qr.${this.hostname}/${businessId}`;
      return url;
    }));
    const business$ = this.activatedRouter.params.pipe(switchMap(({ businessId }) => {
      return this.business.getById(businessId);
    }));
    this.data$ = combineLatest([business$, url$]).pipe(map((data) => ({ business: data[0], url: data[1] })));
  }
  public print() {

    const element = this.contents.find(({ nativeElement }) => nativeElement.id === 'print');
    // tslint:disable-next-line:no-console
    // console.log(this.qr.qrcElement.nativeElement.querySelector('img').src);
    html2canvas(element.nativeElement).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      const width = this.pxToCm(canvas.width);
      const height = this.pxToCm(canvas.height);
      // context.drawImage(canvas, 0, 0);
      const pdf = new jspdf('p', 'cm', [width, height]); // Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'WEBP', 0, 0, width, height);
      pdf.save('Filename.pdf');
    });
  }
  private pxToCm(pixel: number): number {
    return pixel / 96 * 2.54;
  }
}
