import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  selector: 'app-update-information',
  templateUrl: './update-information.component.html',
  styleUrls: ['./update-information.component.scss'],
})
export class UpdateInformationComponent implements OnInit {
  account: any;

  errorMessages = {
    fullname: {
      required: 'Fullname is required.',
    },
    age: {
      required: 'Age is required.',
    },
    gender: {
      required: 'Gender is required.',
    },
    schoolID: {
      required: 'School ID is required.',
    },
    phoneNumber: {
      required: 'Phone Number is required.',
    },
    address: {
      required: 'Address is required.',
    },
    course: {
      required: 'Course is required.',
    },
    college: {
      required: 'College is required.',
    },
  };

  formGroup!: FormGroup;
  fullname = new FormControl('', [Validators.required]);
  age = new FormControl('', [Validators.required]);
  gender = new FormControl('', [Validators.required]);
  schoolID = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  course = new FormControl('', [Validators.required]);
  college = new FormControl('', [Validators.required]);

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder
  ) {
    this.formGroup = this.createFormGroup();
  }

  createFormGroup() {
    return this.formBuilder.group({
      fullname: this.fullname,
      age: this.age,
      gender: this.gender,
      schoolID: this.schoolID,
      phoneNumber: this.phoneNumber,
      address: this.address,
      course: this.course,
      college: this.college,
    });
  }
  ngOnInit() {
    this.fullname.setValue(this.account['fullname']);
    this.age.setValue(this.account['age']);
    this.gender.setValue(this.account['gender']);
    this.schoolID.setValue(this.account['schoolID']);
    this.phoneNumber.setValue(this.account['phoneNumber']);
    this.address.setValue(this.account['address']);
    this.course.setValue(this.account['course']);
    this.college.setValue(this.account['college']);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
