import { Component, OnInit, Input } from '@angular/core';
import { Gnome } from 'src/app/shared/models/gnome';

@Component({
  selector: 'app-professions-list',
  templateUrl: './professions-list.component.html',
  styleUrls: ['./professions-list.component.scss']
})
export class ProfessionsListComponent implements OnInit {
  @Input() gnome: Gnome;
  constructor() {}

  ngOnInit() {}
}
