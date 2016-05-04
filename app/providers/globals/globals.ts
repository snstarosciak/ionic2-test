import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Globals provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Globals {
  apiUrl: any = 'https://ugihive.azurewebsites.net/api/';

  constructor(public http: Http) {}

  getApiUrl() {
    return this.apiUrl;
  }

}

