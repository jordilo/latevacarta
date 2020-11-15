import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { InsertFullCatalog } from '../../api/utils';
import { UtilsService } from '../../api/utils.service';

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css'],
})
export class UploadExcelComponent implements OnInit {

  @Input() public businessId: string;
  @Output() public fileChange = new EventEmitter<InsertFullCatalog>();

  public template = environment.files.product_template;

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
  }

  public selectFile(event: InputEvent) {
    const file = (event.target as any).files[0];
    this.utilsService.convertExcel(file, this.businessId)
      .pipe(tap((result) => this.fileChange.emit(result)))
      .subscribe();
  }

}
