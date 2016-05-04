import {Component, Input} from 'angular2/core';
import {NavController} from 'ionic-angular';
import {TopicFeedPage} from '../../pages/topic-feed/topic-feed';

@Component({
  selector: 'post-added',
  templateUrl: 'build/components/post-added/post-added.html',
})
export class PostAdded {
  @Input() post: any;
  title: string = '';

  constructor(private nav: NavController) {}

  goToFeedTopic() {
    this.nav.push(TopicFeedPage, this.post);
  }

  ngOnInit() {
    this.title = this.post.title.replace(/(<([^>]+)>)/ig,"");
  }
}
