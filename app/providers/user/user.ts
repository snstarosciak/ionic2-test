import {Injectable} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Globals} from '../globals/globals';
import 'rxjs/add/operator/map';

@Injectable()
export class User {

  data: any = null;
  storage = new Storage(LocalStorage);

  constructor(
    private events: Events,
    private http: Http,
    private globals: Globals
  ) {
  }

  /**
   *  Create the headers to send to the server
   */
  createAuthHeaders() {
    return this.storage.get('user').then(function(user) {

      // Get user data and build headers
      let userData = JSON.parse(user);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      headers.append("Authorization", 'Bearer ' + userData.access_token);

      return headers;
    });
  }


  login(username, password) {

    let webUrl = 'https://ugihive.azurewebsites.net';
    let params = "grant_type=password&username=" + username + "&password=" + password;

    // Make a post to the server to get the token back
    return this.http.post(webUrl + '/Token', params)
        .map(res => res.json())
  }
  signup() {
    //this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:signup');
  }

  logout() {
    this.storage.remove('access_token');
    this.events.publish('user:logout');
  }

  hasLoggedIn() {
    return this.storage.get('user').then((user) => {
      if(user) {
        let userData = JSON.parse(user);
        return userData.access_token;
      } else {
        return false;
      }
    });
  }

  getAccount() {
    return this.createAuthHeaders().then(headers => {

      let url = `${this.globals.getApiUrl()}Account/GetCurrentUserInfo`;

      // Make the call
      return this.http.get(url, { headers: headers })
        .map(res => res.json());
    });
  }
}
