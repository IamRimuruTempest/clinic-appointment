import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { HistoryComponent } from './history/history.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { OrdersComponent } from './orders/orders.component';
import { Subscription, filter } from 'rxjs';
import { UserAccount } from 'src/app/interfaces/user-account.model';
import { Capacitor } from '@capacitor/core';
import {
  Camera,
  CameraSource,
  CameraResultType,
  Photo,
} from '@capacitor/camera';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { DataService } from 'src/app/services/data.service';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  account: UserAccount = {
    fullname: '',
    age: '',
    address: '',
    gender: '',
    schoolID: '',
    phoneNumber: '',
    course: '',
    college: '',
  };
  imageUrl: string = '';
  constructor(
    public authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private modalCtrl: ModalController,
    private storage: Storage
  ) {
    this.authService.userAccount$
      .pipe(filter((use) => use !== null))
      .subscribe((user) => {
        this.account = user!;
      });
  }

  ngOnInit() {}

  async logoutAccount() {
    console.log('log out');
    await this.authService.logout();
    this.router.navigate(['login']);
  }

  async openHelpComponent() {
    const modal = await this.modalCtrl.create({
      component: HelpComponent,
    });

    return await modal.present();
  }

  async openChangePasswordModal() {
    const modal = await this.modalCtrl.create({
      component: ChangePasswordModalComponent,
    });

    return await modal.present();
  }

  async openAboutComponent() {
    const modal = await this.modalCtrl.create({
      component: AboutComponent,
    });

    return await modal.present();
  }

  async openHistoryComponent() {
    const modal = await this.modalCtrl.create({
      component: HistoryComponent,
    });

    return await modal.present();
  }

  async openPersonalInformationComponent() {
    const modal = await this.modalCtrl.create({
      component: PersonalInformationComponent,
      componentProps: {
        account: this.account,
      },
    });

    return await modal.present();
  }

  async openUserOrdersInformation() {
    const modal = await this.modalCtrl.create({
      component: OrdersComponent,
      componentProps: {},
    });

    return await modal.present();
  }

  async changeImage() {
    console.log('changeImage');
    const image = await this.takePicture();
    if (!image) return;
    this.imageUrl = image.dataUrl!;
    const blob = this.dataURLtoBlob(image.dataUrl!);
    const url = await this.uploadImage(blob, image);
    console.log(url);
    // Save URL to Firestore
    this.dataService.updateUser({ ...this.account, imgUrl: url! });
  }

  async uploadImage(blob: Blob, imageData: Photo): Promise<string | null> {
    try {
      const filePath = `userImage/${this.account.uid}.${imageData.format}`;
      const fileRef = ref(this.storage, filePath);
      const task = await uploadBytes(fileRef, blob);
      console.log(task);
      const url = getDownloadURL(fileRef);
      return url;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  async takePicture(): Promise<Photo | null> {
    try {
      if (Capacitor.getPlatform() !== 'web') {
        await Camera.requestPermissions();
      }
      const image = await Camera.getPhoto({
        quality: 90,
        // allowEditing: true,
        source: CameraSource.Prompt,
        width: 600,
        resultType: CameraResultType.DataUrl,
      });

      console.log('image: ', image);
      return image;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  dataURLtoBlob(dataUrl: string) {
    let arr = dataUrl.split(',');
    let mime = arr[0].match(/:(.*?);/)![1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
}
