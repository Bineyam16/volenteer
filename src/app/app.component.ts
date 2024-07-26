import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RedCross';
  langs = [{ key: 'en', lang: 'english' }, { key: 'am', lang: 'amharic' }];
  LangID = 'en';
  Lang: string | undefined;

  constructor(private translate: TranslateService) {
    // Type assertion to ensure Lang is treated as a string
    this.Lang = window.lang as string;

    console.log('lang', this.Lang); 

    if (this.Lang === 'am-ET' || this.Lang === 'am-et') {
      translate.setDefaultLang('am');
    } else {
      translate.setDefaultLang('en');
    }
  }

}
