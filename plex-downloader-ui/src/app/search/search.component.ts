import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlertifyService} from "../_service/alertify.service";
import {LibraryService} from "../_service/library.service";
import {ComponentMessagingService} from "../_service/component-messaging.service";
import {Constants} from "../util/constants";
import {Video} from "../models/video.model";
import {Directory} from "../models/directory.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchComplete = false;

  movies: Video[] = new Array<Video>();
  shows: Directory[] = new Array<Directory>();
  episodes: Video[] = new Array<Video>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private alertify: AlertifyService,
              private libraryService: LibraryService,
              private componentMessagingService: ComponentMessagingService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Searching...');
      let query: string = params['searchQuery'];
      if (query != null && query.trim().length != 0) {
        this.retrieveSearchResults(query);

        //if (this.movies.length != 0 || this.shows.length != 0 || this.episodes.length != 0) {
          this.searchComplete = true;
        //}
      }
    });
  }

  retrieveSearchResults(searchQuery: string) {

    let serverIp = localStorage.getItem(Constants.PLEX_SELECTED_SERVER_URI);

    this.libraryService.retrieveSearchResults(serverIp, searchQuery).subscribe(mediaContainer => {

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


}