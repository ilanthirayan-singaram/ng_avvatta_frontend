import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-avattacard',
  templateUrl: './avattacard.component.html',
  styleUrls: ['./avattacard.component.scss']
})
export class AvattacardComponent implements OnInit {
  constructor(private router : Router, private common : CommonService,
    public dialogRef: MatDialogRef<AvattacardComponent>
) { }

  ngOnInit(): void {
    this.common.checkInitial();
    this.common.scrollTop();
  }
  

closeModal() {
    this.dialogRef.close();
  }

}
