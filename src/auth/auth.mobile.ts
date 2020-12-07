import { Platform } from '@angular/cdk/platform';
import { AuthService } from './auth.service';

export class AuthMobile {
    constructor(platform: Platform, auth: AuthService) {
        if (!platform.ANDROID && !platform.IOS) {
            auth.authorize();
        }
    }
}
