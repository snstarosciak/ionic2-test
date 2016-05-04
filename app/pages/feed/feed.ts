import {IonicApp, Page, Modal, Alert, NavController} from 'ionic-angular';
import {User} from '../../providers/user/user';
import {TopicData} from '../../providers/topic-data/topic-data';
import {PostAdded} from '../../components/post-added/post-added';
import {TopicFeedPage} from '../../pages/topic-feed/topic-feed';


@Page({
  templateUrl: 'build/pages/feed/feed.html',
  directives: [PostAdded]
})
export class FeedPage {

  posts         = null;

  constructor(
    private app:  IonicApp,
    private nav:  NavController,
    private user: User,
    private feed: TopicData
  ) {
  }

  ngOnInit() {
    // Get the feed data
    this.feed.getFeed().then(data => {
      data.subscribe(data => {
        this.posts = data;
        console.log(data);
      })
    })
  }

  goToTopic(topic) {
    this.nav.push(TopicFeedPage, { topic: topic });
  }


}
