import {Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {User} from '../../providers/user/user';


@Page({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  signup: {username?: string, password?: string} = {};
  submitted = false;

  constructor(private nav: NavController, private userData: User) {}

  onSignup(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup();
      this.nav.push(TabsPage);
    }
  }
}
