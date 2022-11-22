import {Component, Output, EventEmitter, OnInit, TemplateRef} from '@angular/core';
import {InputService} from "../../../utils/input.service";
import {distinctUntilChanged, filter} from "rxjs/operators";
import {TranslateService} from "@ngx-translate/core";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() selectedLanguage = new EventEmitter();
  currentLang = this.translateService.currentLang ? this.translateService.currentLang : 'en';
  modalRef?: BsModalRef;
  modalOptions: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-lg bookTicket',
  };

  constructor(public translateService: TranslateService,
              private inputService: InputService) {
    translateService.addLangs(['en', 'ar']);
    translateService.setDefaultLang('en')
  }

  ngOnInit(): void {
    this.inputService.getInput$().pipe(
      filter(x => x.type === 'currentLang'),
      distinctUntilChanged()
    ).subscribe(res => {
      this.currentLang = res.payload;
    });
  }


  translateSite(event: any) {
    this.translateService.use(event.target.value);

    this.selectedLanguage.emit(event.target.value);
  }

  navigateForLogin() {
  }
}
