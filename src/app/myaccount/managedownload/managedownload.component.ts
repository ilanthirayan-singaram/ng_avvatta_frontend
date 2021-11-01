import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
@Component({
  selector: 'app-managedownload',
  templateUrl: './managedownload.component.html',
  styleUrls: ['./managedownload.component.scss']
})
export class ManagedownloadComponent implements OnInit {

  constructor(private router : Router, private common : CommonService,
    public dialogRef: MatDialogRef<ManagedownloadComponent>,) { }

  ngOnInit(): void {
    this.common.scrollTop();
   this.common.checkInitial();
  }
closeModal() {
    this.dialogRef.close();
  }
}
