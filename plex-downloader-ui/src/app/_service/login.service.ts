import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../models/user/user.model';
import {Router} from '@angular/router';
import {AlertifyService} from './alertify.service';
import {LibraryService} from './library.service';
import {Constants} from "../util/constants";
import {Observable} from "rxjs";
import {PlexPin} from "../models/plexpin.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // baseUrl = 'https://plex.tv/';
  baseUrl = Constants.PLEX_DOWNLOADER_BASE_URL;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertify: AlertifyService,
    private libraryService: LibraryService) { }

  login(model: any) : Observable<User> {

    return this.http.post(this.baseUrl + '/basiclogin', model)
      .pipe(
        map((user: User) => {

          if (user) {
            // console.log('JWT Token: ' + user.jwtToken);
            localStorage.setItem(Constants.PLEX_AUTH_TOKEN, user.jwtToken);
            localStorage.setItem(Constants.PLEX_USER_ICON, user.thumb);
            return user;
          }
        })
      );
  }

  retrieveOAuthLoginPinAndUrl(): Observable<PlexPin>{

    return this.http.get<PlexPin>(this.baseUrl + '/oAuth')
      .pipe(
        map((response: any) => {

          return response;
        })
      );
  }

  retrieveOAuthPinResults(pinId: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/oAuth/' + pinId)
      .pipe(
        map((user: any) => {

          return user;
        })
      );
  }

  isLoggedIn() : boolean {
    let authToken = localStorage.getItem(Constants.PLEX_AUTH_TOKEN);

    if (authToken === null || authToken.trim().length === 0) {
      return false;
    }

    return true;
  }
}
