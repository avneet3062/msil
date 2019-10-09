import { Injectable } from '@angular/core';
declare const $: any;
@Injectable({
    providedIn: 'root'
})
export class TostService {

    constructor() { }


    showNotificationSuccess(message?) {

        $.notify({

            icon: 'ti-bell',
            message: message || 'Successfull'



        }, {
                type: 'success',
                timer: 1000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
    }





    showNotificationFailure(err) {
        console.log(err);

        $.notify({

            icon: 'ti-alert',
            message: err.status + ' ' + err.message,



        }, {
                type: 'danger',
                timer: 5000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
    }

    errorAlert(message) {
        console.log(message);

        $.notify({

            icon: 'ti-alert',
            message: message || '',



        }, {
                type: 'danger',
                timer: 5000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
    }





}
