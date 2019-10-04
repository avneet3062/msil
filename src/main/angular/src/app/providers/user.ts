import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CustomHttpService } from './custamHTTP';
import { StorageService } from './localStorage';

@Injectable()
export class User {
  _user: any;

  constructor(public https: CustomHttpService, public storage: StorageService, public customHttpService: CustomHttpService) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */

  getUser() {
    if (this.storage.getData('ngStorage-token')) {
      const token = this.storage.getData('ngStorage-token');
      let user = {};
      if (typeof token !== 'undefined') {
        user = JSON.parse(this.urlBase64Decode(token.split('.')[1]));
      }
      return user;
    }
  }

  urlBase64Decode(str) {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Illegal base64url string!');
    }
    return window.atob(output);
  }

  login(accountInfo: any) {
    console.log(accountInfo);

    return this.customHttpService.post('oauth/token?grant_type=password&username='
      + accountInfo.userId + '&password=' + accountInfo.password, {})
      .pipe(map(response => {
        this._loggedIn(response);
        return response;
      }));
  }




  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this.storage.clearData();
    location.reload();
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this.storage.storeData('access_token', resp.access_token);
    // this.storage.storeData('ngStorage-privileges', resp.privileges);
    this._user = resp.user;
  }
}
