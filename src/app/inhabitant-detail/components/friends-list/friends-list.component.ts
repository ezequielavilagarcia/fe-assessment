import { Component, OnInit, Input } from '@angular/core';
import { Gnome } from 'src/app/shared/models/gnome';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  @Input() gnome: Gnome;
  constructor() {}

  ngOnInit() {}
}
