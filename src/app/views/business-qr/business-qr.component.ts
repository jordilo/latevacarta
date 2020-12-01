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
      copies: 1,
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

  public print(businessId: string) {

    const element = this.contents.find(({ nativeElement }) => nativeElement.id === 'print');
    html2canvas(element.nativeElement, {
      scrollX: 0,
      scrollY: 0,
      scale: 1,
    }).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      const width = this.pxToCm(canvas.width);
      const height = this.pxToCm(canvas.height);
      const pdf = new jspdf('p', 'cm', [width, height]);
      pdf.addImage(contentDataURL, 'WEBP', 0, 0, width, height, 'none');
      [...Array(this.form.value.copies - 1).keys()].forEach(() => {
        pdf.addPage([width, height], 'p').addImage(contentDataURL, 'WEBP', 0, 0, width, height, 'none');
      });
      pdf.save(`qr-code__${businessId}.pdf`);
    });
  }
  private pxToCm(pixel: number): number {
    return pixel / 96 * 2.54;
  }
}
