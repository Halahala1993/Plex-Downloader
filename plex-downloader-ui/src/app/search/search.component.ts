import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlertifyService} from "../_service/alertify.service";
import {LibraryService} from "../_service/library.service";
import {ComponentMessagingService} from "../_service/component-messaging.service";
import {Video} from "../models/video.model";
import {Directory} from "../models/directory.model";
import {LoadingScreenService} from "../_service/loading.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

declare let $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  // used unsubscribe from observable
  private _destroy$: Subject<boolean> = new Subject();

  // @ViewChild('collapse', null) collapse: ElementRef;

  searchComplete = false;

  movies: Video[] = new Array<Video>();
  shows: Directory[] = new Array<Directory>();
  episodes: Video[] = new Array<Video>();

  showIndex: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private alertify: AlertifyService,
              private libraryService: LibraryService,
              private componentMessagingService: ComponentMessagingService,
              private loadingScreenService: LoadingScreenService) {

    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    };

    const navigation = this.router.getCurrentNavigation();
    let query = navigation.extras.state ? navigation.extras.state.searchQuery : null;
    console.log('query is null: ' + query === null);
    if (query != null && query.trim().length != 0) {
      console.log('Searching for ' + query);

      this.retrieveSearchResults(query);

      //if (this.movies.length != 0 || this.shows.length != 0 || this.episodes.length != 0) {
      this.searchComplete = true;
      //}
    }
  }

  ngOnInit() {

    /*this.route.params.subscribe(params => {
      let query: string = params['searchQuery'];
      if (query != null && query.trim().length != 0) {
        console.log('Searching for ' + query);

        this.retrieveSearchResults(query);

        //if (this.movies.length != 0 || this.shows.length != 0 || this.episodes.length != 0) {
          this.searchComplete = true;
        //}
      }
    });*/
  }

  retrieveSearchResults(searchQuery: string) {

    this.libraryService.retrieveSearchResults(searchQuery).pipe(
      takeUntil(this._destroy$)
    ).subscribe(mediaContainer => {

      let videos = mediaContainer.video;
      let directories = mediaContainer.directory;

      console.log('searched videos size: ' + videos.length);
      console.log('searched directories size: ' + directories.length);

      videos.forEach(video => {
        if (video.type === 'movie') {
          this.movies.push(video);
        } else if (video.type === 'episode') {
          this.episodes.push(video);
        }
      });

      directories.forEach(directory => {
        if (directory.type === 'show') {
          this.shows.push(directory);
        }
      })


    });
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

}
