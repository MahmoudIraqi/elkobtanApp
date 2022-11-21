import {Component} from '@angular/core';
import {InputService} from "../../../utils/input.service";

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent {
  currentLanguage: any;

  constructor(private inputService: InputService) {
  }

  changeLang(event: any) {
    this.currentLanguage = event;

    this.inputService.publish({type: 'currentLang', payload: this.currentLanguage})
  }
}
