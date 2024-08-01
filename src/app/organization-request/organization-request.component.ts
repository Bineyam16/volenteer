import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { LangaugeDialogComponent } from '../langauge-dialog/langauge-dialog.component';
import { FloatLabelType } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ThemePalette } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ServiceServiceService } from '../service-service.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ServiceComponent } from '../service/service.component';
import * as Survey from 'survey-angular';
//import { MatStepper } from '@angular/material/stepper';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { MatSelect } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { thaiStrings } from 'localization/thai';
//import { CdkStepper } from '@angular/cdk/stepper';
//import { ServiceComponent } from '../service/service.component';

@Component({
  selector: 'app-organization-request',
  templateUrl: './organization-request.component.html',
  styleUrls: ['./organization-request.component.css']
})
export class OrganizationRequestComponent {
  @ViewChild('otherInput') otherInputElement: any;
  @ViewChild(MatSelect)
  matSelect!: MatSelect;
  @Input() close_table:any
  @Input() orgData: any
  @Input() services:any
  @Input() custid:any
  @Output() updateClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() prevClicked: EventEmitter<void> = new EventEmitter<void>();
  //@ViewChild(MatStepper) stepper!: MatStepper;
  defaultZoomLevel: number = 0.54;
  maxDate = new Date();
  @ViewChild('phoneInput', { static: true })
  animal: string | undefined; 
  name: string | undefined; 
  Lleastning: string | undefined;
  language: any;
  amharic: boolean | undefined;
  Lwriting:string | undefined;
  LSpeaking:string | undefined;
  LicenceService: LicenceService ={} as LicenceService
  phoneInput!: ElementRef;
  AppCode = "00000000-0000-0000-0000-000000000000";
  panelOpenState = true;
  dataArray: Data[] = [];
  Request: Request={} as Request
  countries: any[] = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  panelOpenState2 = true;
  panelOpenState3 = true;// Define maxDate property with current date
  startDate: Date = new Date();
  items: MenuItem[] | undefined;
  public address: any;
  volunteer: any = {}; 
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  colorControl = new FormControl('Nationality' as ThemePalette);
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  errorMessage = '';
  selectedCountry: string | undefined;
  selectedAddress: string | undefined;
  data: any;
  selectedrow: any
  backgroundForm: FormGroup ;
  Language: any;
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  isProfession: boolean | undefined;
  isLangData: boolean | undefined;
  isEdit: boolean=false;
  doblimit: boolean=false;
  userName: any;
  costomerid: any;
  isSubmitted: boolean | undefined;
  todoID: undefined;
  AppNo: any;
  DocID: any;
  OrganizationRegSer: any;
  ServiceId: any;
  licenceData: any;
  licenceService: any;
  application: any;
  SDP_ID: any;
  Service_ID: any;
  Licence_Service_ID: any;
  loading: any;
  AppN: any;
  surveyModel:any
  PriveLicence: any;
  AppNoList: any;
  PriveAppNoList: any;
  ifAppNo: any;
  TaskN: any;
  tskID: any;
  public formData:any
  regions: any;
  alldata:any;
  isUser:boolean | undefined;
  selectedRow: any;
  showDialog: boolean = false;
  ID='1'
  ID2='survey'
  ID3='review'
  showOtherInput: any;
  customQualification: string = '';
  otherQualificationValue: any;
  role: any;
  is_approved: any;
  region: any;
  zoneData: any;
  woreda: any;
  isSpecialRegion: boolean = false;
  constructor(private _formBuilder: FormBuilder,private http: HttpClient,
    public dialog: MatDialog,
    //private stepperr: CdkStepper,
    private router: Router,
    public service: ServiceServiceService,
    private _toast: MessageService,
    public ServiceComponent: ServiceComponent,
    private cd: ChangeDetectorRef
  ) {
    this.backgroundForm = new FormGroup({
      id: new FormControl(null),
      org_id: new FormControl(null),
      service_area: new FormControl(null),
      region:new  FormControl(null),
      no_volunteer: new FormControl(0),
      no_day: new FormControl(0),
      start_date: new FormControl(null),
      end_date: new FormControl(null),
      required_skill: new FormControl(null),
      administrative_arrangment: new FormControl(null),
      qualification: new FormControl(null),
      otherQualification: new FormControl(''),
      comment: new FormControl(null),
      customer_id:new FormControl(null),
      json_form: new FormControl(null),
      zone:new FormControl(null),
      woreda: new FormControl(null),
      requiested_date: new FormControl(null),
      non_ercs_zone: new FormControl(null)

      
    });
    
    
  }
 
  ngOnInit() {
  this.service.isreview
     
    this.service.getOrganizationRegisterService().subscribe((services:any)=>{
      this.OrganizationRegSer=services.filter((value:any)=>value.
      service_code
      =='c2feb0ff-de93-400f-9ba9-7542a6e0fc8e')
      console.log('services',services,this.OrganizationRegSer);
      // this.DocID=this.OrganizationRegSer[0].service_code
      this.ServiceId=this.OrganizationRegSer[0].service_code
      console.log(this.ServiceId, 'ddddd');
      
      this.taskID=this.OrganizationRegSer[0].task_code
     // this.router.navigate([`service/`+this.ServiceId]);
     // console.log('bbbbb',this.router.navigate([`service/c2feb0ff-de93-400f-9ba9-7542a6e0fc8e`]));
      
   
    })
    this.userName=environment._UserName
    console.log(this.userName,'username');
    
    this.service.getcust(this.userName).subscribe((value:any)=>{
      this.volunteer=value.procCustomers[0]
      console.log('this.volunteer',this.volunteer.customer_ID);
      
      this.service.getOrganizationById(this.volunteer.customer_ID).subscribe((res:any)=>{
        console.log(res.procOrganization_Details[0].is_approved,'resres');
        this.is_approved = res.procOrganization_Details[0].is_approved
        
        console.log('res.procOrganization_Details[0].is_approved',this.service.CustomerID);
        if (this.service.CustomerID != null || this.service.CustomerID  != undefined){
        this.service.getRequestById(this.service.CustomerID).subscribe((res:any)=>{
          let splitValues = res.procRequests[0].administrative_arrangment.split(', ');
          let splitValue = res.procRequests[0].qualification.split(', ');
          console.log('yttyuiuy',splitValues,res);
          this.costomerid = this.service.CustomerID
          this.formData =res.procRequests[0].json_form
          console.log('res.procRequests[0].region',res.procRequests[0].region);
          if (res.procRequests[0].region == '583425da-8d65-4548-9a69-7ab8c5fe308d') {
            this.isSpecialRegion = true;}
            console.log(this.isSpecialRegion,'res.procRequests[0].region');
          this.onRegionChange(res.procRequests[0].region)
          this.onRegionChanges(res.procRequests[0].zone)
          this.onRegionChangess(res.procRequests[0].woreda)
          this.backgroundForm.patchValue({
            id: res.procRequests[0].id,
            org_id: res.procRequests[0].org_id,
            service_area: res.procRequests[0].service_area,
            no_volunteer: res.procRequests[0].no_volunteer,
            no_day: res.procRequests[0].no_day,
            start_date: res.procRequests[0].start_date,
            end_date: res.procRequests[0].end_date,
            required_skill: res.procRequests[0].required_skill,
            administrative_arrangment: splitValues,
            qualification: splitValue,
            comment: res.procRequests[0].comment,
            region: res.procRequests[0].region,
            customer_id: res.procRequests[0].customer_id,
            json_form:res.procRequests[0].json_form,
            zone:res.procRequests[0].zone,
            woreda:res.procRequests[0].woreda,
            requiested_date:res.procRequests[0].requiested_date,
            non_ercs_zone: res.procRequests[0].non_ercs_zone
          })
          this.isEdit=true
        })}
        else {
          this.costomerid = this.volunteer.customer_ID
          this.service.getRequestById(this.costomerid).subscribe((res:any)=>{
            let splitValues = res.procRequests[0].administrative_arrangment.split(', ');
            let splitValue = res.procRequests[0].qualification.split(', ');
            console.log('yttyuiuy',splitValues,res);
            this.formData =res.procRequests[0].json_form
            console.log( this.formData,' this.formData');
            console.log('res.procRequests[0].region',res.procRequests[0].region);
            if (res.procRequests[0].region == '583425da-8d65-4548-9a69-7ab8c5fe308d') {
              this.isSpecialRegion = true;}
              console.log(this.isSpecialRegion,'res.procRequests[0].region');
              
            this.onRegionChange(res.procRequests[0].region)
            this.onRegionChanges(res.procRequests[0].zone)
            this.onRegionChangess(res.procRequests[0].woreda)
            this.backgroundForm.patchValue({
              id: res.procRequests[0].id,
              org_id: res.procRequests[0].org_id,
              service_area: res.procRequests[0].service_area,
              no_volunteer: res.procRequests[0].no_volunteer,
              no_day: res.procRequests[0].no_day,
              start_date: res.procRequests[0].start_date,
              end_date: res.procRequests[0].end_date,
              required_skill: res.procRequests[0].required_skill,
              administrative_arrangment: splitValues,
              qualification: splitValue,
              comment: res.procRequests[0].comment,
              region: res.procRequests[0].region,
              customer_id: res.procRequests[0].customer_id,
              json_form: res.procRequests[0].json_form,
              zone: res.procRequests[0].zone,
              woreda: res.procRequests[0].woreda,
              requiested_date: res.procRequests[0].requiested_date,
              non_ercs_zone: res.procRequests[0].non_ercs_zone
            })
            this.isEdit=true
            
          })}

        });
      })
      console.log('userrrrrrr',this.userName);
      if(this.userName){
  
        if(this.userName==null || this.userName==undefined||this.userName=='@HttpContext.Current.User.Identity.Name'){
          this.isUser=true
        }else{
          this.isUser=false
        }
      }else{
        this.isUser=true
      }
    this.fetchCountries();
    this.address=[{name:'Regional',value:'regional'},{name:'Non Regional',value:'non_regional'}]
    console.log('yyyyyy',this.service.cusst);
    
    this.items = [
        {
            label: 'Personal',
            routerLink: 'personal'
        },
        {
            label: 'Seat',
            routerLink: 'seat'
        },
        {
            label: 'Payment',
            routerLink: 'payment'
        },
        {
            label: 'Confirmation',
            routerLink: 'confirmation'
        }
    ];
    setTimeout(() => {
      this.getallr();
    }, 2000) // 2000 milliseconds = 2 seconds
    this.service.getjsonform().subscribe((result: any)=>{
      console.log(result[0].json_form,'ressssss');
      setTimeout(() => {
        this.viewform(result[0].json_form)
        this.viewform2(result[0].json_form)
        this.viewform3(result[0].json_form)
        
       }, 3000); 
  
   
      
     })
     this.service.getUserRolee().subscribe((response: any) =>{
      console.log(response[0].RoleId, 'responseeee');
      this.role = response[0].RoleId
      if(this.role == '51f75ae2-2d81-4702-ba4f-2c46ac6d8d9d'){
        this.service.actiontab = false
        this.service.disablefins = true
      }
      else{
        this.service.actiontab = true
        this.service.disablefins = false
      }
    
    }) 
    this.getzoneworeda2()
    if (this.service.isreview ) {
      this.disableFormControls();
    }
    if (environment.lang2 === "am-et" || environment.lang2 === "am-ET") {
      this.language = "amharic";
      this.amharic = true
    } else {
      this.language = "english";
      this.amharic = false
    }
}
// moveToNextStep(): void {
//   this.stepper.next();
//   this.isSubmitted=true
//   console.log('this.isSubmitted',this.isSubmitted);
  
// }

onOthersSelected(): void {
  this.showOtherInput = true;
  this.backgroundForm.controls['qualification'].setValue('Others');
  setTimeout(() => {
    this.otherInputElement.nativeElement.focus(); // Focus the input field
  }, 0);
}
onSubmit(): void {
  if (this.customQualification.trim()) {
    const customLabel = this.customQualification.trim();
    // Set the custom qualification as the selected value
    this.backgroundForm.controls['qualification'].setValue(customLabel);
  }
  this.showDialog = false;
  this.customQualification = '';
}
onDropdownOpened(opened: boolean): void {
  if (!opened && this.showOtherInput && !this.otherQualificationValue) {
    this.showOtherInput = false;
    this.backgroundForm.controls['qualification'].setValue(null);
  }
}
getzoneworeda2() {
  this.service.getzoneworeda("a273829d-3235-443a-af74-e4ddec3db7b0").subscribe(
    (data: any) => {
      // Handle the data here
      console.log(data, "fetching data:"); 
      this.region = data.sort((a: any, b: any) => a.description.localeCompare(b.description))
    },
    (error) => {
      // Handle any errors that occur during the request
      console.error('Error fetching data:', error);
    }
  );
}
fetchZonesForRegion(regionCode: any) {
  // Assuming you have a service method to fetch zones based on region code
  this.service.getzoneworeda(regionCode).subscribe(
    (data: any) => {
      // Handle the fetched zone data here
      console.log(data, "fetching zone data:");
      this.zoneData = data.sort((a: any, b: any) => a.description.localeCompare(b.description));
    },
    (error) => {
      // Handle any errors that occur during the request
      console.error('Error fetching zone data:', error);
    }
  );}
  onRegionChanges(event: any) {
    // Get the selected region code
    const selectedRegionCode = event
    console.log('eventtt',event);
    
    this.backgroundForm.patchValue({
      zone:event
    })
    // Fetch zones based on selected region
    this.fetchZonesForRegionworeda(selectedRegionCode);
  }
  onRegionChangess(event: any) {
    // Get the selected region code
    const selectedRegionCode = event
    console.log('eventtt',event);
    
    this.backgroundForm.patchValue({
      woreda:event
    })
    // Fetch zones based on selected region
  
  }

  fetchZonesForRegionworeda(zone: any) {
    // Assuming you have a service method to fetch zones based on region code
    this.service.getzoneworeda(zone).subscribe(
      (data:any) => {
        // Handle the fetched zone data here
        console.log(data, "fetching zone data:");
        this.woreda = data.sort((a: any, b: any) => a.description.localeCompare(b.description));
      },
      (error) => {
        // Handle any errors that occur during the request
        console.error('Error fetching zone data:', error);
      }
    );}

onRegionChange(event: any) {
  // Get the selected region code
  const selectedRegionCode = event
  console.log('selectedRegionCode',selectedRegionCode);
  if(selectedRegionCode == '583425da-8d65-4548-9a69-7ab8c5fe308d'){
    this.isSpecialRegion= true
  }
  else{
    this.isSpecialRegion = false
  }
  // Fetch zones based on selected region
  this.fetchZonesForRegion(selectedRegionCode);
}
onBlurOtherInput(): void {
  if (this.otherQualificationValue) {
    this.backgroundForm.controls['qualification'].setValue(this.otherQualificationValue);
    this.showOtherInput = false;
  } else {
    this.showOtherInput = false;
    this.backgroundForm.controls['qualification'].setValue(null);
  }
  this.matSelect.close();
}

onEnterOtherInput(): void {
  this.backgroundForm.controls['qualification'].setValue(this.otherQualificationValue);
  this.showOtherInput = false;
  this.matSelect.close();
}

onEscapeOtherInput(): void {
  this.showOtherInput = false;
  this.backgroundForm.controls['qualification'].setValue(null);
  this.matSelect.close();
}
onQualificationChange(value: any): void {
  if (value === 'Others') {
    this.showDialog = true;
  }
}

onCancel(): void {
  this.showDialog = false;
  this.backgroundForm.controls['qualification'].setValue(null);
}
viewform(data: any): void {
  console.log('Initial data:', data);
  this.surveyModel = new Survey.Model(data);

  try {
    console.log(this.formData,'this.formData');
    
    this.surveyModel.data = JSON.parse(this.formData);
    console.log('Parsed form data:', this.surveyModel.data);
  } catch (e) {
    console.error('Unable to parse JSON data:', e);
  }

  Survey.SurveyNG.render(this.ID, { model: this.surveyModel });
  console.log('Survey form rendered:', Survey);

  this.surveyModel.onComplete.add((result: any) => {
    console.log('Survey result:', result.data);
    this.formData = result.data;

    try {
      this.surveyModel = new Survey.Model(data);
      this.surveyModel.data = this.formData;
      Survey.SurveyNG.render(this.ID, { model: this.surveyModel });
      console.log('Survey form re-rendered:', Survey);
      console.log('Re-parsed form data:', this.surveyModel.data);
      this.formData = JSON.stringify(this.formData);
     this.update2()
      this.showToast('success', 'Success', 'Data saved successfully!');
      this.cd.detectChanges();
    } catch (e) {
      console.error('Unable to re-parse JSON data:', e);
    }
  });
}
viewform2(data: any): void {
  console.log('Initial data:', data);
  this.surveyModel = new Survey.Model(data);

  try {
    console.log(this.formData, 'this.formData');
    this.surveyModel.data = JSON.parse(this.formData);
    console.log('Parsed form data:', this.surveyModel.data);
  } catch (e) {
    console.error('Unable to parse JSON data:', e);
  }

  // Set the survey mode to 'display' to make it read-only
  this.surveyModel.mode = 'display';

  Survey.SurveyNG.render(this.ID2, { model: this.surveyModel });
  console.log('Survey form rendered:', Survey);
}
viewform3(data: any): void {
  console.log('Initial data:', data);
  this.surveyModel = new Survey.Model(data);

  try {
    console.log(this.formData, 'this.formData');
    this.surveyModel.data = JSON.parse(this.formData);
    console.log('Parsed form data:', this.surveyModel.data);
  } catch (e) {
    console.error('Unable to parse JSON data:', e);
  }

  // Set the survey mode to 'display' to make it read-only
  this.surveyModel.mode = 'display';

  Survey.SurveyNG.render(this.ID3, { model: this.surveyModel });
  console.log('Survey form rendered:', Survey);
}
async exportAllAsPDF() {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const divIds = [ 'Request', 'surveyy','fileUpload'];
  const a4Width = 210; // A4 width in mm
  const a4Height = 297; // A4 height in mm

  for (let i = 0; i < divIds.length; i++) {
    const content = document.getElementById(divIds[i]);

    if (content) {
      const canvas = await html2canvas(content, { scale: 1 }); // Increase scale for better quality
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = a4Width;
      const imgHeight = (canvas.height * a4Width) / canvas.width;

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
      console.error(`Content not found for divId: ${divIds[i]}`);
    }
  }

  pdf.save('Forms.pdf');
}

getzoneworeda() {
  this.service.getzoneworeda("a273829d-3235-443a-af74-e4ddec3db7b0").subscribe(
    (data) => {
      // Handle the data here
      console.log(data, "fetching data:"); 
      this.regions = data
    },
    (error) => {
      // Handle any errors that occur during the request
      console.error('Error fetching data:', error);
    }
  );
}
Add(){
  this.isEdit =false
  this.backgroundForm.patchValue({
    id: '',
    org_id:'',
    service_area: '',
    no_volunteer: '',
    no_day: '',
    start_date: '',
    end_date: '',
    required_skill: '',
    administrative_arrangment: '',
    qualification: '',
    comment: '',
    region: '',
    customer_id: '',
    json_form:'',
    zone:'',
    woreda:'',
    requiested_date:'',
    non_ercs_zone:''
  })
}
Close() {
  // this.router.navigate(["/task/MyTask"]);
  window.location.href = environment.appliction;;
}
getallr(){
  this.service.getRequestById(this.costomerid).subscribe((response: any)=>{
    this.alldata = response.procRequests
    console.log(this.alldata,"alldata");
    
  })
}
onRowUnselect(): void {
  // Implement your row unselect functionality here
  console.log('Row unselected');
}
onRowSelect(event: any) {
  console.log('Selected Row:', event.data);
  this.isEdit = true
  this.selectedrow = event.data
  this.onRegionChange(this.selectedRow.region)
  this.onRegionChanges(this.selectedrow.zone)
  console.log(this.selectedrow.zone),'this.selectedrow.zone';
  
  this.onRegionChangess(this.selectedrow.woreda)
  let splitValues =   this.selectedrow.administrative_arrangment.split(', ');
  let splitValue = this.selectedrow.qualification.split(', ');
  this.backgroundForm.patchValue({
    id: this.selectedrow.id,
    org_id: this.selectedrow.org_id,
    service_area: this.selectedrow.service_area,
    no_volunteer: this.selectedrow.no_volunteer,
    no_day: this.selectedrow.no_day,
    start_date: this.selectedrow.start_date,
    end_date: this.selectedrow.end_date,
    required_skill: this.selectedrow.required_skill,
    administrative_arrangment: splitValues,
    qualification: splitValue,
    comment: this.selectedrow.comment,
    region: this.selectedrow.region,
    customer_id: this.selectedrow.customer_id,
    json_form: this.selectedrow.json_form,
    zone: this.selectedrow.zone,
    woreda: this.selectedrow.woreda,
    requiested_date:this.selectedRow.requiested_date,
    non_ercs_zone:this.selectedRow.non_ercs_zone
    
  })
  this.isEdit = true
}
onStepChange(event: any): void {
  console.log('Selected Index:', event.selectedIndex);
  console.log('Previously Selected Index:', event.previouslySelectedIndex);
if(event.selectedIndex ==3){
this.disableFormControls()
}
  // Additional logic based on the selected step
}
next(){
  this.updateClicked.emit();
}
prev(){
  this.prevClicked.emit();
}
showToast(type: string, title: string, message: string) {
  let messageConfig = {
    severity: type,
    summary: title,
    detail: message
  }

  this._toast.add(messageConfig);
}
savee(){
  console.log('this.service.licenceservice',this.service.licenceservice);
  this.getAll(this.service.licenceservice)
  
}
saveed() {


  setTimeout(() => {
   this.save()
   
  }, 1000); 
  this.ServiceComponent.savee()
  this.isEdit =true
  console.log('this.isEdit',this.isEdit);
  
}
generateGUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
save(){
  const guid = this.generateGUID();
  console.log(this.formData, 'this.formData');
  this.isEdit =true
  this.backgroundForm.patchValue({
    id: guid,
    customer_id:this.costomerid,
    org_id:this.custid,
    json_form:this.formData
  })
    
  this.Request=this.backgroundForm.value
  //this.getAll(this.service.licenceservice)
 // console.log('this.backgroundForm',concatenatedValues);
 this.Request=this.backgroundForm.value
 let selectedValuess = this.backgroundForm.controls['administrative_arrangment'].value;
 let selected = this.backgroundForm.controls['qualification'].value
 let concatenatedValuess = selectedValuess.join(', ');
 let concat = selected.join(', ')
 this.Request.administrative_arrangment=concatenatedValuess
 this.Request.qualification =concat
  this.service.insertRequest(this.Request).subscribe((value:any)=>{
    this.showToast('success', 'success', 'inserted!');
    console.log(value, 'value');
    
    
    this.getallr()
    console.log('this.service.licenceservice',this.service.licenceservice);
    this.getAll(this.service.licenceservice)
    this.service.getRequestById(this.costomerid).subscribe((res:any)=>{
      let splitValues = res.procRequests[0].administrative_arrangment.split(', ');
      let splitValue = res.procRequests[0].qualification.split(', ');
      console.log('yttyuiuy',splitValues,res);
     // this.costomerid = this.service.CustomerID
      this.formData =res.procRequests[0].json_form
      this.onRegionChange(res.procRequests[0].region)
      this.onRegionChanges(res.procRequests[0].zone)
      this.onRegionChangess(res.procRequests[0].woreda)
      this.backgroundForm.patchValue({
        id: res.procRequests[0].id,
        org_id: res.procRequests[0].org_id,
        service_area: res.procRequests[0].service_area,
        no_volunteer: res.procRequests[0].no_volunteer,
        no_day: res.procRequests[0].no_day,
        start_date: res.procRequests[0].start_date,
        end_date: res.procRequests[0].end_date,
        required_skill: res.procRequests[0].required_skill,
        administrative_arrangment: splitValues,
        qualification: splitValue,
        comment: res.procRequests[0].comment,
        region: res.procRequests[0].region,
        customer_id: res.procRequests[0].customer_id,
        json_form:res.procRequests[0].json_form,
        zone:res.procRequests[0].zone,
        woreda:res.procRequests[0].woreda,
        requiested_date:res.procRequests[0].requiested_date,
        non_ercs_zone: res.procRequests[0].non_ercs_zone
      })
     
  })
 
  })
  // save(){
  //   this.backgroundForm.patchValue({
  //     id:this.costomerid,
  //     org_id:this.custid
  //   })
  
  //   // this.service.getRequestById(this.custid).subscribe((res:any)=>{
  //   //   let splitValues = res.procRequests[0].administrative_arrangment.split(', ');
  //   //   console.log('yttyuiuy',splitValues,res);
      
  //   //   this.backgroundForm.patchValue({
  //   //     id: res.procRequests[0].id,
  //   //     org_id: res.procRequests[0].org_id,
  //   //     service_area: res.procRequests[0].service_area,
  //   //     no_volunteer: res.procRequests[0].no_volunteer,
  //   //     no_day: res.procRequests[0].no_day,
  //   //     start_date: res.procRequests[0].start_date,
  //   //     end_date: res.procRequests[0].end_date,
  //   //     required_skill: res.procRequests[0].required_skill,
  //   //     administrative_arrangment: splitValues,
  //   //     qualification: res.procRequests[0].qualification,
  //   //     comment: res.procRequests[0].comment,
  //   //     region: res.procRequests[0].region
  //   //   })
  //   //   this.isEdit=true
  //   // })
  //   this.Request=this.backgroundForm.value
  //   let selectedValues = this.backgroundForm.controls['administrative_arrangment'].value;
  //   let concatenatedValues = selectedValues.join(', ');
  
  //   this.Request.administrative_arrangment=concatenatedValues
    
    
  //   this.getAll(this.service.licenceservice)
  //   console.log('this.backgroundForm',concatenatedValues);
  //   this.service.insertRequest(this.Request).subscribe((value:any)=>{
  //     this.showToast('success', 'success', 'inserted!');
     
     
   
  //   })
  // }

  this.Request=this.backgroundForm.value
  let selectedValues = this.backgroundForm.controls['administrative_arrangment'].value;
  
  let concatenatedValues = selectedValues.join(', ');

  this.Request.administrative_arrangment=concatenatedValues
  
  

}
  taskID(arg0: string, service: ServiceServiceService, taskID: any, arg3: string, arg4: string, arg5: any, arg6: string) {
    throw new Error('Method not implemented.');
  }
  enableFormControls(){
    console.log('letsgoooooooo');
    
    Object.keys(this.backgroundForm.controls).forEach(controlName => {
      this.backgroundForm.controls[controlName].enable();
    });
  }
  disableFormControls(): void {
    Object.keys(this.backgroundForm.controls).forEach(controlName => {
      const control = this.backgroundForm.controls[controlName];
      control.disable();
  
  
    });
  }
update()
{  this.backgroundForm.patchValue({
 // id:this.costomerid,
  org_id:this.custid,
  json_form:this.formData
  
})

  this.Request=this.backgroundForm.value
  let selectedValues = this.backgroundForm.controls['administrative_arrangment'].value;
  let selected = this.backgroundForm.controls['qualification'].value
  let concatenatedValues = selectedValues.join(', ');
  let concat = selected.join(', ')
  this.Request.administrative_arrangment=concatenatedValues
  this.Request.qualification =concat
 if( this.Request.end_date< this.Request.start_date){
  this.doblimit=true
  
  console.log('start date is greater');
}else{
  this.doblimit=false
this.service.updateRequest(this.Request).subscribe((res:any)=>{
  this.showToast('success', 'success', 'inserted!');
 
  this.service.getRequestById(this.costomerid).subscribe((res:any)=>{
    console.log("🚀 ~ OrganizationRequestComponent ~ this.service.updateRequest ~ res.procRequests[0].json_form:",res.procRequests[0].json_form)
    //this.viewform2(res.procRequests[0].json_form)
    this.getAll(this.service.licenceservice)
    let splitValues = res.procRequests[0].administrative_arrangment.split(', ');
    let splitValue = res.procRequests[0].qualification.split(', ');
    console.log('yttyuiuy',splitValues,res);
   // this.costomerid = this.service.CustomerID
   // this.formData =res.procRequests[0].json_form
   this.onRegionChange(res.procRequests[0].region)
   this.onRegionChanges(res.procRequests[0].zone)
   this.onRegionChangess(res.procRequests[0].woreda)
    this.backgroundForm.patchValue({
      id: res.procRequests[0].id,
      org_id: res.procRequests[0].org_id,
      service_area: res.procRequests[0].service_area,
      no_volunteer: res.procRequests[0].no_volunteer,
      no_day: res.procRequests[0].no_day,
      start_date: res.procRequests[0].start_date,
      end_date: res.procRequests[0].end_date,
      required_skill: res.procRequests[0].required_skill,
      administrative_arrangment: splitValues,
      qualification: splitValue,
      comment: res.procRequests[0].comment,
      region: res.procRequests[0].region,
      customer_id: res.procRequests[0].customer_id,
      json_form:res.procRequests[0].json_form,
      zone:res.procRequests[0].zone,
      woreda:res.procRequests[0].woreda,
      requiested_date:res.procRequests[0].requiested_date,
      non_ercs_zone:res.procRequests[0].non_ercs_zone
    })})
   
  console.log(res[0].id,'res[0].id');
  
 
    
    
    
  this.getallr()
})
 


this.ServiceComponent.savee()
this.getAll(this.service.licenceservice)
}
}
update2()
{  this.backgroundForm.patchValue({
 // id:this.costomerid,
  org_id:this.custid,
  json_form:this.formData
  
})

  this.Request=this.backgroundForm.value
  let selectedValues = this.backgroundForm.controls['administrative_arrangment'].value;
  let selected = this.backgroundForm.controls['qualification'].value
  let concat = selected.join(', ')

  let concatenatedValues = selectedValues.join(', ');
  this.Request.administrative_arrangment=concatenatedValues
  this.Request.qualification =concat
 if( this.Request.end_date< this.Request.start_date){
  this.doblimit=true
  
  console.log('start date is greater');
}else{
  this.doblimit=false
this.service.updateRequest(this.Request).subscribe((res:any)=>{
  this.showToast('success', 'success', 'inserted!');
 
  this.service.getRequestById(this.costomerid).subscribe((res:any)=>{
    console.log("🚀 ~ OrganizationRequestComponent ~ this.service.updateRequest ~ res.procRequests[0].json_form:",res.procRequests[0].json_form)
    //this.viewform2(res.procRequests[0].json_form)
    let splitValues = res.procRequests[0].administrative_arrangment.split(', ');
    let splitValue = res.procRequests[0].qualification.split(', ');
    console.log('yttyuiuy',splitValues,res);
   // this.costomerid = this.service.CustomerID
    // this.formData =res.procRequests[0].json_form
    console.log('this.formData',this.formData);
    this.service.getjsonform().subscribe((result: any)=>{
      console.log(result[0].json_form,'ressssss');
      setTimeout(() => {
        this.viewform2(result[0].json_form)
        
       }, 3000); 
  
   
      
     })
  //  this.viewform2(this.formData)
    this.backgroundForm.patchValue({
      id: res.procRequests[0].id,
      org_id: res.procRequests[0].org_id,
      service_area: res.procRequests[0].service_area,
      no_volunteer: res.procRequests[0].no_volunteer,
      no_day: res.procRequests[0].no_day,
      start_date: res.procRequests[0].start_date,
      end_date: res.procRequests[0].end_date,
      required_skill: res.procRequests[0].required_skill,
      administrative_arrangment: splitValues,
      qualification: splitValue,
      comment: res.procRequests[0].comment,
      region: res.procRequests[0].region,
      customer_id: res.procRequests[0].customer_id,
      json_form:this.formData,
      zone: res.procRequests[0].zone,
      woreda: res.procRequests[0].woreda,
      requiested_date:res.procRequests[0].requiested_date,
      non_ercs_zone:res.procRequests[0].non_ercs_zone
    })})
   
  console.log(res[0].id,'res[0].id');
  
 
    
    
    
  this.getallr()
})
 


//this.ServiceComponent.savee()
this.getAll(this.service.licenceservice)
}
}
public getAll(AppNo:any) {
  // this.serviceService.getLicenseService(AppNo).subscribe((response:any)=>{
  //   console.log('sssssssss',response.procLicense_Services);
  //   this.licenceData=response.procLicense_Services[0]
    
  // })
  // this.serviceService
  //   .GetApplicationNumberByUserInfo(AppNo)
  //   .subscribe((licenceService) => {
  //     this.custmerInformation = licenceService[0];
  //     console.log(
  //       "🚀 ~ .subscribe ~ custmerInformation:",
  //       this.custmerInformation
  //     );
  //   });
  // this.getuserName(this.AppNo);
  // console.log("appppppp", AppNo);
  this.service.getAll(AppNo).subscribe(
    (licenceService:any) => {
      this.licenceService = licenceService;
      console.log("Licence Serviceeeeeeee", this.licenceService.list[0]);
      //this.licenceService.list[0]
     this.application = this.licenceService.list[0].Application_No
      if (this.licenceService.list.length > 0) {
        this.licenceData = this.licenceService.list[0];
        console.log(this.licenceData.CustomerID, 'this.licenceData');
        
        this.service.reqorg = this.licenceService.list[0].Created_By
        this.service.licenceData = this.licenceData;
        this.SDP_ID = this.licenceData.SDP_ID;
        this.service.currentsdpid = this.SDP_ID;
        this.Service_ID = this.licenceData.Service_ID;
        this.service.Service_ID = this.licenceData.Service_ID;
        this.service.Service_ID = this.SDP_ID;
        this.Licence_Service_ID = this.licenceData.Licence_Service_ID;
        this.AppCode = this.licenceData.Licence_Service_ID; //
        this.AppNo = this.licenceData.Application_No; //
        this.service.appnoForRecord = this.licenceData.Application_No;
        this.service.LicenceserviceID = this.Licence_Service_ID;
        console.log("licenceData111111", this.costomerid);
        //this.LicenceService.Licence_Service_ID 
       // this.service.updateLicence(this.LicenceService)
       let licenceService: LicenceService = new LicenceService();
    
    // Assign values from this.licenceData to licenceService
    licenceService.Letter_Mail = this.licenceData.Letter_Mail;
    licenceService.Payments = this.licenceData.Payments;
    licenceService.Property_Measurement = this.licenceData.Property_Measurement;
    licenceService.Woreda_Lookup = this.licenceData.Woreda_Lookup;
    licenceService.Licence_Service_ID = this.licenceData.Licence_Service_ID;
    licenceService.Application_No = this.licenceData.Application_No;
    licenceService.Service_ID = this.licenceData.Service_ID;
    licenceService.Service_Name = this.licenceData.Service_Name;
    licenceService.Property_ID = this.licenceData.Property_ID;
    licenceService.Certificate_Code = this.licenceData.Certificate_Code;
    licenceService.Parcel_ID = this.licenceData.Parcel_ID;
    licenceService.Plot_Merge_1 = this.licenceData.Plot_Merge_1;
    licenceService.Plot_Merge_2 = this.licenceData.Plot_Merge_2;
    licenceService.Plot_Merge_3 = this.licenceData.Plot_Merge_3;
    licenceService.Plot_Merge_4 = this.licenceData.Plot_Merge_4;
    licenceService.SDP_ID = this.licenceData.SDP_ID;
    licenceService.Wereda_ID = this.licenceData.Wereda_ID;
    licenceService.Email = this.licenceData.Email;
    licenceService.Cust_Phone_No = this.licenceData.Cust_Phone_No;
    licenceService.Cust_Photo = this.licenceData.Cust_Photo;
    licenceService.Applicant_First_Name_AM = this.licenceData.Applicant_First_Name_AM;
    licenceService.Applicant_First_Name_EN = this.licenceData.Applicant_First_Name_EN;
    licenceService.Applicant_Middle_Name_AM = this.licenceData.Applicant_Middle_Name_AM;
    licenceService.Applicant_Middle_Name_En = this.licenceData.Applicant_Middle_Name_En;
    licenceService.Applicant_Last_Name_AM = this.licenceData.Applicant_Last_Name_AM;
    licenceService.Applicant_Last_Name_EN = this.licenceData.Applicant_Last_Name_EN;
    licenceService.Applicant_Mother_Name_AM = this.licenceData.Applicant_Mother_Name_AM;
    licenceService.Applicant_Mother_Name_EN = this.licenceData.Applicant_Mother_Name_EN;
    licenceService.Application_Date = this.licenceData.Application_Date;
    licenceService.Cust_TIN_No = this.licenceData.Cust_TIN_No;
    licenceService.Is_Revalidated = this.licenceData.Is_Revalidated;
    licenceService.Is_Paid = this.licenceData.Is_Paid;
    licenceService.Created_By = this.licenceData.Created_By;
    licenceService.Updated_By = this.licenceData.Updated_By;
    licenceService.Deleted_By = this.licenceData.Deleted_By;
    licenceService.Is_Deleted = this.licenceData.Is_Deleted;
    licenceService.Created_Date = this.licenceData.Created_Date;
    licenceService.Updated_Date = this.licenceData.Updated_Date;
    licenceService.Deleted_Date = this.licenceData.Deleted_Date;
    licenceService.CustomerID = this.costomerid
    licenceService.Number_Of_Copy_Doc = this.licenceData.Number_Of_Copy_Doc;

    // Use the populated licenceService instance in the update method
    this.service.updateLicence(licenceService).subscribe(res=> 
      console.log("ressssss", res)
      
    );
        if (this.licenceData.Certificate_Code > 0) {
          this.getPriveysLicence(this.licenceData.Certificate_Code);
        } else {
          this.getPriveysLicence(this.licenceData.Application_No);
        }
      }

      // if (this.ID == 2) {
      //   this.disablefins = false;
      //   this.getPlotManagement();
      // } else if (this.ID == 3) {
      //   this.disablefins = false;
      //   this.getPlotManagement();
      // } else if (this.ID == 4) {
      //   this.disablefins = false;
      //   this.getDeed();
      // }
      // console.log('Licence data2', this.licenceData);
      // this.taskType = this.licenceData.TaskType;
      this.loading = false;
    },
    (error:any) => {
      console.log(error);
      // this.se.emit(this.eventTypes.JSONFOUND);
    }
  );
}
getPriveysLicence(Certificate_Code: any) {
  console.log("🚀 ~ ServiceComponent ~ getPriveysLicence ~ Certificate_Code:", Certificate_Code)
  this.AppN = null;
  this.service.getLicenseService(Certificate_Code).subscribe(
    (PriveLicence: any) => {
      this.PriveLicence = PriveLicence;
      console.log("🚀 ~ ServiceComponent ~ getPriveysLicence ~ PriveLicence:", PriveLicence)
      this.PriveLicence = Object.assign([], this.PriveLicence.procLicense_Services);
      console.log("this.PriveLicence", this.PriveLicence);
      this.AppNoList = [];
      for (let i = 0; i < this.PriveLicence.length; i++) {
        this.AppNoList[i] = {};
        this.AppNoList[i].application_No = this.PriveLicence[
          i
        ].application_No;
      }

      this.PriveAppNoList = Object.assign([], this.AppNo);
       console.log('this.AppNoList', this.AppNoList);
      // console.log('PriveLicence', PriveLicence);
      this.ifAppNo = true;

      // if (this.PriveAppNoList.length > 0) {
      //   this.getJsonData(this.PriveAppNoList[0]['Application_No']);
      // }
      // else {
      //   this.serviceEvent.emit(this.eventTypes.JSONFOUND);
      // }

      this.AppN = this.AppNo;
      //this.getAppData(this.AppN);

      this.TaskN = this.tskID;
    },
    (error: any) => {
      console.log("error");
     // this.serviceEvent.emit(this.eventTypes.JSONFOUND);
    }
  );
}
updateErrorMessage() {
  if (this.email.hasError('required')) {
    this.errorMessage = 'You must enter a value';
  } else if (this.email.hasError('email')) {
    this.errorMessage = 'Not a valid email';
  } else {
    this.errorMessage = '';
  }
}
ngAfterViewInit(): void {
  const input = this.phoneInput.nativeElement;
  // intlTelInput(input);
}
ngOnChanges(){
  console.log('yyyyyy',this.costomerid);
  
  this.backgroundForm.patchValue({
    id:this.costomerid,
    org_id:this.custid
  })
  this.service.getRequestById(this.custid).subscribe((res:any)=>{
    let splitValues = res.procRequests[0].administrative_arrangment.split(', ');
    let splitValue = res.procRequests[0].qualification.split(', ');
    console.log('yttyuiuy',splitValues,res);
    
    this.backgroundForm.patchValue({
      id: res.procRequests[0].id,
      org_id: res.procRequests[0].org_id,
      service_area: res.procRequests[0].service_area,
      no_volunteer: res.procRequests[0].no_volunteer,
      no_day: res.procRequests[0].no_day,
      start_date: res.procRequests[0].start_date,
      end_date: res.procRequests[0].end_date,
      required_skill: res.procRequests[0].required_skill,
      administrative_arrangment: splitValues,
      qualification:splitValue,
      comment: res.procRequests[0].comment,
      region: res.procRequests[0].region,
      customer_id:res.procRequests[0].customer_id,
      json_form: res.procRequests[0].json_form,
      zone: res.procRequests[0].zone,
      woreda: res.procRequests[0].woreda,
      requiested_date:res.procRequests[0].requiested_date,
      non_ercs_zone:res.procRequests[0].non_ercs_zone,
    })
    this.isEdit=true
  })
}
Submit(ruleid:any) {
  // this.Close();
  this.isSubmitted=true
  // this.disablefins = true;
  this.service
    .Submit(this.service.licenceservice, this.service.docid, this.service.todo, ruleid)
    .subscribe(
      (message) => {
        if (message) {
          this.showToast('success', 'success', 'inserted!');
          this.Close()
        } else {
          this.showToast('error', 'error', message);
        }
        console.info("submit :: ", message);
      },
      (error) => {
        if (error.status == "400") {
          this.showToast('error', 'error',error.error.InnerException.Errors[0].message);
          
        } else {
          this.showToast('error', 'error', 'SomeThing Went Wrong');
         
        }
        console.error("submit error :: ", error);
      }
    );
}
  submitForm() {
    // This method will handle the form submission
    console.log('Form submitted!');
  }
  onSelectCountry(country: string) {
    this.selectedCountry = country;
    console.log('Selected country:', country);
  }
  onSelectAddress(address: string) {
    this.selectedAddress = address;
    console.log('Selected address:', address);
  }
  onSelectProfession(prof: string) {
    if(prof=='professional'){

      this.isProfession = true;
    }
    else{
      this.isProfession = false
    }
    console.log('Selected address:', prof);
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  
  openDialog(): void { 
    let dialogRef = this.dialog.open(LangaugeDialogComponent, { 
      width: '700px', 
      data: { Language: this.Language, animal: this.animal,Lleastning:this.Lleastning } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      // this.animal = result; 
      this.data=result
      this.isLangData=true
      this.dataArray.push(result);
console.log('testttttt',result);

    }); 
  } 
  onSelectLanguage(langauge: string) {
    this.Language = langauge;
    console.log('Selected address:', langauge);
  }
  fetchCountries(): void {
    console.log('addreaaa',this.address,this.items);
    this.http.get<any[]>('https://restcountries.com/v3.1/all')
      .subscribe(
        (countries: any[]) => {
          this.countries = countries.map(country => ({
            name: country.name.common,
            flagUrl: country.flags.svg // or country.flags.png
          }));
  
          this.countries.sort((a, b) => a.name.localeCompare(b.name));

        // Find Ethiopia and move it to the beginning of the array
        const ethiopiaIndex = this.countries.findIndex(country => country.name === 'Ethiopia');
        if (ethiopiaIndex !== -1) {
          const ethiopia = this.countries.splice(ethiopiaIndex, 1)[0];
          this.countries.unshift(ethiopia);
        }
          console.log('this.countries', this.countries);
        },
        (error) => {
          console.error('Error fetching countries:', error);
        }
      );
  }
}
export interface Data {
  Language:string
  Lleastning: string;
  LSpeaking: string;
  Lwriting: string;
}
export class Request{


  
  id?:any;
  org_id?:any;
  service_area?:any;
  no_volunteer?: any;
  no_day?: any
  start_date?:any;
  end_date?:any;
  required_skill?:any;
  administrative_arrangment?:any;
  qualification?:any;
  comment?:any;
  region?:any;
  customer_id?: any;
  json_form?: any;
  zone?: any;
  woreda?: any;
  requiested_date?: any
  non_ercs_zone?: any
  
}
export class LicenceService{
  Letter_Mail: any;
  Payments: any;
  Property_Measurement: any;
  Woreda_Lookup: any;
  Licence_Service_ID: any;
  Application_No: any;
  Service_ID: any;
  Service_Name: any;
  Property_ID: any;
  Certificate_Code: any;
  Parcel_ID: any;
  Plot_Merge_1: any;
  Plot_Merge_2: any;
  Plot_Merge_3: any;
  Plot_Merge_4: any;
  SDP_ID: any;
  Wereda_ID: any;
  Email: any;
  Cust_Phone_No: any;
  Cust_Photo: any;
  Applicant_First_Name_AM: any;
  Applicant_First_Name_EN: any;
  Applicant_Middle_Name_AM: any;
  Applicant_Middle_Name_En: any;
  Applicant_Last_Name_AM: any;
  Applicant_Last_Name_EN: any;
  Applicant_Mother_Name_AM: any;
  Applicant_Mother_Name_EN: any;
  Application_Date: any;
  Cust_TIN_No: any;
  Is_Revalidated: any;
  Is_Paid: any;
  Created_By: any;
  Updated_By: any;
  Deleted_By: any;
  Is_Deleted: any;
  Created_Date: any;
  Updated_Date: any;
  Deleted_Date: any;
  CustomerID: any;
  Number_Of_Copy_Doc: any;
 }
function generateGuid() {
return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});
}