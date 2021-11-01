import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
lang : any = [];
  constructor(private common : CommonService,
    public dialogRef: MatDialogRef<LanguageComponent>) { }

  ngOnInit(): void {
    this.lang = [
    {lang:'Dutch',
    img: "../../../assets/icons/language/Dutch.png"},
    {lang:'French',
    img: "../../../assets/icons/language/French.PNG"},
    {lang:'German',
    img: "../../../assets/icons/language/German.PNG"},
    {lang:'Irish',
    img: "../../../assets/icons/language/Irish.PNG"},
    {lang:'Italian',
    img: "../../../assets/icons/language/Italian.PNG"},
    {lang:'Japanese',
    img: "../../../assets/icons/language/Japanese.PNG"},

    ];
    this.common.scrollTop();
  }
 
  closeModal() {
    this.dialogRef.close();
  }
}
