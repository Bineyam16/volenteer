import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ServiceServiceService } from '../service-service.service';
import * as Survey from 'survey-angular';

@Component({
  selector: 'app-servyjson',
  templateUrl: './servyjson.component.html',
  styleUrls: ['./servyjson.component.css']
})
export class ServyjsonComponent {
  @Output() completed = new EventEmitter();
  @Input() formData: any;
  @Input() formcode: any;
  @Input() Mode :any;
  @Input() taskLevel: any;
  surveyModel: any;
  json: any;
  data: any;
  ID = 'surveyElement'
  constructor(private activatedRoute: ActivatedRoute, private service: ServiceServiceService) {
  }
  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      // this.formcode = params['formcode'];
      console.log(this.service.getFormDataa(this.formcode, this.taskLevel));
      this.service.getFormDataa(this.formcode, this.taskLevel).subscribe(data => {
        this.viewform(data);
      }, error => console.log(error));
      // console.log(this.data);
      // this.surveyModel = new Survey.Model(this.data);
      // Survey.SurveyNG.render('surveyElement', {model: this.surveyModel});
    });
  }
  viewform(data: any): any {
    console.log('ereuuuuuuu',data);
    this.surveyModel = new Survey.Model(data);
    try {
      this.surveyModel.data = JSON.parse(this.formData);
    } catch (e) {
      console.error('unable to parse json data');
    }
    // if (this.Mode) {
    //   this.surveyModel.mode = this.Mode; // 'display';
    //   Survey.SurveyNG.render(this.Id, { model: this.surveyModel });
    // } else {
      Survey.SurveyNG.render(this.ID, { model: this.surveyModel });
      console.log('survey form :: ', Survey);
      this.surveyModel.onComplete.add((result: any) => {
        console.log('result', result);
  
        this.completed.emit(result.data);
      });
    //}
  }
}
