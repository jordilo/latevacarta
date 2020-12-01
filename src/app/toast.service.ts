import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export interface IToastOptions {
  icon: string;
  severity: string;

}
@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  public open(title: string, message: string, options?: IToastOptions) {
    let icon = '';
    let toastClass = 'alert';
    const body = `<span data-notify="message">${message}</span>`;
    const from = 'top';
    const align = 'center';
    if (options?.icon) {
      icon = `<span data-notify="icon" class="nc-icon ${icon}"></span>`;
      toastClass += 'alert-with-icon ';
    }
    if (options?.severity) {
      toastClass += `alert-${options.severity} `;
    } else {
      toastClass += 'alert-info ';
    }
    this.toastr.info(
      `${icon}${body}`,
      title,
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass,
        positionClass: `toast-${from}-${align}`,
      },
    );
  }
}
