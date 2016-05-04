import {Page, NavController, Storage, LocalStorage, Events} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {User} from '../../providers/user/user';
import {Globals} from '../../providers/globals/globals';


@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  storage = new Storage(LocalStorage);

  constructor(
    private nav: NavController,
    private events: Events,
    private globals: Globals,
    private userData: User
  ) {}

  onLogin(form) {
    this.submitted = true;
    if (form.valid) {
      this.userData.login(this.login.username, this.login.password).subscribe(data => {
        this.storage.set('user', JSON.stringify(data));
        this.events.publish('user:login');
        this.nav.push(TabsPage);
      })
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
}
