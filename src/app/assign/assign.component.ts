import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceServiceService } from '../service-service.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Logger } from 'utils/utils';
import { MatDatepickerInputEvent, DateRange  } from '@angular/material/datepicker';


@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {
  @Output() completed = new EventEmitter();
  @Input() orgData: any;
  @Input() disable: boolean | undefined;
  regions: any;
  userName: any;
  volunteer: any;
  allvol: any;
  selectedVolunteers: any;
  visible: boolean = false;
  selectedVolunteer: any;
  lang: any;
  visiblee: boolean =false;
  VolunteershipLists: any;
  servicedialog: boolean =false;
  mimeType: any;
  fileupload: any;
  documentupload: any;
  image: any;
  serviceAreas: any;
  services: any;
  displayDialog: boolean= false
;
  backgroundForm: FormGroup;
  isProfession: boolean = false;
  Is_assigned: boolean =false
  showtable: boolean | undefined;
  volunteers: any | undefined;
  res: any;
  assignedlist: any
  volid: any;
  volunteerss: any;
  Volunteership: Volunteership={} as Volunteership
  filteredVolunteers: any[] = [];

  filterFirstName: string = '';
  filterMiddleName: string = '';
  filterLastName: string = '';
  filterGender: string = '';
  filterRegion: string = '';
  filterPhone: string = '';
  filterprofession: string ='';
  filterskill:string ='';
  filterservice: string = ''
  filterflag_status:string =''
  numberToSelect: number = 0;
  rows: number = 3;
  startDate: any
  endDate: any
  updatedCustdata: any[] = [];
  constructor(private fb: FormBuilder, public service: ServiceServiceService,private _toast: MessageService,private sanitizer: DomSanitizer) {
    this.backgroundForm = this.fb.group({
      education_status: [''],
      gender: [''],
      state_region: [''],
      profession: ['']
    });
  }

  ngOnInit(): void {
    this.getassined()
    this. getzoneworeda()
    this.getallvol()
    this.getVolunteership()

    this.service.get_look_up_for('SERVICE AREAS').subscribe((res:any)=>{
      
      this.serviceAreas=res
      console.log('this.serviceAreas', this.serviceAreas);
      
   
    })
  
    //this.getservice()
    this.service.disablefins = false
    this.service.getRequestById(this.service.reqorgg).subscribe((res: any)=>{
      console.log(res,'restststs');
      
    })
    this.getvolentirdata()
  }
  showDialog(volunteer: any) {
    this.selectedVolunteer = volunteer;
    console.log('this.selectedVolunteer',this.selectedVolunteer.userId);
    if(this.selectedVolunteer.photo != null){
    this.previewdocumnet(this.selectedVolunteer.photo)
  }
  
  else{
    this.image=environment.imageUrl10
    this.documentupload=this.image
  }
   this.service.getlangbycustid(this.selectedVolunteer.userId).subscribe((values: any) =>{
    this.lang =values.procLanguage_skills
    console.log(this.lang,'hellooooooo');
    
   }
     
  )
  this.service.getVolunteer().subscribe((response:any)=>{
    this.VolunteershipLists=response.procVolunteerships.filter((value:any)=>value.customer_id==this.selectedVolunteer.userId)
    console.log('VolunteershipLists', this.VolunteershipLists);
    //this.getservice(this.VolunteershipLists.service_Area)
    this.service.get_look_up_for('SERVICE AREAS').subscribe((res:any)=>{
      
      this.serviceAreas=res
      console.log('this.serviceAreas',this.serviceAreas);
      this.services = this.serviceAreas.filter((value: any) => value.lkdetail_code == this.VolunteershipLists[0].service_Area)
      console.log(this.services,'this.services');
      this.getservice(this.VolunteershipLists[0].service_Area)
      
      
    })
  })
    this.visible = true;
  }

  showdialogflag(volunteer: any) {
    this.selectedVolunteer = volunteer;
    console.log('this.selectedVolunteer',this.selectedVolunteer);
    
    this.displayDialog = true;
  }
  getvolentirdata(){
    this.service.getvolentirdata().subscribe((res: any)=>{
      console.log(res,'responssss');
      
    })
  }
setStatus(status: string) {
  if (this.selectedVolunteer) {
    this.service.flag = status;

    // If status is 'Ok' (1), set is_assigned to 0 and assigned_to to null
    if (this.service.flag  == '1') {
      console.log('herrrrrrreee');
      
      this.service.reqorgg = null
      this.service.is_assigned = 0
      this.assign(this.selectedVolunteer);
    }
    if (this.service.flag  == '2') {
      console.log('herrrrrrreee');
      
      this.service.reqorgg = null
      this.service.is_assigned = 0
      this.assign(this.selectedVolunteer);
    } else {
      this.assign(this.selectedVolunteer);
    }
  }
  this.displayDialog = false;
  this.getassined();
  this.applyFilter();
  this.getallvol();
}

  showDialog2(volunteer: any) {
    this.selectedVolunteer = volunteer;
    console.log('this.selectedVolunteer',this.selectedVolunteer.userId);
    if(this.selectedVolunteer.photo != null){
    this.previewdocumnet(this.selectedVolunteer.photo)
  }
  
  else{
    this.image=environment.imageUrl10
    this.documentupload=this.image
  }
   this.service.getlangbycustid(this.selectedVolunteer.userId).subscribe((values: any) =>{
    this.lang =values.procLanguage_skills
    console.log(this.lang,'hellooooooo');
    
   }
     
  )
  this.service.getVolunteer().subscribe((response:any)=>{
    this.VolunteershipLists=response.procVolunteerships.filter((value:any)=>value.customer_id==this.selectedVolunteer.userId)
    console.log('VolunteershipLists', this.VolunteershipLists);
    //this.getservice(this.VolunteershipLists.service_Area)
    this.service.get_look_up_for('SERVICE AREAS').subscribe((res:any)=>{
      
      this.serviceAreas=res
      console.log('this.serviceAreas',this.serviceAreas);
      this.services = this.serviceAreas.filter((value: any) => value.lkdetail_code == this.VolunteershipLists[0].service_Area)
      console.log(this.services,'this.services');
      this.getservice(this.VolunteershipLists[0].service_Area)
      
      
    })
  })
    this.visible = true;
  }
  getservice(service: any){
    this.service.get_look_up_for('SERVICE AREAS').subscribe((res:any)=>{
      
      this.serviceAreas=res
      console.log('this.serviceAreas',this.serviceAreas);
      this.services = this.serviceAreas.filter((value: any) => value.lkdetail_code == service)
      console.log(this.services,'this.services');
      
      
    })
  }
  previewdocumnet(file:any){

    try {
     
     let fileData = JSON.parse(window.atob(file));
      let { type, data } = fileData;
      this.mimeType=type
      this.fileupload= "data:" + type + ";base64, " + data;
      
     
      this.documentupload= this.sanitizer.bypassSecurityTrustResourceUrl(
               this.fileupload
             );
      console.log(this.documentupload);
  }
           catch (e) {
             console.error(e);
           }
  }
  getallvol() {
    this.service.getallvol().subscribe((value: any) => {
      this.allvol = value.filter((volunteer: any) => 
        volunteer.is_assigned === false || volunteer.is_assigned == null
      );
      setTimeout(() => {
        const voluntershipArray = this.VolunteershipLists;
        const custdataArray = this.allvol;

        // Map through custdata and add englishDescriptions
        this.updatedCustdata = custdataArray.map((cust: any) => {
          const matchingVoluntership = voluntershipArray.filter((vol: any) => vol.customer_id === cust.userId);
          const service_Area = matchingVoluntership.map((vol: any) => vol.service_Area);
          const englishDescriptions = matchingVoluntership.map((vol: any) => vol.english_description);
      
          
          return {
            ...cust,
            service_Area: service_Area.length ? service_Area : null,
            englishDescriptions: englishDescriptions.length ? englishDescriptions : null
          };
        });
        this.applyFilter();
      }, 2000);
    });
  }
  onServiceAreaChange(event: any): void {
    // Trigger filtering by service area and date range when the service area changes
    this.filterByServiceArea();
  }
  filterByServiceArea() {
    if (!this.allvol) {
      return; // Exit if data is not fetched yet
    }
  
    // Get the selected service area
    const selectedServiceArea = this.Volunteership.assigned_service;
  
    // Perform filtering based on selected service area
    const voluntershipArray = this.VolunteershipLists;
    const custdataArray = this.allvol;
  
    this.updatedCustdata = custdataArray.map((cust: any) => {
      const matchingVoluntership = voluntershipArray.filter((vol: any) => vol.customer_id === cust.userId);
      const service_Area = matchingVoluntership.map((vol: any) => vol.service_Area);
      const englishDescriptions = matchingVoluntership.map((vol: any) => vol.english_description);
  
      // Check if there's a selected service area
      if (selectedServiceArea) {
        // Check if the selected service area matches any of the englishDescriptions
        const isMatched = englishDescriptions.some((desc: any) => desc === selectedServiceArea);
  
        // Return only if the selected service area matches any of the englishDescriptions
        if (isMatched) {
          return {
            ...cust,
            service_Area: service_Area.length ? service_Area : null,
            englishDescriptions: englishDescriptions.length ? englishDescriptions : null
          };
        } else {
          return null; // Filter out if not matched
        }
      } else {
        // No service area selected, return all custdata
        return {
          ...cust,
          service_Area: service_Area.length ? service_Area : null,
          englishDescriptions: englishDescriptions.length ? englishDescriptions : null
        };
      }
    }).filter((cust: any) => cust !== null); 
    this.applyFilter();
    console.log(this.Volunteership.assigned_service,'servicecececece');
    if (this.Volunteership.assigned_service != undefined || this.Volunteership.assigned_service != null){
      this.service.assigned_service = this.Volunteership.assigned_service
    }
    else{
      this.service.assigned_service = null
    }
  }
  getVolunteership(){
    // this.service.getVolunteer()
    this.service.getView_Volunteership()
    .subscribe((response:any)=>{
      this.VolunteershipLists=response
      console.log('VolunteershipLists',this.VolunteershipLists);
      
    })
  }
  
  applyFilterByButton(startValue: string, endValue: string): void {
    this.startDate = startValue ? new Date(startValue) : null;
    this.endDate = endValue ? new Date(endValue) : null;

    if (this.startDate && this.endDate) {
      this.filteredVolunteers = this.updatedCustdata.filter((volunteer: any) => {
        const fromDate = volunteer.from_date ? new Date(volunteer.from_date) : null;
        const toDate = volunteer.to_date ? new Date(volunteer.to_date) : null;
        console.log('Service Area:', this.Volunteership.assigned_service);
        // Check if from_date or to_date is within the specified range
        return (fromDate && fromDate >= this.startDate && fromDate <= this.endDate) ||
               (toDate && toDate >= this.startDate && toDate <= this.endDate);
      });
    } else {
      // If no date range is provided, show all volunteers
      this.filteredVolunteers = this.updatedCustdata;
    }

    console.log('Filtered by date range', this.filteredVolunteers);
  }
  onDateRangeChange(event: any): void {
    const range: DateRange<Date> = event.target?.value;
    if (range) {
      this.startDate = range.start;
      this.endDate = range.end;
     
      
      this.applyFilter();
    }
  }
  openserviceDialog(){
    this.servicedialog =true
  }
  sortAssignedListByServiceArea() {
    this.assignedlist.sort((a: { assigned_service: any; }, b: { assigned_service: any; }) => {
      if (a.assigned_service < b.assigned_service) {
        return -1;
      } else if (a.assigned_service > b.assigned_service) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  
  openLanguageDialog() {
    this.visiblee = true;
  }
  applyFilter() {
    console.log('Applying filter with the following criteria:');
    console.log('First Name:', this.filterFirstName);
    console.log('Middle Name:', this.filterMiddleName);
    console.log('Last Name:', this.filterLastName);
    console.log('Gender:', this.filterGender);
    console.log('Region:', this.filterRegion);
    console.log('Phone:', this.filterPhone);
    console.log('Profession:', this.filterprofession);
    console.log('Skill:', this.filterskill);
    console.log('Flag Status:', this.filterflag_status);
    console.log('Service:', this.filterservice);
  
    this.filteredVolunteers = this.updatedCustdata.filter((volunteer: {
      applicant_First_Name_EN: string;
      applicant_Middle_Name_En: string;
      applicant_Last_Name_EN: string;
      gender: string;
      state_Region: string;
      userName: string;
      profession: string;
      skill: string;
      flag_status: string;
      englishDescriptions: string[];
    }) => {
      console.log('Filtering volunteer:', volunteer);
  
      return (!this.filterFirstName || (volunteer.applicant_First_Name_EN && volunteer.applicant_First_Name_EN.toLowerCase().includes(this.filterFirstName.toLowerCase()))) &&
        (!this.filterMiddleName || (volunteer.applicant_Middle_Name_En && volunteer.applicant_Middle_Name_En.toLowerCase().includes(this.filterMiddleName.toLowerCase()))) &&
        (!this.filterLastName || (volunteer.applicant_Last_Name_EN && volunteer.applicant_Last_Name_EN.toLowerCase().includes(this.filterLastName.toLowerCase()))) &&
        (!this.filterGender || (volunteer.gender && volunteer.gender.toLowerCase().includes(this.filterGender.toLowerCase()))) &&
        (!this.filterRegion || (volunteer.state_Region && volunteer.state_Region.toLowerCase().includes(this.filterRegion.toLowerCase()))) &&
        (!this.filterPhone || (volunteer.userName && volunteer.userName.toLowerCase().includes(this.filterPhone.toLowerCase()))) &&
        (!this.filterprofession || (volunteer.profession && volunteer.profession.toLowerCase().includes(this.filterprofession.toLowerCase()))) &&
        (!this.filterskill || (volunteer.skill && volunteer.skill.toLowerCase().includes(this.filterskill.toLowerCase()))) &&
        (!this.filterflag_status || (volunteer.flag_status && volunteer.flag_status.toLowerCase().includes(this.filterflag_status.toLowerCase()))) &&
        (!this.filterservice || (volunteer.englishDescriptions && volunteer.englishDescriptions.some(description => description.toLowerCase().includes(this.filterservice.toLowerCase()))));
    });
  
    console.log('Filtered Volunteers:', this.filteredVolunteers);
  }
  
  
  onSelectProfession(prof: string): void {
    this.isProfession = (prof === 'professional');
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
  getassined() {
    setTimeout(() => {
      this.userName = environment._UserName;
      console.log(this.service.reqorgg, 'username');
  
      if (this.service.checkassign === true) {
        this.service.getcust(this.userName).subscribe({
          next: (value: any) => {
            this.volunteer = value.procCustomers[0];
            this.service.getvolistass(true, this.volunteer.customer_ID).subscribe({
              next: (response: any) => {
                console.log('Response:', response);
                this.assignedlist = response;
              },
              error: (err: any) => {
                if (err.status === 404) {
                  console.error('No data found. Response 404:', err);
                  this.assignedlist = [];
                } else {
                  console.error('Error occurred:', err);
                }
              }
            });
          },
          error: (err: any) => {
            console.error('Error fetching customer:', err);
            this.assignedlist = [];
          }
        });
      } else {
        this.service.getvolistass(true, this.service.reqorgg).subscribe({
          next: (response: any) => {
            console.log('Response:', response);
            this.assignedlist = response;
          },
          error: (err: any) => {
            if (err.status === 404) {
              console.error('No data found. Response 404:', err);
              this.assignedlist = [];
            } else {
              console.error('Error occurred:', err);
            }
          }
        });
      }
    }, 3000);
  }
  

  selectTopNVolunteers(n: number) {
    this.selectedVolunteers = this.filteredVolunteers.slice(0, n);
    console.log('Selected Top N Volunteers:', this.selectedVolunteers);
  }

  submitForm(): void {
    this.showtable = true
    const formValues = this.backgroundForm.value;
    const {  gender, state_region, profession } = formValues;

    // Use these values in your API call
    this.service.getvolist(null, profession, gender, state_region).subscribe(response => {
      console.log(response,'response');
      this.volunteers = response;
    });
  }
  showToast(type: string, title: string, message: string) {
    let messageConfig = {
      severity: type,
      summary: title,
      detail: message
    }
    this._toast.add(messageConfig);}
    

  edit(event: any): void {
    // Implement your edit functionality here
    console.log('Row selected', event.data);
  }

  onRowUnselect(): void {
    // Implement your row unselect functionality here
    console.log('Row unselected');
  }
  assign(volunteer: any): void {
    // Handle single assign action
    this.volid = volunteer.userId;
    console.log('this.service.reqorgg',this.volid);
    
    this.service.getVolunteer().subscribe(response => {
      this.res = response;
      const filteredData = this.res.procVolunteerships.filter((item: any) => item.customer_id === this.volid);
      this.volunteerss = filteredData;
      this.service.updateVolunteer({
        id: this.volunteerss[0].id,
        customer_id: this.volunteerss[0].customer_id,
        service_Area: this.volunteerss[0].service_Area,
        avaialability_in_day: this.volunteerss[0].avaialability_in_day,
        avialability_in_our: this.volunteerss[0].avialability_in_our,
        reason: this.volunteerss[0].reason,
        comment: this.volunteerss[0].comment,
        is_assigned: this.service.is_assigned,
        assined_to: this.service.reqorgg,
        flag_status: this.service.flag,
        assigned_service: this.service.assigned_service

      }).subscribe((res: any) => {
        this.showToast('success', 'success', 'Assigned!');
        this.completed.emit();
        this.getassined()
        this.applyFilter()
        this.getallvol()
      });
    });
  }
  assign2(volunteer: any, assignedService: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Fetch volunteer details based on userId
      this.service.getVolunteer().subscribe((response: any) => {
        const filteredData = response.procVolunteerships.filter((item: any) => item.customer_id === volunteer.userId);
        
        // Check if filteredData has at least one entry before updating
        if (filteredData.length > 0) {
          const volunteerData = filteredData[0];
          this.service.updateVolunteer({
            id: volunteerData.id,
            customer_id: volunteerData.customer_id,
            service_Area: volunteerData.service_Area,
            avaialability_in_day: volunteerData.avaialability_in_day,
            avialability_in_our: volunteerData.avialability_in_our,
            reason: volunteerData.reason,
            comment: volunteerData.comment,
            is_assigned: this.service.is_assigned,
            assined_to: this.service.reqorgg,
            flag_status: this.service.flag,
            assigned_service: assignedService // Use assignedService from parameter
          }).subscribe(
            (res: any) => {
              this.showToast('success', 'Success', 'Assigned!');
              resolve(); // Resolve promise after update completes
            },
            (error: any) => {
              console.error('Error updating volunteer:', error);
              reject(error); // Reject promise if update fails
            }
          );
        } else {
          resolve(); // Resolve promise if no volunteer to update
        }
      }, (error: any) => {
        console.error('Error fetching volunteer:', error);
        reject(error); // Reject promise if fetch fails
      });
    });
  }
  
  // async assignSelected(): Promise<void> {
  //   // Handle the assign action for selected volunteers
  //   if (!this.Volunteership.assigned_service) {
  //     this.showToast('warn', 'Warning', 'Select Service Area before assigning');
  //     return;
  //   }
  
  //   if (!this.selectedVolunteers || this.selectedVolunteers.length === 0) {
  //     this.showToast('warn', 'Warning', 'No volunteers selected');
  //     return;
  //   }
  
  //   for (const volunteer of this.selectedVolunteers) {
  //     try {
  //       await this.assign2(volunteer, this.Volunteership.assigned_service); // Pass assigned_service as parameter
  //     } catch (error) {
  //       console.error('Error in assignSelected:', error);
  //       this.showToast('error', 'Error', 'An error occurred while assigning volunteers');
  //       return; // Exit if there's an error
  //     }
  //   }
  
  //   // Refresh state
  //   await this.getassined();
  //   await this.applyFilter();
  //   await this.getallvol();
  //   this.selectedVolunteers.forEach((volunteer: { isSelected: boolean; }) => volunteer.isSelected = false);
  //   this.showToast('success', 'Success', 'All selected volunteers assigned successfully');
  // }
  
  async assignSelected(): Promise<void> {
    // Handle the assign action for selected volunteers
    if (!this.Volunteership.assigned_service) {
      this.showToast('warn', 'Warning', 'Select Service Area before assigning');
      return;
    }
  
    if (!this.selectedVolunteers || this.selectedVolunteers.length === 0) {
      this.showToast('warn', 'Warning', 'No volunteers selected');
      return;
    }
  
    const assignedService = this.Volunteership.assigned_service; // Capture the current service area
  
    console.log(`Starting assignment of ${this.selectedVolunteers.length} volunteers to service ${assignedService}`); // Debug log
  
    for (let i = 0; i < this.selectedVolunteers.length; i++) {
      const volunteer = this.selectedVolunteers[i];
      try {
        await this.assign2(volunteer, assignedService); // Pass current assigned_service of each volunteer
      } catch (error) {
        console.error('Error in assignSelected:', error);
        this.showToast('error', 'Error', 'An error occurred while assigning volunteers');
        return; // Exit if there's an error
      } finally {
        volunteer.isSelected = false; // Reset isSelected state for the current volunteer
      }
    }
  
    // Refresh state
    await this.getassined();
    await this.applyFilter();
    await this.getallvol();
    await this.selectTopNVolunteers(0)
   await  this.showToast('success', 'Success', 'All selected volunteers assigned successfully');
  }
  

  onRowSelect(event: any) {
    console.log('Selected Row:', event);
  }

  // onRowUnselect() {
  //   console.log('Unselected Row');
  // }
  // assignSelected(): void {
  //   // Handle the assign action for selected volunteers
  //   //console.log('Service Area:', this.Volunteership.assigned_service);
  //   // if (this.Volunteership.assigned_service == undefined || this.Volunteership.assigned_service == null){
  //   //   this.showToast('warn', 'Warning', 'Select Service Area befor Assigning');
  //   // }
    
    
  //   this.selectedVolunteers.forEach((volunteer: any) => {
  //     console.log(volunteer,'volunteerwwwww');
  //     this.assign(volunteer);
  //   });
  // }
  
}
export class Volunteership{

  id?:any;
           customer_id?:any;
           service_Area?:any;
           avaialability_in_day?:any;
           avialability_in_our?:any;
           reason?:any;
           comment?:any;
           is_assigned?: any;
           assined_to?:any;
           flag_status?:any;
           assigned_service?: any
          }
