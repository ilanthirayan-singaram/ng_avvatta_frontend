import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../common.service';
@Component({
  selector: 'app-filmdo',
  templateUrl: './filmdo.component.html',
  styleUrls: ['./filmdo.component.scss']
})
export class FilmdoComponent implements OnInit {

  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private service: ServiceService,
    private common: CommonService) { }

  ngOnInit(): void {
    this.movies()
  }

  movies(){
    const payload = {
      "rental":"15"
  }
    console.log(this.service.filmDooList(payload).subscribe(data => {
      console.log(data)
    }))
  }

}
