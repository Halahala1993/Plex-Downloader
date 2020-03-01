import {Component, Input, OnInit} from '@angular/core';
import {Video} from "../../models/video.model";
import {Constants} from "../../util/constants";
import {Router} from "@angular/router";
import {AlertifyService} from "../../_service/alertify.service";
import {LibraryService} from "../../_service/library.service";
import {ComponentMessagingService} from "../../_service/component-messaging.service";
import {Directory} from "../../models/directory.model";
import {SeriesPanelComponent} from "../../search/series-panel/series-panel.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.css']
})
export class MediaCardComponent implements OnInit {

  @Input() video: Video;
  @Input() show: Directory;

  private mobile = false;
  // static count = 0;

  constructor(private router: Router,
              private alertify: AlertifyService,
              private libraryService: LibraryService,
              private componentMessagingService: ComponentMessagingService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    if (window.screen.width < 768) {
      this.mobile = true;
    }
  }

  openDialog(video: Video): void {
    console.log("video example: " + video.title);
    const dialogRef = this.dialog.open(SeriesPanelComponent, {
      maxHeight: '70%',
      maxWidth: '70%',
      data: {video: video}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openShowDialog(show: Directory): void {
    console.log("show example: " + show.title);
    const dialogRef = this.dialog.open(SeriesPanelComponent, {
      width: '60%',
      data: {show: show}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  startDownloadingMedia(video: Video) {

    this.libraryService.retrieveMediaDownloadLink(video).subscribe(downloadLink => {
      this.beginDownload(downloadLink);
    });

  }

  beginDownload(url: string) {
    var link = document.createElement("a");
    link.download = "a";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    //window.open(url);
  }


}
