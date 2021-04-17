import { Component, OnInit } from '@angular/core';
import { UserDatasService } from 'src/app/datas/user-details/user-datas.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private userData:UserDatasService
  ) { }

  ngOnInit(): void {
  }

}
