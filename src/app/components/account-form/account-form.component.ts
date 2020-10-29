import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAccount } from 'src/app/api/account';

@Component({
  selector: 'app-account-form',
  providers: [DatePipe],
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css'],
})
export class AccountFormComponent implements OnInit {

  @Input() public account: IAccount;
  @Output() public submitForm = new EventEmitter<IAccount>();

  public accountForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe) { }

  public ngOnInit(): void {
    this.accountForm = this.fb.group({
      id: [this.account?.id],
      name: [this.account?.name, Validators.required],
      lastname: [this.account?.lastname, Validators.required],
  });
}

  public sendForm() {
  this.submitForm.emit(this.accountForm.value);
}
}
