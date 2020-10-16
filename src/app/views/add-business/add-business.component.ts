import { BusinessService } from './../../api/business.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {
  public busninessForm: FormGroup;
  constructor(private fb: FormBuilder, private businessService: BusinessService) { }

  public ngOnInit(): void {
    this.busninessForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      address: this.fb.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        country: [1],
        lat: ['0'],
        lng: ['0'],
        postal_code: ['', Validators.required],
        state: ['Barcelona']
      })
    });

  }

  public sendForm() {
    this.businessService.addBusiness(this.busninessForm.value)
      .subscribe();
  }

}
