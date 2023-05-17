import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { College } from 'src/app/enums/college.enum';
import { SelectOption } from 'src/app/interfaces/select-option.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() control = new FormControl();
  @Input() errorMessages: Record<string, string> = {};
  @Input() placeholder: string = 'No placeholder';
  @Input() label: string = 'No label';
  @Input() labelPlacement: string = 'fixed';
  @Input() justify: string = 'space-between';
  @Input() options: SelectOption[] = [];
  @Output() selected: EventEmitter<College> = new EventEmitter();

  ngOnInit(): void {}

  handleChange(event: any) {
    const value = event.detail.value;
    console.log(value);
    this.selected.emit(value);
  }
}
