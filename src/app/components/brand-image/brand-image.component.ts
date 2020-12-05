import { Component, ElementRef, HostBinding, Input, OnChanges, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

export type BrandType =
  'sqare-color' |
  'background' |
  'full-color' |
  'full-plain' |
  'horizontal-color' |
  'horizontal-negative' |
  'imago-color' |
  'imago-plain';

@Component({
  selector: 'app-brand-image',
  templateUrl: './brand-image.component.html',
  styleUrls: ['./brand-image.component.scss'],
})
export class BrandImageComponent implements OnChanges {

  @Input() public type: BrandType;

  @Input() public height = 'auto';
  @Input() public width = 'auto';
  @Input() public position = 'left';
  @ViewChild('image', { static: true }) public image: ElementRef<HTMLImageElement>;

  @HostBinding('style.justifyContent')
  public get styleInImg() {
    switch (this.position) {
      case 'center':
        return this.position;
      default:
        return 'flex-' + this.position;
    }
  }
  public src: string;

  private readonly baseSrc = '/assets/brand/';
  constructor(private render: Renderer2) {

    // tslint:disable-next-line:no-console
    if (window.location.hostname.match(/bar-code/)) {
      this.baseSrc += 'barcode_';
    } else {
      this.baseSrc += 'latevacarta_';
    }
  }

  ngOnChanges({ type, height, width }: SimpleChanges): void {
    if (type) {
      this.src = this.baseSrc + type.currentValue + '.svg';
    }
    if (height && this.height) {
      this.render.setStyle(this.image.nativeElement, 'height', height.currentValue);
    }
    if (width && this.width) {
      this.render.setStyle(this.image.nativeElement, 'width', width.currentValue);
    }
  }

}
