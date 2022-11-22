import {Component, TemplateRef} from '@angular/core';
import {InputService} from "../../../utils/input.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent {
  currentLanguage: any;
  currentLang = this.translateService.currentLang ? this.translateService.currentLang : 'en';
  modalRef?: BsModalRef;
  modalOptions: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-lg bookTicket',
  };

  constructor(public translateService: TranslateService,
              private modalService: BsModalService,
              private inputService: InputService) {
  }

  changeLang(event: any) {
    this.currentLanguage = event;

    this.inputService.publish({type: 'currentLang', payload: this.currentLanguage})
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalOptions);
  }

  closeModal() {
    this.modalRef?.hide()
  }

}
