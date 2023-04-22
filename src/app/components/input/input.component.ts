import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() type = 'text';
  @Input() name = '';

  @Input() label = 'Label';
  constructor() {}

  ngOnInit() {}
}
