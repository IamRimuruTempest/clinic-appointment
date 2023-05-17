import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() control = new FormControl();
  @Input() label = '';
  @Input() type = 'text';
  @Input() title: string = '';
  @Input() errorMessages: Record<string, string> = {};
  @Input() placeholder: string = '';
  @Input() labelPlacement: string = '';
  @Input() readonly: boolean = false;

  constructor() {}

  ngOnInit() {}
}
