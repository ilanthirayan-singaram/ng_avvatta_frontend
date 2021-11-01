import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../common.service';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-recentdevice',
  templateUrl: './recentdevice.component.html',
  styleUrls: ['./recentdevice.component.scss']
})
export class RecentdeviceComponent implements OnInit {
streamingData = [];

  constructor(private common : CommonService,
    private service: ServiceService,
    public dialogRef: MatDialogRef<RecentdeviceComponent>) { }

  ngOnInit(): void {
    this.common.checkInitial();
    this.common.scrollTop();
    this.streamData();
  }
  closeModal() {
    this.dialogRef.close();
  }
  streamData(){
  this.common.loaderStart();
    let id;
    id = {
      user_id: localStorage.getItem('id')
    }
    this.service.deviceStream(id).subscribe(data =>{
      this.streamingData = JSON.parse(JSON.stringify(data)).data;
      // console.log(data);
      this.common.loaderStop();
    })
  }
}
