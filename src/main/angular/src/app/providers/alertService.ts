import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor() { }

  public successAlert(msg: string) {
    swal.fire({
      title: 'Success',
      text: msg,
      type: 'success',
      animation: false,
      customClass: 'animated tada'
    });
  }

  public errorAlert(message: any) {
    swal.fire({
      title: 'Error',
      text: message,
      type: 'error',
      animation: false,
      customClass: 'animated tada'
    });
  }
}
