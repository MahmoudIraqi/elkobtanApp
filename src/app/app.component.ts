import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'elkobtan-bus';

  constructor(public translateService: TranslateService) {

  }

  switchLang(event: any) {
    this.translateService.use(event.target.value);
  }
}
