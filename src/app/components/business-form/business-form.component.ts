import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Business } from 'src/app/api/business';
import { BusinessService } from 'src/app/api/business.service';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.css']
})
export class BusinessFormComponent implements OnInit {

  @Input() public business: Business;
  @Output() public submitForm = new EventEmitter<Business>();


  public busninessForm: FormGroup;
  constructor(private fb: FormBuilder, private businessService: BusinessService) { }

  public ngOnInit(): void {
    this.busninessForm = this.fb.group({
      name: [this.business.name, Validators.required],
      type: [this.business.type, Validators.required],
      address: this.fb.group({
        address: [this.business?.address.address, Validators.required],
        city: [this.business?.address.city, Validators.required],
        country: [this.business?.address.country],
        lat: [this.business?.address.lat],
        lng: [this.business?.address.lng],
        postal_code: [this.business?.address.postal_code, Validators.required],
        state: [this.business?.address.state]
      })
    });
  }

  public sendForm() {
    this.submitForm.emit(this.busninessForm.value);
  }


}
