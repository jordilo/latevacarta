import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ICategory } from '../../api/catalog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusinessService } from 'src/app/api/business.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {


  @Input() public category: ICategory;
  @Input() public categories: ICategory[];

  @Output() public submitForm = new EventEmitter<ICategory>();
  public categoryForm: FormGroup;
  constructor(private fb: FormBuilder, private businessService: BusinessService) { }


  public ngOnInit(): void {
    this.categoryForm = this.fb.group({
      id: [this.category?.id],
      name: [this.category?.name, Validators.required],
      parent_category: [this.category?.parent_category || '']
    });
  }


  public sendForm() {
    this.submitForm.emit(this.categoryForm.value);
  }
}
