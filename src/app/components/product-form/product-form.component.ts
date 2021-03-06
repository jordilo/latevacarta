import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBusinessLanguage } from 'src/app/api/business';
import { ILanguage } from 'src/app/api/metadata';
import { UploadFileService } from 'src/app/api/upload-file.service';
import { ICategory, IProduct } from '../../api/catalog';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {

  @Input() public product: IProduct;
  @Input() public categories: ICategory[];
  @Input() public languages: ILanguage[];
  @Input() public defaultLanguage: string;
  @Input() public businessId: string;
  @Input() public businessLanguages: IBusinessLanguage[];

  @Output() public submitForm = new EventEmitter<IProduct>();
  public productForm: FormGroup;
  public nameForm: FormArray;
  public descriptionForm: FormArray;
  public availableLanguages: any[];
  public productCopy: IProduct;
  constructor(private fb: FormBuilder, private uploadFileService: UploadFileService) { }

  public ngOnInit(): void {
    this.productCopy = { ...this.product };
    this.availableLanguages = this.businessLanguages
      .reduce((acc, current) => {
        const language = this.languages.find(({ code }) => code === current.language);
        const nameValue = this.product?.name_languages?.find((cat) => cat.language === current.language)?.value || '';
        const descriptionValue = this.product?.description_languages?.find((cat) => cat.language === current.language)?.value || '';
        acc.push({ nameValue, descriptionValue, language: current.language, name: language.name });
        return acc;
      }, []);
    this.nameForm = this.fb
      .array(this.availableLanguages
        .map(({ nameValue: value, name, language }) => this.fb.group({ language, name, value: [value, Validators.required] })));

    this.descriptionForm = this.fb
      .array(this.availableLanguages
        .map(({ descriptionValue: value, name, language }) => this.fb.group({ language, name, value })));

    this.productForm = this.fb.group({
      id: [this.product?.id],
      name: [this.product?.name],
      description: [this.product?.description],
      category_id: [this.product?.category_id, Validators.required],
      is_active: [this.product?.is_active || true],
      feature_image: [this.product?.feature_image, ''],
      price: [this.product?.price],
      business_id: [this.product?.business_id],
      name_languages: this.nameForm,
      description_languages: this.descriptionForm,
      featured_image: [this.product?.feature_image],
    });
  }

  public get langs(): FormArray {
    return this.productForm.get('name_languages') as FormArray;
  }
  public sendForm() {
    const product = {
      id: this.productForm.value.id,
      name: this.nameForm.value.find(({ language }) => language === this.defaultLanguage).value,
      description: this.descriptionForm.value.find(({ language }) => language === this.defaultLanguage).value,
      category_id: this.productForm.value.category_id,
      is_active: this.productForm.value.is_active,
      feature_image: this.productForm.value.feature_image,
      price: this.productForm.value.price,
      business_id: this.productForm.value.business_id,
      name_languages: this.nameForm.value.map(({ language, value }) => ({ language, value })),
      description_languages: this.descriptionForm.value.map(({ language, value }) => ({ language, value })),
    } as IProduct;
    // name_languages: this.nameForm.value.map(({ language, value }) => ({ language, value }))
    this.submitForm.emit(product);
  }

  public selectFile(event: InputEvent, type: string) {
    const file = (event.target as any).files[0];
    this.uploadFileService.upload(type, this.businessId, file)
      .subscribe(
        ({ Location }: any) => {
          if (!this.productCopy) {
            this.productCopy = {} as IProduct;
          }
          this.productCopy.feature_image = Location;
          this.productForm.patchValue({ feature_image: Location });
        },
      );
  }
}
