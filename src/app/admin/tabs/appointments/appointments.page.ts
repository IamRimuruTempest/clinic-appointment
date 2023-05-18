import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/interfaces/appointment.model';
import { DataService } from 'src/app/services/data.service';
import { Platform } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { HttpClient } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit, OnDestroy {
  pendingAppointments: Appointment[] = [];
  sub: Subscription;
  constructor(
    private dataService: DataService,
    private platform: Platform,
    private http: HttpClient,
    private fileOpener: FileOpener
  ) {
    this.sub = this.dataService
      .getPendingAppointments()
      .subscribe(
        (data) => ((this.pendingAppointments = data), console.log(data))
      );
  }

  ngOnDestroy(): void {
    console.log('destroyed');
    this.sub.unsubscribe();
  }

  ngOnInit() {}

  createPdf(appointment: Appointment) {
    const docDefinition = {
      watermark: {
        text: 'CSU Clinic',
        color: 'blue',
        opacity: 0.2,
        bold: true,
      },
      content: [
        {
          text: 'Cagayan State University',
          style: 'header',
        },
        `This is to certify that ${appointment.fullName} is healthy and does not have any severe condition after an assessment with the clinic.\n\n`,
        {
          text: 'Subheader 1 - using subheader style',
          style: 'subheader',
        },
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
        {
          text: 'It is possible to apply multiple styles, by passing an array. This paragraph uses two styles: quote and small. When multiple styles are provided, they are evaluated in the specified order which is important in case they define the same properties',
          style: ['quote', 'small'],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        quote: {
          italics: true,
        },
        small: {
          fontSize: 8,
        },
      },
    };
    const pdfObj = pdfMake.createPdf(docDefinition);
    this.downloadPdf(pdfObj);
  }

  downloadPdf(pdfObj: any) {
    if (Capacitor.getPlatform() === 'web') {
      pdfObj.download();
    } else {
      pdfObj.getBase64(async (data: any) => {
        try {
          let path = `pdf/cert_${Date.now()}.pdf`;
          const result = await Filesystem.writeFile({
            path,
            data,
            directory: Directory.Documents,
            recursive: true,
          });
          this.fileOpener.open(result.uri, 'application/pdf');
        } catch (ex: any) {
          console.log(ex);
        }
      });
    }
  }
}
