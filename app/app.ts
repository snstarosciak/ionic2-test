import {ViewChild} from 'angular2/core';
import {App, Events, Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {User} from './providers/user/user';
import {TopicData} from './providers/topic-data/topic-data';
import {Globals} from './providers/globals/globals';
import {TabsPage} from './pages/tabs/tabs';
import {FeedPage} from './pages/feed/feed';
import {LoginPage} from './pages/login/login';
import {IntroLoadingPage} from './pages/intro-loading/intro-loading';
import {SignupPage} from './pages/signup/signup';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@App({
  templateUrl: 'build/app.html',
  providers: [User, TopicData, Globals],
  config: {}
})
class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IntroLoadingPage;
  loggedIn = false;

  constructor(
    private events: Events,
    private userData: User,
    platform: Platform,
    globals: Globals
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });

    this.listenToLoginEvents();

    // Sync the data every X number of seconds
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:signup', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:logout', () => {
      this.loggedIn = false;
    });
  }

  // Run after the app has initiated
  ngAfterViewInit(){
    setTimeout(() => {
      this.userData.hasLoggedIn().then(function(value) {

        // If the user is logged in, redirect them to the feed
        if(value) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }
      }.bind(this));
    }, 300);
  }
}
