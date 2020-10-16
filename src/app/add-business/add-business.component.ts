import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {

  public busninessForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.busninessForm = this.fb.group({
      name: ['My bar', Validators.required],
      type: ['BAR', Validators.required],
      address: this.fb.group({
        address: ['Alguersuari i pacuael', Validators.required],
        city: ['Sabadell', Validators.required],
        country: [1],
        lat: ['41.3'],
        lng: ['3.1'],
        postal_code: ['08203'],
        state: ['Barcelona']
      })
    });
  }

  public sendForm() {

  }

}
