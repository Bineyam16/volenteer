import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { FloatLabelType } from '@angular/material/form-field';
import { MenuItem, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
// import { ServiceServiceService } from '../../service-service.service';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ServiceServiceService } from '../service-service.service';
import { ServiceComponent } from '../service/service.component';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';



// import intlTelInput from 'intl-tel-input';

@Component({ 
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent {
  @Input() orgData: any;
  @Output() completed = new EventEmitter();
  maxDate = new Date();
  @ViewChild(MatStepper) stepper!: MatStepper;
  @ViewChild('phoneInput', { static: true })
  phoneInput!: ElementRef;
  panelOpenState = true;
  countryControl = new FormControl();
  countryFilterControl = new FormControl('');
  LicenceService: LicenceService ={} as LicenceService
  Volunteer: Volunteer={} as Volunteer
  countries: any[] = [];
  
  email = new FormControl('', [Validators.required, Validators.email]);
  panelOpenState2 = true;
  panelOpenState3 = true;// Define maxDate property with current date
  startDate: Date = new Date();
  items: MenuItem[] | undefined;
  public address: any;
  volunteer: any = {}; 
  firstFormGroup = this._formBuilder.group({
    firstCtrl: new FormControl(null),
  });
  colorControl = new FormControl('Nationality' as ThemePalette);
  secondFormGroup = this._formBuilder.group({
    secondCtrl: new FormControl(null),
  });
  @Output() updateClicked: EventEmitter<void> = new EventEmitter<void>();
  sectors: string[] = [
    'Healthcare',
    'Education',
    'Environment',
    'Technology',
    'Finance',
    'Agriculture',
    'Manufacturing',
    'Transportation',
    'Retail',
    'Non-Profit',
    'Energy',
    'Construction',
    'Telecommunications',
    'Tourism',
    'Hospitality',
    'Food Services',
    'Real Estate',
    'Media and Entertainment',
    'Government',
    'Defense',
    'Aerospace',
    'Automotive',
    'Chemicals',
    'Consulting',
    'Consumer Goods',
    'Insurance',
    'Legal',
    'Pharmaceuticals',
    'Public Relations',
    'Research and Development',
    'Sports',
    'Textiles',
    'Utilities',
    'Waste Management',
    'Wholesale Trade'
    
  ];
  // @Output() prevClicked: EventEmitter<void> = new EventEmitter<void>();
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  errorMessage = '';
  backgroundForm: FormGroup ;
  terms: FormGroup ;
  // orgForm: FormGroup;
  Organization: Organization={} as Organization
  orgTypes: string[] = ['Government', 'NGO','PLC'];
  countriess: string[] = ['Ethiopia', 'Kenya', 'Uganda', 'Tanzania', 'Somalia'];

  selectedAddress: string | undefined;
  image: string | undefined;
  regions = ['Amhara', 'Tigray', 'Gambela', 'Harar', 'Oromia', 'Sidama', 'Afar'];
  zones = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4'];
  cities = ['Addis Ababa', 'Sheger', 'Dire Dawa'];
  subcities = ['Subcity 1', 'Subcity 2', 'Subcity 3'];
  userName: string | undefined;
  isUser: boolean | undefined;
  custid: any;
  documentupload: string | undefined;
  contry:any
  showDialog: boolean = false;
  isEdit: boolean=false;
  isOrganization: boolean=true;
  isSubmitted: boolean=false;
  OrganizationRegSer: any;
  customQualification: string = '';
  AppCode = "00000000-0000-0000-0000-000000000000";
  DocID: any;
  todoID: any;
  AppNo: any;
  disableForm: boolean = true
  taskID: any;
  selectedCountry: { name: string, flagUrl: string } |null = null;
  ServiceId: any;
  isApproved: boolean=true;
  licenceService: any;
  licenceData: any;
  SDP_ID: any;
  Service_ID: any;
  Licence_Service_ID: any;
  validated: boolean = false;
  tskID: any;
  loading: boolean = false;
  AppN: any;
  PriveLicence: any;
  AppNoList: any;
  PriveAppNoList: any;
  filteredCountries: any;
falsetab: boolean= false
  surveyModel: any
  //orgData: any;
  TaskN: any;
  ifAppNo: boolean = false;
  response: any;
  application: any;
  todo: any;
  ID = '1'
  global_country: any;
  global_countrys: any;
  countryfl: any
  contryyy: any;
  contryfilter: any;
  role: any;
  minDate: Date = new Date();
  selectedIndex: any;
  language: any;
  amharic: boolean | undefined;
  VolunteershipLists: any;
  notvalid: boolean = false;
  constructor(private _formBuilder: FormBuilder,private http: HttpClient,private fb: FormBuilder
    ,   public service: ServiceServiceService, private _toast: MessageService,private router: Router, public ServiceComponent: ServiceComponent
  ) {
    


    
    this.backgroundForm = new FormGroup({
      id: new FormControl(null),
      customer_id: new FormControl(null),
      name: new FormControl(null),
      organization_type: new FormControl(null),
      sector: new FormControl(null),
      contact_person: new FormControl(null),
      email: new FormControl(null),
      phone_number: new FormControl(null),
      country: new FormControl(null),
      address: new FormControl(null),
      region: new FormControl(null),
      zone: new FormControl(null),
      woreda: new FormControl(null),
      kebele: new FormControl(null),
      employee_size: new FormControl(null),
      branch: new FormControl(null),
      term_and_condition: new FormControl(null),
      owners_name: new FormControl(null),
      owner_phone_no: new FormControl(null),
      owner_email: new FormControl(null),
      website: new FormControl(null),
      social_media: new FormControl(null),
      is_approved: new FormControl(null),
      about:new FormControl(null),
      registration_date: new FormControl(null),
      vision: new FormControl(null),
      mission: new FormControl(null)
      
    });
    this.terms= new FormGroup({
      agreeTerms: new FormControl(null)
    })
  
  }

  isFormGroupValid(formGroup: FormGroup): boolean {
    return formGroup.valid;
  
  }
  ngOnInit() {
    console.log(this.orgData, 'orgData');
  
    this.fetchCountries();
    console.log("language", environment.Lang);
    if (environment.Lang === "am-et" || environment.Lang === "am-ET") {
      this.language = "amharic";
      this.amharic = true
    } else {
      this.language = "english";
      this.amharic = false
    }

    // this.service.getOrganizationbyid(this.service.CustomerID).subscribe((response: any) => {
    //   // Handle the response inside the block
    //   if (response.length > 0){
    //     this.isEdit =true
    //     this.backgroundForm.patchValue({
    //       id: response.id,
    //    customer_id: response.procOrganization_Details[0].customer_id,
    //    name:response.name,
    //    organization_type: response.procOrganization_Details[0].organization_type,
    //    sector: response.procOrganization_Details[0].sector,
    //    contact_person: response.procOrganization_Details[0].contact_person,
    //    email: response.procOrganization_Details[0].email,
    //    phone_number: response.procOrganization_Details[0].phone_number,
    //    country: response.procOrganization_Details[0].country,
    //    address: response.procOrganization_Details[0].address,
    //    region: response.procOrganization_Details[0].region,
    //    zone: response.procOrganization_Details[0].zone,
    //    woreda: response.procOrganization_Details[0].woreda,
    //    kebele:response.procOrganization_Details[0].kebele,
    //    employee_size: response.procOrganization_Details[0].employee_size,
    //    branch: response.procOrganization_Details[0].branch,
    //  })
    //   } else {
    //     this.isEdit = false;
    //   }
    //   console.log(response.procOrganization_Details[0], "this.licenceData.CustomerID");
    
    //   // Assuming you want to assign the response to service.orgdata
    //   this.service.orgdata = response.procOrganization_Details[0];
    // });
    
    this.service.getOrganizationRegisterService().subscribe((services:any)=>{
      this.OrganizationRegSer=services.filter((value:any)=>value.service_code=='095785a2-0737-452d-9a3b-ecc3d1cbd988')
      console.log('services',services,this.OrganizationRegSer);
      // this.DocID=this.OrganizationRegSer[0].service_code
      this.ServiceId=this.OrganizationRegSer[0].service_code
      this.taskID=this.OrganizationRegSer[0].task_code
      this.service.task = this.taskID
     // this.router.navigate([`service/`+this.OrganizationRegSer[0].service_code]);
   
    })
    this.userName=environment._UserName
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
    this.image=environment.imageUrl10
    this.documentupload=this.image
    this.service.getcust(this.userName).subscribe((value:any)=>{
      console.log('this.Volunteer', this.Volunteer);
      
      this.Volunteer=value.procCustomers[0]
      if(this.service.isreview ==false){
      this.service.getOrganizationById(this.Volunteer.customer_ID).subscribe((res:any)=>{
       // console.log('res.procOrganization_Details[0].is_approved',res.procOrganization_Details[0].is_approved);
        
          if(res.procOrganization_Details.length==0){
            this.backgroundForm.patchValue({
              id:this.Volunteer.customer_ID
            }) 
            this.custid=this.Volunteer.customer_ID
            console.log('datwwwwa',this.Volunteer);
            if(this.Volunteer.is_Represented==null||
              this.Volunteer.is_Represented==false&&this.Volunteer.applicant_First_Name_EN==null
            ){
             
              this.Volunteer.is_Represented=true
              this.custid=this.Volunteer.customer_ID
              this.service.update_data(this.Volunteer).subscribe((updateres:any)=>{
                console.log('resssss',updateres);
                // this.showToast('success', 'success', 'edited!');
                    })
              console.log(this.custid);
              console.log('this.Volunteer.photo',this.Volunteer);
            }else if(this.Volunteer.is_Represented==false){
              this.isOrganization=false
              console.log('isOrganization',this.isOrganization);
              
            }
          }else{
            // if(res.procOrganization_Details[0].is_approved==null ){
            //   this.isApproved=false
            // }else{

              this.custid=this.Volunteer.customer_ID
            
              console.log('procOrganization_Details',res.procOrganization_Details);
              this.contryfilter = res.procOrganization_Details[0].country
             
            //   if (this.contryfilter && this.contryfilter.length == 0) {
            //      this.fetchCountries();
            // }
              console.log(this.contryfilter,'Received countries data:');
              this.Organization=res.procOrganization_Details[0]
              this.onSelectCountry(this.Organization.country)
              this.isEdit=true
              this.backgroundForm.patchValue({
                   id: res.procOrganization_Details[0].id,
                customer_id: res.procOrganization_Details[0].customer_id,
                name: res.procOrganization_Details[0].name,
                organization_type: res.procOrganization_Details[0].organization_type,
                sector: res.procOrganization_Details[0].sector,
                contact_person: res.procOrganization_Details[0].contact_person,
                email: res.procOrganization_Details[0].email,
                phone_number: res.procOrganization_Details[0].phone_number,
                country: res.procOrganization_Details[0].country,
                address: res.procOrganization_Details[0].address,
                region: res.procOrganization_Details[0].region,
                zone: res.procOrganization_Details[0].zone,
                woreda: res.procOrganization_Details[0].woreda,
                kebele: res.procOrganization_Details[0].kebele,
                employee_size: res.procOrganization_Details[0].employee_size,
                branch: res.procOrganization_Details[0].branch,
                owners_name:res.procOrganization_Details[0].owners_name,
                owner_phone_no:res.procOrganization_Details[0].owner_phone_no,
                owner_email:res.procOrganization_Details[0].owner_email,
                website:res.procOrganization_Details[0].website,
                social_media:res.procOrganization_Details[0].social_media,
                about:res.procOrganization_Details[0].social_media,
                registration_date:res.procOrganization_Details[0].registration_date,
                vision:res.procOrganization_Details[0].vision,
                mission:res.procOrganization_Details[0].mission,


              })
             
            
            
           // }
          }
        
      })}
      
      // if(this.Volunteer.photo==null){
        
      //   this.documentupload=this.image
      // }else{
      //   // this.previewdocumnet(this.Volunteer.photo)
      // }
      // if(this.Volunteer.applicant_First_Name_EN==null){
      //   this.isEdit=false
      // }else{
      //   this.isEdit=true
      // }
    })
    // this.backgroundForm = this.fb.group({
    //   id: new FormControl(null),
    //   customer_id: new FormControl(null),
    //   name: new FormControl(null),
    //   organization_type: new FormControl(null),
    //   sector: new FormControl(null),
    //   contact_person: new FormControl(null),
    //   email: new FormControl(null),
    //   phone_number: new FormControl(null),
    //   country: new FormControl(null),
    //   address: new FormControl(null),
    //   region: new FormControl(null),
    //   zone: new FormControl(null),
    //   woreda: new FormControl(null),
    //   kebele: new FormControl(null),
    //   employee_size: new FormControl(null),
    //   branch: new FormControl(null),
    // });
  
    this.getcontry()
    this.address=[{name:'Regional',value:'regional'},{name:'Non Regional',value:'non_regional'}]
   
    this.image=environment.imageUrl10
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
    if(this.orgData != null || this.orgData != undefined){
    console.log('Received data in parent component:', this.orgData);
    this.backgroundForm.patchValue({
      id: this.orgData.id,
   customer_id: this.orgData.customer_id,
   name:this.orgData.name,
   organization_type: this.orgData.organization_type,
   sector: this.orgData.sector,
   contact_person: this.orgData.contact_person,
   email: this.orgData.email,
   phone_number: this.orgData.phone_number,
   country: this.orgData.country,
   address: this.orgData.address,
   region: this.orgData.region,
   zone: this.orgData.zone,
   woreda: this.orgData.woreda,
   kebele: this.orgData.kebele,
   employee_size: this.orgData.employee_size,
   branch: this.orgData.branch,
   owners_name: this.orgData.owners_name,
   owner_phone_no: this.orgData.branch,
   owner_email: this.orgData.owner_email,
   website: this.orgData.website,
   social_media: this.orgData.social_media,
   about: this.orgData.about,
   registration_date: this.orgData.registration_date,
   vision: this.orgData.vision,
   mission: this.orgData.mission,



 })}
 this.fetchCountries();
 setTimeout(() => {
  this.fetchCountries();
  this.setDefaultRegistrationDate();
}, 2000)
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
if (this.service.isreview ) {
  this.disableFormControls();
}

this.service.getVolunteer().subscribe((response:any)=>{
  console.log(this.Volunteer.customer_ID,'this.Volunteer.customer_ID');
  
  this.VolunteershipLists=response.procVolunteerships.filter((value:any)=>value.customer_id==this.Volunteer.customer_ID)
  console.log( 'this.Volunteer.customer_ID', this.VolunteershipLists.length);
  
  if(this.VolunteershipLists.length !=0){
    this.notvalid = true
  }
})
}

private setDefaultRegistrationDate(): void {
  const regDateControl = this.backgroundForm.get('registration_date');
  if (!regDateControl?.value) {
    regDateControl?.setValue(this.formatDate(new Date()));
  }
 
}

private formatDate(date: Date): string {
  console.log(date,'datata');
  
  return date.toISOString().split('T')[0]; // Format date as 'yyyy-MM-dd'
}
  onStepClick(index: number): void {
    console.log('Step clicked:', index);
    // Perform any additional logic based on step click
  }
// In your component class
onSelectClick(event: Event): void {
  event.preventDefault(); // Prevent the default dropdown open behavior
}

onTabOpen(event: any) {
  console.log('Tab opened:', event);
  // Check for specific tab header
  if (event.index === 2) { // Assuming 'File Upload' is the third tab
    console.log('File Upload tab was opened');
    // Additional logic for File Upload tab
  }
}

onTabClose(event: any) {
  console.log('Tab closed:', event);
  // Check for specific tab header
  if (event.index === 2) { // Assuming 'File Upload' is the third tab
    console.log('File Upload tab was closed');
    // Additional logic for File Upload tab
  }
}
// onTabClick(event: any, tabHeader: string) {
//   console.log(`Tab clicked: ${tabHeader}`);
//   this.disableFormControls()
// }
onTabClick(tabName: string, index: number): void {
  console.log(`Tab clicked: ${tabName}`);
  if (this.selectedIndex === index) {
    console.log(`Tab is being closed: ${tabName}`);
    this.selectedIndex = -1; // Close the tab (assuming accordion allows collapse)
  //  this.enableFormControls()
  } else {
    console.log(`Tab is being opened: ${tabName}`);
    this.selectedIndex = index;
   // this.disableFormControls()
  }
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


moveToNextStep(): void {
  this.stepper.next();
  this.isSubmitted=true
  console.log('this.isSubmitted',this.isSubmitted);
  
}
updateSelectedCountry(countryName: string): void {
  if (countryName) {
    this.selectedCountry = this.countries.find(country => country.name === countryName) || null;
    this.countryfl = countryName;
  }
}
filterCountries(searchValue: any) {
  this.filteredCountries = this.countries.filter(country => 
    country.name.toLowerCase().includes(searchValue.toLowerCase())
  );
}
onSubmit(): void {
  if (this.customQualification.trim()) {
    const customLabel = this.customQualification.trim();
    // Set the custom qualification as the selected value
    this.backgroundForm.controls['sector'].setValue(customLabel);
  }
  this.showDialog = false;
  this.customQualification = '';
}
onCancel(): void {
  this.showDialog = false;
  this.backgroundForm.controls['sector'].setValue(null);
}
private _filterCountries(value: string): any[] {
  const filterValue = value.toLowerCase();
  return this.countries.filter(country => country.name.toLowerCase().includes(filterValue));
}
// onSelectCountry(country1: string) {
//   // this.selectedCountry = country;
//   console.log('Selected country:', this.selectedCountry,this.countries,country1);
//   this.selectedCountry = this.countries.find(country => country.name === country1);
//  this.countryfl=this.backgroundForm.controls['country'].value
//   console.log('Selected country:', this.selectedCountry,this.countries,country1);
//   // this.updateSelectedCountry(country1);
// }
onSelectCountry2(country: string) {
  // this.selectedCountry = country;
  this.selectedCountry = this.countries.find(country => country.name === country);
 
  console.log('Selected country:', country);
  this.contryyy = country
}
async exportAllAsPDF() {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const divIds = [ 'organizationalInfo', 'fileUpload'];
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
prevClicked():void{
  this.stepper.previous()
}
submit(){
  this.isSubmitted=true
}
next(){
  this.updateClicked.emit();
}
prev(){
  // this.prevClicked.emit();
  console.log('prev clicked');
  
  this.stepper.previous();
}
showToast(type: string, title: string, message: string) {
  let messageConfig = {
    severity: type,
    summary: title,
    detail: message
  }

  this._toast.add(messageConfig);
}
getcontry(){
  this.service.getcontry().subscribe((res:any) =>{
    this.contry = res.procCountrys
    console.log(res.procCountrys[0],'res');
    
  })
}
onQualificationChange(value: any): void {
  console.log(value,'value');
  
  if (value === 'Others') {
    this.showDialog = true;
  }
}
// saveFormmjson(formData: any) {
     
//   console.log("save-form", JSON.stringify(formData));
//   this.service
//     .saveFormObj(
//       this.licenceData
//         ? this.licenceData.Licence_Service_ID
//         : this.Service_ID,
//       this.licenceData
//         ? this.licenceData.Service_ID
//         : "00000000-0000-0000-0000-000000000000",
//     this.ServiceComponent.tasknew,
//       this.SDP_ID,
//       JSON.stringify(formData),
//       this.DocID || "00000000-0000-0000-0000-000000000000",
//       this.todoID || "00000000-0000-0000-0000-000000000000"
//     )
//     .subscribe(
//       (response: any) => {
//         console.log("save-from-response", response);
//       //  this.showToast('success', 'success', 'inserted!');
//         this.service.disablefins = false;
//         this.AppNo = response[0];
//         this.DocID = response[1];
//         //this.todoID = response[2];
//         this.getAll(this.AppNo);
//         this.showToast('success', 'success', 'inserted!');
//       // console.log(this.showToast('success', 'success', 'inserted!'), 'sssssssss');
        
//        // const toast = this.notificationsService.success("Success", "Saved");
//         this.validated = true;
//       },
//       (error) => {
//         console.log("save-form-error", error);
//         // const toast = this.notificationsService.error(
//         //   "Error",
//         //   "SomeThing Went Wrong"
//         // );
//       }
//     );

// }

save() {

  this.backgroundForm.patchValue({
    
    id: this.Volunteer.customer_ID,  
    term_and_condition: this.terms.value['agreeTerms'],
    is_approved: false
  });
  this.Organization = this.backgroundForm.value;
  console.log('testssss', this.Organization);
this.getAll(this.service.licenceservice)
  this.service.insertOrganization(this.Organization).subscribe(
    (res: any) => {
      this.showToast('success', 'success', 'inserted!');
      console.log(res,'ressssssss');
      this.service.getOrganizationById(res[0].id).subscribe((res:any)=>{
        this.backgroundForm.patchValue({
          id: res.procOrganization_Details[0].id,
       customer_id: res.procOrganization_Details[0].customer_id,
       name: res.procOrganization_Details[0].name,
       organization_type: res.procOrganization_Details[0].organization_type,
       sector: res.procOrganization_Details[0].sector,
       contact_person: res.procOrganization_Details[0].contact_person,
       email: res.procOrganization_Details[0].email,
       phone_number: res.procOrganization_Details[0].phone_number,
       country: res.procOrganization_Details[0].country,
       address: res.procOrganization_Details[0].address,
       region: res.procOrganization_Details[0].region,
       zone: res.procOrganization_Details[0].zone,
       woreda: res.procOrganization_Details[0].woreda,
       kebele: res.procOrganization_Details[0].kebele,
       employee_size: res.procOrganization_Details[0].employee_size,
       branch: res.procOrganization_Details[0].branch,
       owners_name:res.procOrganization_Details[0].owners_name,
       owner_phone_no:res.procOrganization_Details[0].owner_phone_no,
       owner_email:res.procOrganization_Details[0].owner_email,
       website:res.procOrganization_Details[0].website,
       social_media:res.procOrganization_Details[0].social_media,
       about:res.procOrganization_Details[0].social_media,
       registration_date:res.procOrganization_Details[0].registration_date,
       vision:res.procOrganization_Details[0].vision,
       mission:res.procOrganization_Details[0].mission,
       
     })
    
      })
      // Uncomment the lines above to include additional functionality

      // this.service.saveFormm(
      //   "00000000-0000-0000-0000-000000000000",
      //   this.ServiceId,
      //   this.taskID,
      //   "1EFB0336-26C6-4BF1-AEB8-8DA0D4F7DBBB",
      //   JSON.stringify({}),
      //   this.DocID ? this.DocID : "00000000-0000-0000-0000-000000000000",
      //   this.todoID ? this.todoID : "00000000-0000-0000-0000-000000000000"
      // ).subscribe(
      //   (response: any) => {
      //     console.log("save-from-response", response);
      //     this.AppNo = response[0];
      //     this.DocID = response[1];
      //     this.getAll(this.AppNo);
      //     console.log('this.response', response);

      //     if (this.todoID == undefined) {
      //       this.todoID = response[2];
      //     }

      //     this.showToast('success', 'success', 'saved!');
      //   },
      //   (error) => {
      //     console.log("save-form-error", error);
      //     this.showToast('error', 'error', 'Something went wrong!');
      //   }
      // );
    },
    (error) => {
      console.log("insert-organization-error", error);
      this.showToast('error', 'error', 'Error inserting organization!');
    }
  );
}

savee(){
  this.backgroundForm.patchValue({
    id:this.Volunteer.customer_ID,  
    term_and_condition:this.terms.value['agreeTerms'],
    is_approved:false
  })
  this.Organization=this.backgroundForm.value
  console.log('testssss',this.Organization);
 // this.service.insertOrganization(this.Organization).subscribe((res:any)=>{
   // this.showToast('success', 'success', 'inserted!');
    {this.service
    .saveFormm(
      "00000000-0000-0000-0000-000000000000",
      this.ServiceId,
      this.taskID,
      "1EFB0336-26C6-4BF1-AEB8-8DA0D4F7DBBB",
      JSON.stringify({}),
      this.DocID ? this.DocID : "00000000-0000-0000-0000-000000000000",
      this.todoID ? this.todoID : "00000000-0000-0000-0000-000000000000"
    )
    .subscribe(
      (response:any) => {
        console.log("save-from-response", response);
        // this.serviceService.disablefins=false;
        // this.disablefins = false;
        this.AppNo = response[0];
        this.DocID = response[1];
        this.todo = response[2];
        this.getAll(this.AppNo);
        // this.service.getAll(this.AppNo).subscribe((response: any) =>
        //   this.response = response
        // )
        console.log(this.AppNo,'this.AppNo');
        this.service.licenceservice = this.AppNo
        this.service.docid = this.DocID
        
        this.getAll(this.AppNo)
        console.log('this.response', response);
        
        if (this.todoID == undefined) {
          this.todoID = response[2];
        }

        // this.getAll();
        // this.cannxtto2 = false;
        this.showToast('success', 'success', 'saved!');
      },
      (error) => {
        console.log("save-form-error", error);
        //this.serviceService.disablefins=true;
        this.showToast('error', 'error', 'Something went wrong!');
        // const toast = this.notificationsService.error(
        //   "Error",
        //   "SomeThing Went Wrong"
        // );
      }
    );
    // this.service
    // .saveFormObj(
    //   this.licenceData
    //     ? this.licenceData.Licence_Service_ID
    //     : this.Service_ID,
    //   this.licenceData
    //     ? this.licenceData.Service_ID
    //     : "00000000-0000-0000-0000-000000000000",
    //   this.tskID,
    //   this.SDP_ID,
    //   JSON.stringify(FormData),
    //   this.DocID || "00000000-0000-0000-0000-000000000000",
    //   this.todoID || "00000000-0000-0000-0000-000000000000"
    // )
    // .subscribe(
    //   (response: any) => {
    //     console.log("save-from-response", response);

    //     this.service.disablefins = false;
    //     this.AppNo = response[0];
    //     this.DocID = response[1];
    //     //this.todoID = response[2];
    //     this.getAll(this.AppNo);
    //    // const toast = this.notificationsService.success("Success", "Saved");
    //     this.validated = true;
    //   },
    //   (error) => {
    //     console.log("save-form-error", error);
    //     // const toast = this.notificationsService.error(
    //     //   "Error",
    //     //   "SomeThing Went Wrong"
    //     // );
    //   }
    // );

  }
//)
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
        console.log("licenceData", this.licenceData.Application_No);
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
    licenceService.CustomerID = this.Volunteer.customer_ID
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

update(){
  this.backgroundForm.patchValue({
    term_and_condition:this.terms.value['agreeTerms'],
    is_approved:false
  })
  this.Organization=this.backgroundForm.value
this.service.updateOrganization(this.Organization).subscribe((res:any)=>{
  this.showToast('success', 'success', 'inserted!');
  console.log(res[0].id,'ressssssss');
  this.service.getOrganizationById(res[0].id).subscribe((res:any)=>{
    this.backgroundForm.patchValue({
      id: res.procOrganization_Details[0].id,
   customer_id: res.procOrganization_Details[0].customer_id,
   name: res.procOrganization_Details[0].name,
   organization_type: res.procOrganization_Details[0].organization_type,
   sector: res.procOrganization_Details[0].sector,
   contact_person: res.procOrganization_Details[0].contact_person,
   email: res.procOrganization_Details[0].email,
   phone_number: res.procOrganization_Details[0].phone_number,
   country: res.procOrganization_Details[0].country,
   address: res.procOrganization_Details[0].address,
   region: res.procOrganization_Details[0].region,
   zone: res.procOrganization_Details[0].zone,
   woreda: res.procOrganization_Details[0].woreda,
   kebele: res.procOrganization_Details[0].kebele,
   employee_size: res.procOrganization_Details[0].employee_size,
   branch: res.procOrganization_Details[0].branch,
   owners_name:res.procOrganization_Details[0].owners_name,
   owner_phone_no:res.procOrganization_Details[0].owner_phone_no,
   owner_email:res.procOrganization_Details[0].owner_email,
   website:res.procOrganization_Details[0].website,
   social_media:res.procOrganization_Details[0].social_media,
   about:res.procOrganization_Details[0].social_media,
   registration_date:res.procOrganization_Details[0].registration_date,
   vision:res.procOrganization_Details[0].vision,
   mission:res.procOrganization_Details[0].mission
 })

  })
  this.getAll(this.service.licenceservice)
})

  // this.serviceService.jsonArrayData = this.convertJsonToArray(formData);
  // console.log(
  //   "save-form",
  //   this.serviceService.jsonArrayData
  // );
  // this.service
  //   .saveFormm(
  //     "00000000-0000-0000-0000-000000000000",
  //     this.ServiceId,
  //     this.taskID,
  //     "1EFB0336-26C6-4BF1-AEB8-8DA0D4F7DBBB",
  //     JSON.stringify({}),
  //     this.DocID ? this.DocID : "00000000-0000-0000-0000-000000000000",
  //     this.todoID ? this.todoID : "00000000-0000-0000-0000-000000000000"
  //   )
  //   .subscribe(
  //     (response:any) => {
  //       console.log("save-from-response", response);
  //       // this.serviceService.disablefins=false;
  //       // this.disablefins = false;
  //       this.AppNo = response[0];
  //       this.DocID = response[1];
  //       if (this.todoID == undefined) {
  //         this.todoID = response[2];
  //       }

  //       // this.getAll();
  //       // this.cannxtto2 = false;
  //       this.showToast('success', 'success', 'saved!');
  //     },
  //     (error) => {
  //       console.log("save-form-error", error);
  //       //this.serviceService.disablefins=true;
  //       this.showToast('error', 'error', 'Something went wrong!');
  //       // const toast = this.notificationsService.error(
  //       //   "Error",
  //       //   "SomeThing Went Wrong"
  //       // );
  //     }
  //   );

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
// ngAfterViewInit(): void {
//   const input = this.phoneInput.nativeElement;
//   // intlTelInput(input);
// }
  submitForm() {
    // This method will handle the form submission
    console.log('Form submitted!');
  }
 
  onSelectAddress(address: string) {
    this.selectedAddress = address;
    console.log('Selected address:', address);
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  // onSubmit() {
  //   if (this.orgForm.valid) {
  //     console.log('Form Submitted', this.orgForm.value);
  //   }
  // }
 
  
  fetchCountries(): void {
    this.http.get<any[]>('https://restcountries.com/v3.1/all')
    .subscribe(
      (countries: any[]) => {
        

          this.global_country=countries
        
          // this.selectedCountry = this.global_countrys.find((country:any) => country.name === this.Organization.country);

          console.log('global_countrys',this.global_countrys,this.selectedCountry);
        

          console.log('Received countries data:', countries); // Log the entire countries array
  
          this.countries = countries.map(country => {
            // console.log('Processing country:', country); // Log the current country object for debugging
  
            let phoneCode = country.idd.root || '';
            if (country.idd.suffixes && country.idd.suffixes.length > 0) {
              if(country.idd.suffixes.length > 1){
              phoneCode += '';
              }else{
                phoneCode += country.idd.suffixes[0];
              }
            }
  
            console.log('Phone code:', phoneCode); // Log the constructed phone code
  
            return {
              name: country.name.common,
              flagUrl: country.flags.png,
              Phone_code: phoneCode
            };
          });
  
          this.countries.sort((a, b) => a.name.localeCompare(b.name));
  
          // Move Ethiopia to the beginning of the array
          const ethiopiaIndex = this.countries.findIndex(country => country.name === 'Ethiopia');
          if (ethiopiaIndex !== -1) {
            const ethiopia = this.countries.splice(ethiopiaIndex, 1)[0];
            this.countries.unshift(ethiopia);
          }
  
          console.log('Fetched countries with phone codes:', this.countries); // Log the final processed countries array
        },
        (error) => {
          console.error('Error fetching countries:', error);
        }
      );
  }
  onSelectCountry(country1: string) {
    // this.selectedCountry = country;
    console.log('Selected country:',country1);
    this.selectedCountry = this.countries.find(country => country.name === country1);
    this.filteredCountries = this.countries
  }
  
  onStepChange(event: any): void {
    console.log('Selected Index:', event.selectedIndex);
    console.log('Previously Selected Index:', event.previouslySelectedIndex);
if(event.selectedIndex ==3){
  this.disableFormControls()
}
    // Additional logic based on the selected step
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
  Close() {
    // this.router.navigate(["/task/MyTask"]);
    window.location.href = "http://redc.xokait.com.et/en-us/MY-APPLICATIONS"
  }
}
export class Volunteer{
  customer_ID?: any;
 applicant_First_Name_AM?: string ;
 applicant_First_Name_EN?: string ;
 applicant_Middle_Name_AM?: string | null;
 applicant_Middle_Name_En?: string | null;
 applicant_Last_Name_AM?: string | null;
 applicant_Last_Name_EN?: string | null;
 applicant_Mother_Name_AM?: string | null;
 applicant_Mother_Name_EN?: string | null;
 tin?: string;
 gender?: any;
 sdP_ID?: string | null;
 wereda_ID?: string | null;
 email?: string;
 mobile_No?: string;
 photo?: string;
 home_Telephone?: string;
 house_No?: string | null;
 address?: string | null;
 kebele?: string | null;
 nationality?: string;
 residence_Country?: string;
 state_Region?: string;
 city?: string | null;
 passport_ID?: string;
 is_Active?: boolean;
 is_Represented?: boolean;
 parent_Customer_ID?: string | null;
 is_them?: boolean;
 customer_Type_ID?: number;
 is_Representative?: boolean;
 customer_Status?: number;
 created_By?: string | null;
 updated_By?: string | null;
 deleted_By?: string | null;
 is_Deleted?: boolean;
 created_Date?: string | null;
 updated_Date?: string | null;
 deleted_Date?: string | null;
 maritalStatus?: any;
}
export class Organization{


  
    id?: any;
    customer_id?: any;
    name?: any;
    organization_type?: any;
    sector?: any;
    contact_person?: any;
    email?: any;
    phone_number?: any;
    country?: any;
    address?: any;
    region?: any;
    zone?: any;
    woreda?: any;
    kebele?: any;
    employee_size?: 0;
    branch?: 0
    term_and_condition?: any
    owners_name?: any
    owner_phone_no?: any
    owner_email?: any
    website?: any
    social_media?: any
    is_approved?: any
    about?: any
    vision?: any
    mission?:any
  
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