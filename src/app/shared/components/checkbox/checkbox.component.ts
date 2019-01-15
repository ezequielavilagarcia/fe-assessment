import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() active = false;
  @Input() text: string;
  @Output() activeChange = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  change() {
    this.active = !this.active;
    this.activeChange.emit(this.active);
  }
}
