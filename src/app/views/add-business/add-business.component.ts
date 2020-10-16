import { BusinessService } from './../../api/business.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, Business } from 'src/app/api/business';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {

  public defaultBusiness: Business;
  constructor(private fb: FormBuilder, private businessService: BusinessService) { }

  public ngOnInit(): void {
    this.defaultBusiness = {
      name: '',
      type: 'BAR',
      address: {
        country: 1
      } as Address
    } as Business;

  }

  public sendForm(business: Business) {
    this.businessService.create(business)
      .subscribe();
  }

}
