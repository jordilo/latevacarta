import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBusiness } from 'src/app/api/business';
import { BusinessService } from 'src/app/api/business.service';
import { IBusinesMeta } from '../../api/business';

const fonts = [
  {
    group: 'Sans Serif',
    fonts: [
      'Arial, Helvetica, sans-serif',
      '"Arial Black", Gadget, sans-serif',
      '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
      'Tahoma, Geneva, sans-serif',
      '"Trebuchet MS", Helvetica, sans-serif',
      'Verdana, Geneva, sans-serif'
    ]
  }, {
    group: 'Serif',
    fonts: [
      '"Times New Roman", Times, serif',
      'Georgia, serif',
      '"Palatino Linotype", "Book Antiqua", Palatino, serif',
    ]
  }, {
    group: 'Monospace',
    fonts: [
      'Courier New',
      'Lucida Console'
    ]
  }
];

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.css']
})
export class BusinessFormComponent implements OnInit {

  @Input() public business: IBusiness;
  @Output() public submitForm = new EventEmitter<IBusiness>();


  public busninessForm: FormGroup;
  public fonts = fonts;
  public currentFont: IBusinesMeta;
  constructor(private fb: FormBuilder, private businessService: BusinessService) { }

  public ngOnInit(): void {

    this.currentFont = this.business?.business_meta?.find((meta) => meta.name === 'font');
    const font = this.currentFont?.value || 'Arial, Helvetica, sans-serif';
    this.busninessForm = this.fb.group({
      id: [this.business.id],
      name: [this.business.name, Validators.required],
      type: [this.business.type, Validators.required],
      address: this.fb.group({
        id: [this.business?.address.id],
        address: [this.business?.address.address, Validators.required],
        city: [this.business?.address.city, Validators.required],
        country: [this.business?.address.country],
        lat: [this.business?.address.lat],
        lng: [this.business?.address.lng],
        postal_code: [this.business?.address.postal_code, Validators.required],
        state: [this.business?.address.state]
      }),
      options: this.fb.group({
        font: [font]
      })
    });
  }

  public sendForm() {
    const business: IBusiness = {
      id: this.busninessForm.value.id,
      name: this.busninessForm.value.name,
      type: this.busninessForm.value.type,
      address: this.busninessForm.value.address,
      business_meta: [
        {
          name: 'font',
          value: this.busninessForm.value.options.font
        }
      ]
    } as IBusiness;

    this.submitForm.emit(business);
  }


}
