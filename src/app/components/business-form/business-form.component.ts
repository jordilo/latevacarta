import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BusinessMetaEnum, IAddress, IBusiness } from 'src/app/api/business';
import { ILanguage } from 'src/app/api/metadata';
import { UploadFileService } from 'src/app/api/upload-file.service';
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
      'Verdana, Geneva, sans-serif',
    ],
  }, {
    group: 'Serif',
    fonts: [
      '"Times New Roman", Times, serif',
      'Georgia, serif',
      '"Palatino Linotype", "Book Antiqua", Palatino, serif',
    ],
  }, {
    group: 'Monospace',
    fonts: [
      'Courier New',
      'Lucida Console',
    ],
  },
];
const defaultLang = 'ca_ES';
const socialItems: BusinessMetaEnum[] = ['facebook', 'instagram', 'tiktok', 'web', 'youtube'];
const optionsItems: BusinessMetaEnum[] = ['font'];

interface IOptionsItems {
  font: string;
}
interface ISocialItems {
  facebook: string;
  instagram: string;
  tiktok: string;
  web: string;
  youtube: string;
}
@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.scss'],
})
export class BusinessFormComponent implements OnInit, OnDestroy {

  @Input() public business: IBusiness;
  @Input() public languages: ILanguage[];
  @Output() public submitForm = new EventEmitter<IBusiness>();
  public busninessForm: FormGroup;
  public languagesForm: FormArray;
  public fonts = fonts;
  public currentFont: IBusinesMeta;
  public places: any;
  public languagesSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private uploadFileService: UploadFileService) { }

  public ngOnInit(): void {
    const options = this.getMetadata<IOptionsItems>(this.business?.business_meta, optionsItems);
    const font = options?.font || 'Arial, Helvetica, sans-serif';
    const social = this.getMetadata<ISocialItems>(this.business?.business_meta, socialItems);
    const languages = this.business?.languages?.map(({ language }) => {
      return this.languages.find((lang) => lang.code === language);

    }) || [];
    this.languagesForm = this.fb.array(languages);
    this.languagesSubscription = this.languagesForm.valueChanges.subscribe((value: ILanguage[]) => {
      if (value.length === 1 || !value.some(({ code }) => code === this.busninessForm.value.default_language)) {
        this.setLanguageAsDefault(value[0].code);
      }
    });
    this.busninessForm = this.fb.group({
      id: [this.business.id],
      name: [this.business.name, Validators.required],
      type: [this.business.type, Validators.required],
      logotype: this.business?.logotype,
      default_lang: [this.business?.default_lang || defaultLang, Validators.required],
      languages: [this.languagesForm, Validators.minLength(1)],
      addLanguage: this.fb.group({ code: [null] }),
      address: this.fb.group({
        id: [this.business?.address.id],
        address: [this.business?.address.address, Validators.required],
        city: [this.business?.address.city, Validators.required],
        country: [this.business?.address.country],
        lat: [this.business?.address.lat],
        lng: [this.business?.address.lng],
        postal_code: [this.business?.address.postal_code, Validators.required],
        state: [this.business?.address.state],
      }),
      social: this.fb.group({
        facebook: social?.facebook,
        instagram: social?.instagram,
        tiktok: social?.tiktok,
        web: social?.web,
        youtube: social?.youtube,
      }),
      options: this.fb.group({
        font: [font],
      }),
    });
  }

  public ngOnDestroy() {
    this.languagesSubscription.unsubscribe();
  }

  public sendForm() {
    const socialMeta = this.setMetadata(this.busninessForm.value, socialItems, 'social');
    const optionsMeta = this.setMetadata(this.busninessForm.value, optionsItems, 'options');
    const business: IBusiness = {
      id: this.busninessForm.value.id,
      name: this.busninessForm.value.name,
      type: this.busninessForm.value.type,
      logotype: this.busninessForm.value.logotype,
      address: this.busninessForm.value.address,
      default_lang: this.busninessForm.value.default_lang,
      languages: this.busninessForm.value.languages.value.map(({ code: language }) => ({ language })),
      business_meta: [
        ...optionsMeta,
        ...socialMeta,
      ],
    } as IBusiness;

    this.submitForm.emit(business);
  }

  public addLanguage() {
    const selectedLanguage = this.busninessForm.value.addLanguage.code;
    const language = this.languages.find((lang) => lang.code === selectedLanguage);
    this.busninessForm.get('addLanguage').patchValue({ code: null });
    this.languagesForm.push(this.fb.group({ code: language.code, name: language.name }));
  }
  public removeLanguage(index: number) {
    this.languagesForm.removeAt(index);
  }
  public setLanguageAsDefault(languageEnum: string) {
    this.busninessForm.patchValue({ default_lang: languageEnum }, { emitEvent: false });
  }

  public selectFile(event: InputEvent, type: string) {
    const file = (event.target as any).files[0];
    this.uploadFileService.upload(type, 'business-logo', file)
      .subscribe(
        ({ Location }: any) => {
          this.business.logotype = Location;
          this.busninessForm.patchValue({ logotype: Location });
        },
      );
  }

  public addressChange(address: IAddress) {
    this.busninessForm.patchValue({ address }, { emitEvent: false });
  }
  private getMetadata<T>(metaData: IBusinesMeta[], metadataKeys: string[]) {
    return metadataKeys.reduce((acc, current) => {
      const metaValue = metaData?.find((meta) => meta.name === current);
      if (metaValue) {
        acc[current] = metaValue.value;
      }
      return acc;
    }, {} as T);
  }

  private setMetadata(business: IBusiness, items: any[], key: string): IBusinesMeta[] {
    return items.reduce((acc, item) => {
      if (business[key][item]) {
        acc.push({ name: item, value: business[key][item] } as IBusinesMeta);
      }
      return acc;
    }, [] as IBusinesMeta[]);
  }

}
