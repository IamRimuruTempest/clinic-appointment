import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DentalProblemComponent } from './dental-problem/dental-problem.component';
import { ModalController } from '@ionic/angular';
import { UserAccount } from 'src/app/interfaces/user-account.model';
import { UserRole } from 'src/app/enums/user-role.enum';
import { filter } from 'rxjs';
import { NotificationsComponent } from './notifications/notifications.component';

interface DentalProblem {
  content1: string[];
  symptoms: string[];
  content2: string[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  gumDisease: DentalProblem = {
    content1: [
      'Gingivitis is the early stage and mild form of gum or periodontal disease. It is a bacterial infection that is caused by the buildup of plaque. Common symptoms are gums that are red, swollen, and bleed easily. You may also experience bad breath and sensitive teeth that hurt when you chew.',
      'Skipping brushing and poor brushing techniques can contribute to gum disease. So, too, can crooked teeth that are hard to brush properly. Other risk factors include tobacco use, pregnancy, and diabetes.',
      'It is important to note that gingivitis can be painless and as such, you may not notice it. This makes regular dental checkups a good idea.',
      'Gingivitis can be treated by a thorough cleaning from your dental health professional. To prevent it from coming back, you will have to practice twice-daily brushing and flossing.',
      'Periodontitis',
      'Left untreated, gingivitis can become a more severe form of gum disease called periodontitis. This is when pockets in the gum become infected. This can lead to damage of the bone and tissue that hold the teeth, as these, too, become infected. ',
      ' It can also lead to ',
    ],
    symptoms: [
      'Shrinking and receding gums',
      'Loose permanent teeth',
      'A change in bite',
      'An unpleasant taste in your mouth',
      'Persistent bad breath',
    ],
    content2: [
      'Whats more, periodontitis can trigger an inflammatory response throughout your body. ',
      'Dental care for periodontitis includes topical antibiotics to treat the infection or a referral to a periodontist – a gum disease specialist.',
    ],
  };

  toothDecay: DentalProblem = {
    content1: [
      'Tooth decay is also known as dental caries or dental cavities. It is the most common dental problem that dentists see in patients. Practically everyone, at some point in their life, has experienced tooth decay.',
      'Tooth decay occurs when bacteria form a film, called plaque, on the surface of teeth. The bacteria produce acids from the sugars in food. The acids eat away at and permanently damage the enamel, or outer layer, of the tooth. The acids then start working on the softer dentin layer beneath the enamel.',
      'This breakdown of the tooth can lead to cavities or holes in your teeth. It can also cause toothaches, including pain when you eat and drink hot, cold, or sweet things.',
      'Other symptoms of tooth decay may include:',
    ],
    symptoms: [
      'Bad breath',
      'Black or brown spots on your teeth',
      'An unpleasant taste in your mouth',
    ],
    content2: [
      'Dental care begins with assessing the extent of your tooth decay and recommending a course of action. This may include fillings, crowns, or a root canal. The option chosen may be extraction followed by dental implants or dentures.',
      'You can help to prevent tooth decay with regular (twice daily) brushing and flossing. Also, get regular checkups from your dentist to have the plaque scraped from your teeth.',
    ],
  };

  badBreath: DentalProblem = {
    content1: [
      'Bad breath or halitosis is one of the most common dental problems. It is also among the most distressing. Bad breath can be caused by several different factors, including:',
    ],
    symptoms: [
      'Poor oral hygiene',
      'Dry mouth',
      'Medication',
      'Infection',
      'Acid reflux',
      'Cancer',
    ],
    content2: [
      'One or more of the foods you eat could also be the cause of your halitosis. Spices such as garlic and onion are common culprits.',
      'Because the causes of bad breath are so varied, your dentist will do a complete assessment and prescribe a course of action that best suits your case. ',
    ],
  };

  sensitiveTeeth: DentalProblem = {
    content1: [
      'Your teeth become sensitive to hot and cold foods and drinks when the enamel is worn away and the dentin is exposed. ',
      'The dentin has tubes that lead to the nerve deeper inside the tooth. Hot or cold substances can travel along the tubes to the nerve and cause intense pain. ',
      'Tooth sensitivity, also known as dentin hypersensitivity, can be caused by tooth decay. Other possible causes include:',
    ],
    symptoms: [
      'Gum disease',
      'Root infection ',
      'A cracked or broken tooth',
      'Worn-down crown or fillings',
      'Enamel erosion',
      'Receding gums',
    ],
    content2: [
      'One or more of the foods you eat could also be the cause of your halitosis. Spices such as garlic and onion are common culprits.',
      'Because the causes of bad breath are so varied, your dentist will do a complete assessment and prescribe a course of action that best suits your case. ',
    ],
  };

  account: UserAccount = {
    fullname: '',
    age: '',
    address: '',
    gender: '',
    schoolID: '',
    phoneNumber: '',
    course: '',
    college: '',
    role: UserRole.STUDENT,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalCtrl: ModalController
  ) {
    this.authService.userAccount$
      .pipe(filter((use) => use !== null))
      .subscribe((user) => {
        this.account = user!;
      });
  }

  ngOnInit() {}

  async opentNotification() {
    const modal = await this.modalCtrl.create({
      component: NotificationsComponent,
    });
    return await modal.present();
  }

  async openToothDecay() {
    const modal = await this.modalCtrl.create({
      component: DentalProblemComponent,
      componentProps: {
        title: 'Tooth Decay',
        dentalProblem: this.toothDecay,
        content: 'Problem',
      },
    });

    return await modal.present();
  }

  async openGumDisease() {
    const modal = await this.modalCtrl.create({
      component: DentalProblemComponent,
      componentProps: {
        title: 'Gum Disease',
        dentalProblem: this.gumDisease,
        content: 'Problem',
      },
    });

    return await modal.present();
  }

  async openBadBreath() {
    const modal = await this.modalCtrl.create({
      component: DentalProblemComponent,
      componentProps: {
        title: 'Bad Breath',
        dentalProblem: this.badBreath,
        content: 'Problem',
      },
    });

    return await modal.present();
  }

  async openSensitiveTeeth() {
    const modal = await this.modalCtrl.create({
      component: DentalProblemComponent,
      componentProps: {
        title: 'Sensitive Teeth',
        dentalProblem: this.sensitiveTeeth,
        content: 'Problem',
      },
    });

    return await modal.present();
  }

  async openFreeConsulation() {
    const modal = await this.modalCtrl.create({
      component: DentalProblemComponent,
      componentProps: {
        title: 'Free Consultation',
        content: 'Free',
      },
    });

    return await modal.present();
  }

  async openFreeMedicine() {
    const modal = await this.modalCtrl.create({
      component: DentalProblemComponent,
      componentProps: {
        title: 'Free Medication',
        content: 'Free',
      },
    });

    return await modal.present();
  }
}
