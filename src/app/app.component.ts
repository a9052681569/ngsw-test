import {Component, OnInit} from '@angular/core';
import {SwService} from './sw.service';
import {HttpClient} from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  	title = 'service worker test';

  	notificationText = '';

  	pushSub: PushSubscription | null = null;

  	constructor(
  		public swService: SwService,
		  private http: HttpClient) {
	}

	ngOnInit(): void {
  		this.swService.initUpdatesListener();

  		this.swService.getPushSubscription()
			.subscribe(sub => {
				this.pushSub = sub;
			});
	}

	sendNotification(): void {

		if (this.pushSub) {
			console.log(this.pushSub.toJSON());
		}
	}
	addPushSubscriber(): void {
  		this.swService.requestSub()
			.then(sub => {
				this.http.post('http://localhost:3000/api/notifications', sub.toJSON())
					.subscribe(e => {
						console.log(e);
					});
			});

	}

	send(): void {
		this.http.post('http://localhost:3000/api/newsletter', {body: this.notificationText})
			.subscribe(e => {
				console.log(e);
			});
	}
}



