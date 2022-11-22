import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TabsetComponent} from "ngx-bootstrap/tabs";
import {distinctUntilChanged, filter} from "rxjs/operators";
import {TranslateService} from "@ngx-translate/core";
import {InputService} from "../../../utils/input.service";

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.scss']
})
export class BookTicketsComponent implements OnInit {
  bookTicketForm!: FormGroup;
  allSelectOptions: any = {
    times: [
      {
        en: '10 am',
        ar: '10 ص'
      },
      {
        en: '12 pm',
        ar: '12 ظ'
      },
      {
        en: '06 pm',
        ar: '6 م'
      },
      {
        en: '10 pm',
        ar: '10 م'
      },
      {
        en: '03 am',
        ar: '3 ص'
      },
    ],
    allBusPoints: [
      {
        en: 'Damanhour',
        ar: 'دمنهور'
      },
      {
        en: 'Kafr El-Sheikh',
        ar: 'كفر الشيخ'
      },
      {
        en: 'Kafr El-Zayat',
        ar: 'كفر الزيات'
      },
      {
        en: 'Tanta',
        ar: 'طنطا'
      },
      {
        en: 'Berket El-Sabaa',
        ar: 'بركة السبع'
      },
      {
        en: 'Quesna',
        ar: 'قويسنا'
      },
      {
        en: 'Banha',
        ar: 'بنها'
      },
      {
        en: 'Cairo',
        ar: 'القاهرة'
      },
      {
        en: 'El-NafaQ',
        ar: 'النفق'
      },
      {
        en: 'Ras Sedr',
        ar: 'راس سدر'
      },
      {
        en: 'Abu Zenima',
        ar: 'أبو زنيمة'
      },
      {
        en: 'Abu Redis',
        ar: 'أبو رديس'
      },
      {
        en: 'Tor Sinai',
        ar: 'طور سيناء'
      },
      {
        en: 'Sharm El-Shaikh',
        ar: 'شرم الشيخ'
      },
      {
        en: 'Dahab',
        ar: 'دهب'
      }
    ],
    returnBusPoints: [
      {
        en: 'El-NafaQ',
        ar: 'النفق'
      },
      {
        en: 'Ras Sedr',
        ar: 'راس سدر'
      },
      {
        en: 'Abu Zenima',
        ar: 'أبو زنيمة'
      },
      {
        en: 'Abu Redis',
        ar: 'أبو رديس'
      },
      {
        en: 'Tor Sinai',
        ar: 'طور سيناء'
      },
      {
        en: 'Sharm El-Shaikh',
        ar: 'شرم الشيخ'
      },
      {
        en: 'Dahab',
        ar: 'دهب'
      }
    ],
    departureBusPoints: [
      {
        en: 'Damanhour',
        ar: 'دمنهور'
      },
      {
        en: 'Kafr El-Sheikh',
        ar: 'كفر الشيخ'
      },
      {
        en: 'Kafr El-Zayat',
        ar: 'كفر الزيات'
      },
      {
        en: 'Tanta',
        ar: 'طنطا'
      },
      {
        en: 'Berket El-Sabaa',
        ar: 'بركة السبع'
      },
      {
        en: 'Quesna',
        ar: 'قويسنا'
      },
      {
        en: 'Banha',
        ar: 'بنها'
      },
      {
        en: 'Cairo',
        ar: 'القاهرة'
      }
    ],
  };
  activeTabIndex: any = 'oneWay';
  @ViewChild('formTabs', {static: false}) formTabs!: TabsetComponent;
  @Output() closeModal = new EventEmitter();
  currentLang = this.translateService.currentLang ? this.translateService.currentLang : 'en';

  constructor(public translateService: TranslateService,
              private inputService: InputService,
              private fb: FormBuilder) {
    this.getFormAsStarting();
  }

  ngOnInit(): void {
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'currentLang'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.currentLang = res.payload;
    });
  }

  nextToNextTab() {
    this.formTabs.tabs.filter(x => x.active).map(y => this.activeTabIndex = this.formTabs.tabs.indexOf(y));
    this.activeTabIndex + 1 <= this.formTabs.tabs.length - 1 ? this.formTabs.tabs[this.activeTabIndex + 1].active = true : null;
  }

  backToNextTab() {
    let activeTabIndexValue !: any;
    this.formTabs.tabs.filter(x => x.active).map(y => activeTabIndexValue = this.formTabs.tabs.indexOf(y));
    activeTabIndexValue >= 0 ? this.formTabs.tabs[activeTabIndexValue - 1].active = true : null;
  }

  selectedTab(event: any) {
    this.activeTabIndex = event.id;

    this.getFormAsStarting();
  }

  getFormAsStarting() {
    this.bookTicketForm = this.fb.group({
      oneWay: this.fb.group({
        customerName: this.fb.control('', this.activeTabIndex === 'oneWay' ? Validators.required : Validators.nullValidator),
        customerPhoneNumber: this.fb.control('', this.activeTabIndex === 'oneWay' ? Validators.required : Validators.nullValidator),
        time: this.fb.control('', this.activeTabIndex === 'oneWay' ? Validators.required : Validators.nullValidator),
        date: this.fb.control('', this.activeTabIndex === 'oneWay' ? Validators.required : Validators.nullValidator),
        ridingPoint: this.fb.control('', this.activeTabIndex === 'oneWay' ? Validators.required : Validators.nullValidator),
        arrivingPoint: this.fb.control('', this.activeTabIndex === 'oneWay' ? Validators.required : Validators.nullValidator),
        passenger: this.fb.control(0, this.activeTabIndex === 'oneWay' ? Validators.required : Validators.nullValidator),
      }),
      roundWay: this.fb.group({
        customerName: this.fb.control('', this.activeTabIndex === 'roundWay' ? Validators.required : Validators.nullValidator),
        customerPhoneNumber: this.fb.control('', this.activeTabIndex === 'roundWay' ? Validators.required : Validators.nullValidator),
        time: this.fb.control('', this.activeTabIndex === 'roundWay' ? Validators.required : Validators.nullValidator),
        returnTime: this.fb.control('', this.activeTabIndex === 'roundWay' ? Validators.required : Validators.nullValidator),
        date: this.fb.control('', this.activeTabIndex === 'roundWay' ? Validators.required : Validators.nullValidator),
        returnDate: this.fb.control('', this.activeTabIndex === 'roundWay' ? Validators.required : Validators.nullValidator),
        ridingPoint: this.fb.control('', this.activeTabIndex === 'roundWay' ? Validators.required : Validators.nullValidator),
        arrivingPoint: this.fb.control('', this.activeTabIndex === 'roundWay' ? Validators.required : Validators.nullValidator),
        passenger: this.fb.control(0, this.activeTabIndex === 'roundWay' ? Validators.required : Validators.nullValidator),
      })
    });
  }

  onSubmit() {
    console.log('bookTicketForm', this.bookTicketForm)
  }

  closeModalFunction() {
    this.closeModal.emit(true)
  }

}
