import { Injectable } from '@angular/core';
import {SwPush, SwUpdate} from '@angular/service-worker';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SwService {

	constructor(
		private updates: SwUpdate,
		private snack: MatSnackBar,
		private readonly push: SwPush) {
	}

	initUpdatesListener(): void {
		this.updates.available.subscribe(e => {

			this.snack.open(
				'сайт был обновлен, изменения вступят в силу после перезагрузки страницы',
				undefined,
				{duration: 5000}
				);
		});
	}

	requestSub(): Promise<PushSubscription> {
		return this.push.requestSubscription({
				serverPublicKey: VAPIDKeys.publicKey
			});
	}

	getPushSubscription(): Observable<PushSubscription | null> {
		return this.push.subscription;
	}
}

export const VAPIDKeys = {
	publicKey: 'BKOm81AMRNJEmh2zkEhvvM9xsI-AxX8W8U0Ill1_8Agnovb50xaJwCMD673qTGmjFJaxxRBy8mM9kfpE_YnVLKU',
	privateKey: 'riSOFR8yFtcWVJgv7hSy_SW9-Z9GjIBGV1OABf9KfBg'
};
