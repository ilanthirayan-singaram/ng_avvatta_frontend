import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IframeComponent implements OnInit {
yt;
paddingHeight;
  constructor(protected sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.paddingHeight = parseInt(localStorage.getItem('height')) + 'px';
    this.yt = this.sanitizer.bypassSecurityTrustResourceUrl('https://games.mentalup.co');
  }

}
