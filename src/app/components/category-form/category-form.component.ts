import { map } from 'rxjs/operators';
import { IBusinessLanguage } from './../../api/business.d';
import { ILanguage } from './../../api/metadata.d';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ICategory } from '../../api/catalog';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BusinessService } from 'src/app/api/business.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {


  @Input() public category: ICategory;
  @Input() public categories: ICategory[];
  @Input() public languages: ILanguage[];
  @Input() public defaultLanguage: string;
  @Input() public businessLanguages: IBusinessLanguage[];

  @Output() public submitForm = new EventEmitter<ICategory>();
  public categoryForm: FormGroup;
  public nameForm: FormArray;

  public defaultLanguageObj: ILanguage;
  public availableLanguages: any[];
  constructor(private fb: FormBuilder, private businessService: BusinessService) { }


  public ngOnInit(): void {

    this.defaultLanguageObj = this.languages.find(({ code }) => code === this.defaultLanguage);
    console.log(this);

    this.availableLanguages = this.businessLanguages
      .reduce((acc, current) => {
        const language = this.languages.find(({ code }) => code === current.language);
        const currentValue = this.category?.name_languages?.find((cat) => cat.language === current.language)?.value || '';
        acc.push({ value: currentValue, language: current.language, name: language.name });
        return acc;
      }, []);
    this.nameForm = this.fb
      .array(this.availableLanguages
        .map(({ value, name, language }) => this.fb.group({ language, name, value: [value, Validators.required] })));

    this.categoryForm = this.fb.group({
      id: [this.category?.id],
      parent_category: [this.category?.parent_category],
      name_languages: this.nameForm
    });
  }


  public sendForm() {
    const category: ICategory = {
      id: this.categoryForm.value.id,
      parent_category: this.categoryForm.value.parent_category,
      name: this.nameForm.value.find(({ language }) => language === this.defaultLanguage).value,
      name_languages: this.nameForm.value.map(({ language, value }) => ({ language, value }))
    } as ICategory;
    this.submitForm.emit(category);
  }

  public get langs(): FormArray {
    return this.categoryForm.get('name_languages') as FormArray;
  }
}
