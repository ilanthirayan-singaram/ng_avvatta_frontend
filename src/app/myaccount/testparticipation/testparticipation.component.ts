import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
@Component({
  selector: 'app-testparticipation',
  templateUrl: './testparticipation.component.html',
  styleUrls: ['./testparticipation.component.scss']
})
export class TestparticipationComponent implements OnInit {
  constructor(private router : Router, 
    private common : CommonService,
    public dialogRef: MatDialogRef<TestparticipationComponent>) { }

  ngOnInit(): void {
   this.common.checkInitial();
  }
  partcipation(particip){
    // console.log(particip.value)
  }
  closeModal() {
    this.dialogRef.close();
  }
}
