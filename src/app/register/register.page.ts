import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserCredential } from '@angular/fire/auth';
import { DataService } from '../services/data.service';
import { UserAuth } from '../interfaces/user.model';
import { UserAccount } from '../interfaces/user-account.model';
import { SelectOption } from '../interfaces/select-option.model';
import { College } from '../enums/college.enum';
import { UserRole } from '../enums/user-role.enum';
import {
  regions,
  provinces,
  cities,
  barangays,
  provincesByCode,
  regionByCode,
  provinceByName,
  //@ts-ignore
} from 'select-philippines-address';
import { Region } from '../interfaces/region.model';
import { Province } from '../interfaces/province.model';
import { CityMun } from '../interfaces/city-mun.model';
import { Barangay } from '../interfaces/barangay.model';

// Generated by https://quicktype.io

interface Courses {
  CICS: SelectOption[];
  CIT: SelectOption[];
  COE: SelectOption[];
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  type: string = 'personal';
  errorMessage: string = '';

  role: string = 'student';

  collegeOptions: SelectOption[] = [
    {
      value: 'CICS',
      text: 'CICS',
    },
    {
      value: 'CIT',
      text: 'CIT',
    },
    {
      value: 'COE',
      text: 'COE',
    },
  ];

  positionOptions: SelectOption[] = [
    {
      value: 'Intructor I',
      text: 'Intructor I',
    },
    {
      value: 'Intructor II',
      text: 'Intructor II',
    },
    {
      value: 'Intructor III',
      text: 'Intructor III',
    },
    {
      value: 'Assistant I',
      text: 'Assistant I',
    },
    {
      value: 'Assistant II',
      text: 'Assistant II',
    },
    {
      value: 'Assistant III',
      text: 'Assistant III',
    },
    {
      value: 'Assistant IV',
      text: 'Assistant IV',
    },
  ];

  courses: Courses = {
    CICS: [
      {
        value: 'BSCS',
        text: 'BSCS',
      },
      {
        value: 'BSIT',
        text: 'BSIT',
      },
      {
        value: 'BMMA',
        text: 'BMMA',
      },
    ],
    CIT: [
      {
        value: 'AAA',
        text: 'AAA',
      },
      {
        value: 'BBB',
        text: 'BBB',
      },
      {
        value: 'CCC',
        text: 'CCC',
      },
    ],
    COE: [
      {
        value: 'DDD',
        text: 'DDD',
      },
      {
        value: 'EEE',
        text: 'EEE',
      },
      {
        value: 'FFF',
        text: 'FFF',
      },
    ],
  };

  regionOptions: SelectOption[] = [];
  regions: Region[] = [];
  regionSelected: Region | null = null;

  provinceOptions: SelectOption[] = [];
  provinces: Province[] = [];
  provinceSelected: Province | null = null;

  cityMunOptions: SelectOption[] = [];
  cityMuns: CityMun[] = [];
  cityMunSelected: CityMun | null = null;

  barangayOptions: SelectOption[] = [];
  barangays: Barangay[] = [];
  barangaySelected: Barangay | null = null;

  courseOptions: SelectOption[] = this.courses.CICS;

  errorMessages = {
    fullname: {
      required: 'Full Name is required.',
    },
    age: {
      required: 'Age is required.',
      min: 'Should be at least 18 years old.',
      max: 'Should be max 150 years old.',
    },
    gender: {
      required: 'Gender is required.',
    },
    schoolID: {
      required: 'School ID is required.',
    },
    phoneNumber: {
      required: 'Phone Number is required.',
      minlength: 'Should be 10 digits long.',
      maxlength: 'Should be 10 digits long.',
    },
    address: {
      required: 'Address is required.',
    },
    region: {
      required: 'Region is required.',
    },
    province: {
      required: 'Province is required.',
    },
    cityMun: {
      required: 'City/Municipality is required.',
    },
    barangay: {
      required: 'Barangay is required.',
    },
    course: {
      required: 'Course is required.',
    },
    college: {
      required: 'College is required.',
    },
    position: {
      required: 'Position is required.',
    },
    email: {
      required: 'Email is required.',
      pattern: 'Please enter a valid email.',
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password must be at least 8 characters long.',
    },
  };

  formGroup: FormGroup;
  fullname = new FormControl('', [Validators.required]);
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(150),
  ]);
  gender = new FormControl('', [Validators.required]);
  schoolID = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);
  address = new FormControl('', [Validators.required]);
  region = new FormControl('', [Validators.required]);
  province = new FormControl('', [Validators.required]);
  cityMun = new FormControl('', [Validators.required]);
  barangay = new FormControl('', [Validators.required]);

  college = new FormControl('CICS', [Validators.required]);
  course = new FormControl('BSCS', [Validators.required]);
  position = new FormControl('Instructor I', [Validators.required]);
  email = new FormControl('test@gmail.com', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
  ]);
  password = new FormControl('Pass123@', [
    Validators.minLength(8),
    Validators.required,
  ]);

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private dataService: DataService
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
      position: this.position,
      email: this.email,
      password: this.password,
    });
  }

  async ngOnInit(): Promise<void> {
    await regions().then((regions: Region[]) => {
      console.log(regions);
      this.regions = regions;
      this.regionOptions = regions.map((region: Region) => {
        return {
          text: region.region_name,
          value: region.id.toString(),
        } as SelectOption;
      });
    });
  }
  async onSubmit(values: {
    fullname: string;
    schoolID: string;
    phoneNumber: string;
    address: string;
    course?: string;
    college?: string;
    position?: string;
    age: string;
    gender: string;
    email: string;
    password: string;
  }) {
    if (this.formGroup.invalid) {
      console.log('Invalid form');
      return;
    }
    const loading = await this.loadingCtrl.create();
    await loading.present();
    console.log('REGISTER:', values);
    this.authService
      .register(values.email, values.password)
      .then(async (user: UserCredential) => {
        // Success register
        console.log(user);
        const uid = user.user.uid;
        // create user on firestore

        let newUser: UserAccount;
        if (this.role === 'student') {
          newUser = {
            uid,
            email: values.email,
            fullname: values.fullname,
            age: values.age,
            gender: values.gender,
            schoolID: values.schoolID,
            phoneNumber: values.phoneNumber,
            address: {
              region: this.regionSelected!,
              province: this.provinceSelected!,
              cityMun: this.cityMunSelected!,
              barangay: this.barangaySelected!,
            },
            course: values.course,
            college: values.college,
            role: UserRole.STUDENT,
          };
        } else if (this.role === 'faculty') {
          newUser = {
            uid,
            email: values.email,
            fullname: values.fullname,
            age: values.age,
            gender: values.gender,
            schoolID: values.schoolID,
            phoneNumber: values.phoneNumber,
            address: {
              region: this.regionSelected!,
              province: this.provinceSelected!,
              cityMun: this.cityMunSelected!,
              barangay: this.barangaySelected!,
            },
            college: values.college,
            position: values.position,
            role: UserRole.FACULTY,
          };
        } else {
          newUser = {
            uid,
            email: values.email,
            fullname: values.fullname,
            age: values.age,
            gender: values.gender,
            schoolID: values.schoolID,
            phoneNumber: values.phoneNumber,
            address: {
              region: this.regionSelected!,
              province: this.provinceSelected!,
              cityMun: this.cityMunSelected!,
              barangay: this.barangaySelected!,
            },
            position: values.position,
            role: UserRole.STAFF,
          };
        }
        console.log('Adding new user:', newUser);
        await this.dataService.addUser(newUser);
        loading.dismiss();
        this.router.navigate(['home']);
      })
      .catch(async (err) => {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Register failed',
          message: err.message,
          buttons: ['OK'],
        });
        await alert.present();
      });
  }

  selectedCollege(collegeCode: College) {
    console.log('received selected:', collegeCode);
    this.courseOptions = this.courses[collegeCode];
    this.course.setValue('');
  }

  async selectedRegion(findId: any) {
    const found = this.regions.find((f) => f.id == findId);
    if (found) {
      console.log('selected: ', found);
      this.regionSelected = found;
      // ! RESET
      this.provinceSelected = null;
      this.province.setValue('');
      this.cityMunSelected = null;
      this.cityMun.setValue('');
      this.barangaySelected = null;
      this.barangay.setValue('');

      await provinces(found.region_code).then((provinces: Province[]) => {
        this.provinces = provinces;
        console.log(provinces);
        this.provinceOptions = provinces.map((p) => {
          return {
            text: p.province_name,
            value: p.province_code,
          };
        });
      });
    }
  }

  async selectedProvince(findId: any) {
    const found = this.provinces.find((f) => f.province_code == findId);
    if (found) {
      console.log('selected: ', found);
      this.provinceSelected = found;

      // ! RESET
      this.cityMunSelected = null;
      this.cityMun.setValue('');
      this.barangaySelected = null;
      this.barangay.setValue('');

      await cities(found.province_code).then((cities: CityMun[]) => {
        this.cityMuns = cities;
        console.log(cities);

        this.cityMunOptions = cities.map((p: CityMun) => {
          return {
            text: p.city_name,
            value: p.city_code,
          };
        });
      });
    }
  }

  async selectedCityMun(findId: any) {
    const found = this.cityMuns.find((f) => f.city_code == findId);
    if (found) {
      console.log('selected: ', found);
      this.cityMunSelected = found;

      await barangays(found.city_code).then((Bs: Barangay[]) => {
        this.barangays = Bs;
        console.log(Bs);

        this.barangayOptions = Bs.map((b: Barangay) => {
          return {
            text: b.brgy_name,
            value: b.brgy_code,
          };
        });
      });
    }
  }

  async selectedBarangay(findId: any) {
    const found = this.barangays.find((f) => f.brgy_code == findId);
    if (found) {
      console.log('selected: ', found);
      this.barangaySelected = found;
    }
  }
}
