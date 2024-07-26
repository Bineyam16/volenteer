import { Component, ElementRef, EventEmitter, Input, Output, Renderer2,NgZone ,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ServiceServiceService } from '../service-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as Survey from 'survey-angular';
import { SidebarModule } from 'primeng/sidebar';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { HttpEvent, HttpEventType, HttpParams } from "@angular/common/http";
import { MenuItem, MessageService } from 'primeng/api';
import { CookieService } from "ngx-cookie-service";

//import * as ko from "knockout";
//import { createPopper } from '@popperjs/core';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  @Output() organizationassign = new EventEmitter<any>();
  @Output() organizationData = new EventEmitter<any>();
  serviceEvent = new EventEmitter();
  formcode: any;
  NoteObj = { remarks: "", postit_note_code: "" };
  Id = 'surveyElementDisplay';
  AppNo: any;
  displayRivew: boolean = false
  FormData: any
  formData: any
  sidebarVisible: boolean = false;
  Service_ID: any;
  SDP_ID: any;
  tskTyp: any;
  tskID: any;
  DocID: any;
  validated: boolean =false;
  todoID: any;
  plotRegistrationFields: any;
  ID: any;
  prepareCertificateFields: any;
  se: any;
  eventTypes = {
    JSONFOUND: "ev001",
    ALREADYAPPLIED: "ev002",
  };
  public RequerdDocs: any;
  updated: any;
  _opened = false;
  dialogRef!: MatDialogRef<any>;
  loading: any;
  licenceService: any;
  licenceData: any=[];
  Licence_Service_ID: any;
  AppCode: any;
  surveyData: any;
  surveyModel: any;
  DropDownList: any;
  Mode: any | null;
  preAppID: any;
  PriveLicence: any;
  SelectedpreApp: any;
  SelectedpreAppForHouse: any;
  PreAppData: any;
  appliedNow: any;
  AppN: any;
  AppNoList: any;
  PriveAppNoList: any;
  ifAppNo: any;
  TaskN: any;
  ifTask: any;
  RequerdDocpre:any
  ifTaskDetail: any ;
  mimeExtension: MimeExtension = {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      extension: "xlsx",
      previewable: false,
    },
    "application/vnd.ms-excel": {
      extension: "xls",
      previewable: false,
    },
    "text/csv": {
      extension: "csv",
      previewable: false,
    },
    "application/pdf": {
      extension: "pdf",
      previewable: true,
    },
    "image/jpeg": {
      extension: "jpg",
      previewable: true,
    },
    "image/png": {
      extension: "png",
      previewable: true,
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      extension: "docx",
      previewable: false,
    },
    "application/msword": {
      extension: "doc",
      previewable: false,
    },
    "image/tiff": {
      extension: "tiff",
      previewable: true,
    },
    "image/gif": {
      extension: "gif",
      previewable: true,
    },
    "application/geojson": {
      extension: "geojson",
      previewable: false,
    },
    "application/x-zip-compressed": {
      extension: "zip",
      previewable: false,
    },
  };
  RequerdDocspre: any;
  loadingPreDoc: any
  SavedFilespre: any;
  selectedpreTask: any;
  selectedTask: any;
  SavedFiles: any;
  PreTaskData: any;
  task: any;
  taskID: any;
  showfile: boolean = false;
  SDP_I: any;
  newtask: any;
  public RequerdDocss: any;
  todo: any;
  orgdata: any;
  orgDetails: any;
 public tasknew: any;
  tskTyp2: any;
  orgassign: any;
  reviewDialog: any
  RequerdDocspreeach: any;
  documentupload: any;
  progress: any;
  disDocument: any;
  mimeType: any;
  fileupload: any;
  uploadedDocumnet: any;
  issendnote: boolean = false;
  valid: boolean =false
  role: any;
  actiontab: boolean = false;

  
  constructor(
    // private modalService: BsModalService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public serviceService: ServiceServiceService,
    private router: Router,
    private _toast: MessageService,
    // private notificationsService: NotificationsService,
    private sanitizer: DomSanitizer,
    // public ngxModal: NgxSmartModalService,
    private renderer: Renderer2,
    private el: ElementRef,
    private cdr: ChangeDetectorRef, 
    private zone: NgZone,
    private cookieService: CookieService
    // private dialogService: DialogService,
    // private networkService: NetworkMonitoringService
  ) {}
  ngOnInit() {
   
    // setInterval(() => {
    //   this.serviceService
    //     .getdbstatus("00000000-0000-0000-0000-000000000000")
    //     .subscribe((response: any) => {
    //       console.log("response", response); 
    //       if (response == true) {
    //         this.okdb = true;
    //       } else {
    //         this.okdb = false;
    //       }
    //     });
    // }, 1000);
    // this.serviceService.getUserRole().subscribe((response: any) => {
    //   if (response) {
    //     for (let index = 0; index < response.length; index++) {
    //       const element = response[index];

    //       if (
    //         element.RoleId == "8e759c69-1ed6-445b-b7f8-32c3fd44e8be" ||
    //         element.RoleId == "3ba734c5-d75a-44c7-8c47-5233431372ba"
    //       ) {
    //         this.eid = element.UserId;
    //         this.hideit = true;
    //         break;
    //       } else {
    //         this.eid = element.UserId;
    //         console.log("responseresponseresponse", element);
    //         this.hideit = false;
    //       }
    //     }
    //   }
    // });
    // this.serviceService.getUserRole().subscribe((response: any) => {
    //   if (response) {
    //     for (let index = 0; index < response.length; index++) {
    //       const element = response[index];

    //       if (
    //         element.RoleId ===
    //         "B59EA343-65EF-4C41-95A8-02D9AD81BFCD".toLocaleLowerCase()
    //       ) {
    //         this.serviceService.backbuttonviable = true;
    //         break;
    //       } else {
    //         this.serviceService.backbuttonviable = false;
    //       }
    //     }
    //   }
    // });
    // this.serviceService.getUserRole().subscribe((response: any) => {
    //   if (response) {
    //     for (let index = 0; index < response.length; index++) {
    //       const element = response[index];

    //       if (
    //         element.RoleId ==
    //           "8C133397-587E-456F-AB31-9CF5358BE8D2".toLocaleLowerCase() ||
    //         element.RoleId ==
    //           "270F762A-5393-4971-83BA-C7FF7D560BDA".toLocaleLowerCase() ||
    //         element.RoleId ==
    //           "B59EA343-65EF-4C41-95A8-02D9AD81BFCD".toLocaleLowerCase()
    //       ) {
    //         this.eid = element.UserId;
    //         this.serviceService.isRecordDocumentationManager = true;
    //         console.log("responseresponseresponserole", element);
    //         break;
    //       } else {
    //         this.eid = element.UserId;
    //         console.log("responseresponseresponse", element);
    //         this.serviceService.isRecordDocumentationManager = false;
    //       }
    //     }
    //   }
    // });

    // this.serviceService.GetSuperviedUsers().subscribe((SuperviedUsers) => {
    //   this.SuperviedUsers = SuperviedUsers;
    //   this.SuperviedUsers = Object.assign([], this.SuperviedUsers);
    //   this.SuperviedUsers = SuperviedUsers;
    //   if (this.SuperviedUsers != undefined || this.SuperviedUsers != null) {
    //     if (this.SuperviedUsers.length > 0) {
    //       this.isSuperviedUsers = true;
    //     } else {
    //       this.isSuperviedUsers = false;
    //     }
    //   }
    // });

    // // this.preback();
    // if (
    //   environment.Lang_code === "am-et" ||
    //   environment.Lang_code === "am-ET"
    // ) {
    //   this.language = "amharic";
    // } else {
    //   this.language = "english";
    // }

    console.log("Servicesssssssss");
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log("leaseappppppp", params);
      // this.ID = params['id'];
      this.formcode = params["formcode"].toLocaleLowerCase();

      console.log('leaseappppppp', this.formcode );
      
      this.AppNo = params["AppNo"];
      //this.getAppData(this.AppNo)
      console.log('this.AppNo',this.AppNo);
      if(this.AppNo != null || this.AppNo != undefined){
        console.log("Licence Servicesssss");
      this.getAll(this.AppNo);
      }
      this.tskTyp2 = params["tskTyp"];
      console.log('params["tskID"]',this.tskTyp2);
      //this.getPriveysLicence(this.AppNo)
      if(params["ServiceId"]){
        this.DocID = params["ServiceId"]
      }
      else{
        this.DocID = params["docid"];
      }
      
      console.log(this.DocID, 'this.DocID');
      this.todoID = params["todoID"];
      console.log( params["tskID"], 'this.formcode');
      this.tasknew =params["tskID"]
      this.newtask = params["tskID"].toLocaleLowerCase()
      
      this.SDP_I =params["docid"]
      this.Service_ID = this.SDP_I.toLocaleLowerCase();;
      console.log(this.Service_ID,"leaseappppppp");
      
     // console.log("leaseappppppp",this.SDP_ID.toLocaleLowerCase() );
      
      
      this.tskID = params["tskID"];
      //console.log('params["tskID"]',this.tskTyp);
      
      this.serviceService.task = this.tskID
      this.serviceService.getUserRolee().subscribe((response: any) =>{
        console.log(response[0].RoleId, 'responseeee');
        this.role = response[0].RoleId
        if(this.role == '51f75ae2-2d81-4702-ba4f-2c46ac6d8d9d'){
          this.serviceService.actiontab = false
          //this.serviceService.disablefins = true
        }
        else{
          this.serviceService.actiontab = true
          this.serviceService.disablefins = false
        }

      }
       
       
      )
      // this.serviceService.getFormData(this.formcode).subscribe(
      //   (res:any)=>{
      //     this.surveyData=res
      //     this.viewform(this.surveyData);
      //     const survey = new Survey.Model(this.surveyData);
      //     Survey.SurveyNG.render('surveyElement', { model: survey });
      //     console.log('teststststst',res);
          
      //   }
      // );
      // if (this.serviceService.propertytaskslist != undefined) {
      //   let filterpropertyid = this.serviceService.propertytaskslist.filter(
      //     (x: any) => x.id.toLocaleLowerCase() === this.tskID
      //   );
      //   console.log(
      //     "🚀 ~ this.activatedRoute.params.subscribe ~ filterpropertyid:",
      //     filterpropertyid,
      //     this.serviceService.propertytaskslist,
      //     this.tskID
      //   );
      //   if (filterpropertyid.length > 0) {
      //     this.serviceService.backbuttonviable = true;
      //   } else {
      //     this.serviceService.backbuttonviable = false;
      //   }
      // }

      if (this.tskTyp2 == "c800fb16-f961-e111-95d6-00e04c05559b") {
        this.getTaskRule2(params["tskID"]);
      }
      
      
      
      //this.DocID = params["docid"];
      console.log(this.DocID, 'this.DocID');
      
      //  this.getFormData(params['docid']);
      this.todoID = params["todoID"];
      
      //this.formcode = params["formcode"];
     // this.formcode = this.formcode
    });
  //  this.getRequiredDocs();
    //this.hideBackButton();
   // this.getLookups();
    this.getRequiredDocs();
   // this.GetPlot_Land_Grade_lookup();
  //  this.getLease_Stuts_Lookup();
  console.log(this.formcode, 'leaseappppppp');
  
     if (this.formcode == "27c75d40-060f-4317-9d65-f2ce04f720c3" || this.formcode =="847de709-deaa-4791-bf05-aed9199d97b8") {
      this.ID = 13;
      console.log("hereeeeeee");
      if (this.formcode == "847de709-deaa-4791-bf05-aed9199d97b8"){
        console.log("hereeeeeee");
        
        this.serviceService.checkassign = true
      }
      console.log("this.formcode");
      
    }
    else if (this.formcode == "f54a5678-bd5b-4119-a09e-df01e2c53b70".toLocaleLowerCase()) {
      this.ID = 16;
      console.log("hereeeeeee", this.ID);

      if (this.formcode == "847de709-deaa-4791-bf05-aed9199d97b8"){
        console.log("hereeeeeee");
        
        
      }
      console.log("this.formcode");
      
    }
    else if(this.formcode == "a3dc2edb-1625-40ac-baa7-292b9e4a81da"){
      this.ID = 17;

    }else {
      
      this.ID = 0;
      if (this.AppNo != undefined || this.AppNo != null) {
        this.se.on(this.eventTypes.JSONFOUND, () => {
          this.serviceService.getFormData(this.formcode).subscribe(
            (success:any) => (this.ID = 1),
            (error:any) => (this.ID = 404)
          );
          console.log("display form");
          console.log("ddd", this.formcode);
        });
      } else {
        this.serviceService.getFormData(this.formcode).subscribe(
          (success:any) => (this.ID = 1),
          (error:any) => (this.ID = 404)
        );
      }
    }
    // else if (this.formcode == "30daa989-45f8-481e-9489-5d689d55fbb5") {
    //   this.ID = 14;
    //   console.log("this.formcode");
      
    // } else
     {
   console.log('this.AppNo',this.AppNo);
   

    }
    
    if (this.RequerdDocs) {
      for (let i = 0; i < this.RequerdDocs.length; i++) {
        console.log(
          "this.RequerdDocs[i].description_en.indexOf('*')",
          this.RequerdDocs[i].description_en.indexOf("*")
        );
        if (this.RequerdDocs[i].description_en.indexOf("*") !== -1) {
          this.RequerdDocs[i].required = true;
        }
      }
      this.updated.emit({ docs: this.RequerdDocs });
    }
    this.getRequiredDocss()
  
  }
  addNote() {
    //this.NoteObj.postit_note_code = this.todoID;
    this.serviceService
      .addNote(this.AppNo, this.todoID, this.NoteObj.remarks, this.serviceService.docid)
      .subscribe(
        (message) => {
          //const toast = this.notificationsService.success("Sucess", "Saved");
          this.issendnote = true;
          this.GetNote(message);
        },
        (error) => {
          // const toast = this.notificationsService.error(
          //   "Error",
          //   "SomeThing Went Wrong"
          // );
        }
      );
  }
  sendNote() {
    // this.NoteObj.postit_note_code = this.todoID;
    //this.SubmitAR(this.serviceService.taskrul)
    this.serviceService
      .sendNotee(
        this.NoteObj.remarks,
        this.AppNo,
        this.NoteObj.postit_note_code,
        this.todoID,
        this.licenceData.SDP_ID
      )
      .subscribe(
        (message) => {
          // const toast = this.notificationsService.success(
          //   "Sucess",
          //   "Sent Sucessfully"
          // );
          // this.serviceService
          //   .sendNoteApi(
          //     this.NoteObj.remarks,
          //     this.AppNo,
          //     this.todoID,
          //     this.todoID,
          //     this.SDP_ID
          //   )
          //   .subscribe((message) => {});
          this.GetNote(message);
        },
        (error) => {
          // const toast = this.notificationsService.error(
          //   "Error",
          //   "SomeThing Went Wrong"
          // );
        }
      );
  }
  showToast(type: string, title: string, message: string) {
    let messageConfig = {
      severity: type,
      summary: title,
      detail: message
    }
    console.log(messageConfig,'messageConfig');
    
  
    this._toast.add(messageConfig);
  }
  DeleteNote() {
    this.serviceService
      .DeleteNote(this.AppNo, this.NoteObj.postit_note_code)
      .subscribe(
        (message) => {
          // const toast = this.notificationsService.success(
          //   "Sucess",
          //   "Deleted sucessfully"
          // );
          this.GetNote(message);
        },
        (error) => {
          // const toast = this.notificationsService.error(
          //   "Error",
          //   "SomeThing Went Wrong"
          // );
        }
      );
  }
  saveNote() {
    //this.NoteObj.postit_note_code = this.todoID;
    console.log('this.NoteObj.remarks',this.NoteObj.remarks);
    
    this.serviceService.saveNotee(this.NoteObj.remarks, this.todoID).subscribe(
      (message) => {
        // const toast = this.notificationsService.success(
        //   "Sucess",
        //   "Edited sucessfully"
        // );
        this.GetNote(message);
      },
      (error) => {
        // const toast = this.notificationsService.error(
        //   "Error",
        //   "SomeThing Went Wrong"
        // );
      }
    );
  }
  GetNote(message: any) {
    this.serviceService.GetNote(this.AppNo).subscribe(
      (Notes) => {
        if (Notes) {
          console.log("NoteObj", Notes);
          (Notes as Array<any>).some((note) => {
            if (note.postit_note_code === message) {
              this.NoteObj = note;
              return true;
            } else {
              // this.NoteObj = { remarks: "", postit_note_code: "" };
              return false;
            }
          });
        } else {
          // this.NoteObj = { remarks: "", postit_note_code: "" };
        }
      },
      (error) => {
        // const toast = this.notificationsService.error(
        //   "Error",
        //   "SomeThing Went Wrong"
        // );
      }
    );
  }
  async SubmitAR(ruleid: any) {
    this.serviceService.disablefins = true;
    this.serviceService
      .SubmitAR(this.AppNo, this.DocID, this.todoID, ruleid)
      .subscribe(
        (message: any) => {
          if (message) {
            console.log(
              "🚀 ~ file: service.component.ts:1615 ~ SubmitAR ~ message:",
              message
            );
            // const toast = this.notificationsService.success(
            //   "Sucess",
            //   "sucesss"
            // );

            // this.serviceService.getUserRole().subscribe((response: any) => {

            //   for (let index = 0; index < response.length; index++) {
            //     const element = response[index];
            //     if (
            //       element.RoleId ==
            //         "F8DDA85E-F967-4AC5-BF79-4D989ECFB863".toLocaleLowerCase() ||
            //       element.RoleId ==
            //         "5B3B5DD4-3CEF-4696-AC19-442BA531A7DD".toLocaleLowerCase ||
            //       element.RoleId ==
            //         "FE7BE2E0-E717-4230-B732-5B810A8BB875".toLocaleLowerCase() ||
            //       element.RoleId ==
            //         "8ACA5AE9-7CE3-4964-AF89-F92A9DF3C2E2".toLocaleLowerCase()
            //     )
            //     {
          
          
             
             
         
            //     } else {
            //       console.log("responseresponseresponse", element);
            //     }
            //   }
            // });

           // this.issucess = true;
          } 
          this.Close();
        },

      );
      
  }
  openReviewDialog(): void {
    this.dialogRef = this.dialog.open(this.reviewDialog, {
      width: '80%',
      height: '800px'
    });
  }
  extractExtensionFromFileName(fileName: any) {
    if (fileName) {
      let fileNameSegment = (fileName as string).split(".");
      return `application/${fileNameSegment[fileNameSegment.length - 1]}`;
    }
    return "";
  }
  previewdocumnet(file: any) {
    if (file == "" || file == null) {
      this.disDocument = true;
    } else {
      this.disDocument = false;
    }
    try {
      let fileData = JSON.parse(window.atob(file));
      let { type, data } = fileData;
      this.mimeType = type;
      this.fileupload = "data:" + type + ";base64, " + data;
      this.uploadedDocumnet = true;
     // this.uploadcontract = false;

      this.documentupload = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.fileupload
      );
      console.log(this.documentupload);
    } catch (e) {
      console.error(e);
    }
  }
  Uploader(File: any, RequiredDoc: any, fild: any) {
    let taskType =
      this.tskTyp === "c800fb16-f961-e111-95d6-00e04c05559b"
        ? "Decision"
        : "Complete";
    console.log("RequiredDoc", RequiredDoc);
    console.log("File ", File);
    let base64file: any;
    let fullbase64;
    const reader = new FileReader();
    reader.readAsDataURL(File);
    reader.addEventListener("loadend", (e) => {
      base64file = reader.result;
      fullbase64 = base64file;
      const re = /base64,/gi;
      base64file = base64file.replace(re, "");
      base64file = base64file.split(";")[1];
      let type =
        File.type != ""
          ? File.type
          : this.extractExtensionFromFileName(File.name);
      let base64FileData = btoa(
        JSON.stringify({
          type,
          data: base64file,
        })
      );

      this.documentupload = base64FileData;
      this.previewdocumnet(base64FileData);

      console.log("this.DocID", base64file);
      this.serviceService
        .saveFile(
          base64FileData,
          File.type,
          this.AppNo,
          RequiredDoc.requirement_code,
          taskType,
          RequiredDoc.description_en,
          this.DocID
        )
        .subscribe(
          (message: any) => {
            if (message) {
              // var eventTotal = message.total ? message.total : 0;
              // this.progress = Math.round(
              //   (message.loaded / message.total) * 100
              // );
              console.log(`Uploaded! ${this.progress}%`);
              this.serviceService.disablefins = false;
              fild.clear();
              // const toast = this.notificationsService.success(
              //   "Success",
              //   "Uploaded successfully"
              // );
              for (let i = 0; i < this.RequerdDocs.length; i++) {
                if (
                  this.RequerdDocs[i].requirement_code ==
                  RequiredDoc.requirement_code
                ) {
                  this.RequerdDocs[i].mimeType = type;
                  this.RequerdDocs[i].File =
                    "data:" + type + ";base64, " + base64file;

                  this.RequerdDocs[i].File =
                    this.sanitizer.bypassSecurityTrustResourceUrl(
                      this.RequerdDocspreeach[i].File
                    );
                }
              }

              //this.updated.emit({ docs: this.RequerdDocs });
            } else {
              console.log("error");
              // const toast = this.notificationsService.error(
              //   "Error",
              //   "SomeThing Went Wrong"
              // );
            }
          },
          (error) => {
            console.log("error");
            //const toast = this.notificationsService.error(
             // "Error",
             // "SomeThing Went Wrong"
           // );
          }
        );
    });
    console.log("this.RequerdDocs", this.RequerdDocs);
  }
  removeUpload(RequiredDoc: any) {
    this.serviceService.RemoveDoc(RequiredDoc.document_code).subscribe(
      (message) => {
        //const toast = this.notificationsService.success("Sucess", message);

        for (let i = 0; i < this.RequerdDocs.length; i++) {
          if (
            this.RequerdDocs[i].requirement_code == RequiredDoc.requirement_code
          ) {
            this.RequerdDocs[i].File = null;
            this.RequerdDocs[i].document_code = null;
          }
        }
        console.log("RequerdDocs", this.RequerdDocs);
      },
      (error) => {
        console.log("error");
        // const toast = this.notificationsService.error(
        //   "Error",
        //   "SomeThing Went Wrong"
        // );
      }
    );
  }
  upload(event: any, RequiredDoc: any, fild: any) {
    this.Uploader(event.files[0], RequiredDoc, fild);
    console.log("event", event);
    console.log("RequiredDoc", RequiredDoc);
    console.log("this.RequerdDocs", this.RequerdDocs);
    for (let i = 0; i < this.RequerdDocs.length; i++) {
      if (
        RequiredDoc.requirement_code === this.RequerdDocs[i].requirement_code
      ) {
        this.RequerdDocs[i].uploded = 1;
      }
    }
    console.log("files", event.files);
  }
  closeReviewDialogg(): void {
    this.dialogRef.close();
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
      Survey.SurveyNG.render(this.Id, { model: this.surveyModel });
      console.log('survey form :: ', Survey);
      this.surveyModel.onComplete.add((result: any) => {
        console.log('result', result);
  
        this.saveFormmjson(result);
      });
    //}
  }
  selectTask(Task: any) {
    this.task = Task;
    this.formcode = Task.meta_data_forms_form_code;
    this.taskID = Task.task_code;
    console.log('eyamamaweee', this.taskID);
    this.serviceService.taskID=this.taskID
    console.log('eyamamaweee23', this.serviceService.taskID);
    this.getRequiredDocss();
    //this.getFinshList();
    this.ID = 1;
    console.log('this.ID', this.ID);
    // this.ngxSmartModalService.getModal('myModalwwwwww').close()
  }

  getRequiredDocss() {
    this.serviceService.getRequerdDocs(this.newtask).subscribe(RequerdDocs => {
      this.RequerdDocss = RequerdDocs;
      this.serviceService.RequiredDocs = this.RequerdDocss
      console.log('RequerdDocs',RequerdDocs);
      
      for (let i = 0; i < this.RequerdDocs.length; i++) {
        if (this.RequerdDocs[i].description_en == "Dummy") {
          this.RequerdDocs.splice(i, 1);
          break;
        }
      }
      if (this.RequerdDocs.length > 0) {
        this.showfile = true;
      }
      console.log('RequerdDocs', this.RequerdDocs);
      console.log('trying geting documents by ', this.licenceData);
      if (this.licenceData) {
        console.log('trying geting documents by ', this.licenceData.Licence_Service_ID);
        console.log('geting documents');
        if (this.licenceData.Licence_Service_ID) {
          console.log('geting documents');
          this.getAllDocument();
        }
      }
    }, error => {
      console.log('error');
    });
  }
  getJsonData(appNo: any) {
    this.getAppData(appNo);
  }

  getPriveysLicence(Certificate_Code: any) {
    console.log("🚀 ~ ServiceComponent ~ getPriveysLicence ~ Certificate_Code:", Certificate_Code)
    this.AppN = null;
    this.serviceService.getLicenseService(Certificate_Code).subscribe(
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

        if (this.PriveAppNoList.length > 0) {
          this.getJsonData(this.PriveAppNoList[0]['Application_No']);
        }
        else {
          this.serviceEvent.emit(this.eventTypes.JSONFOUND);
        }

        this.AppN = this.AppNo;
        this.getAppData(this.AppN);

        this.TaskN = this.tskID;
      },
      (error: any) => {
        console.log("error");
        this.serviceEvent.emit(this.eventTypes.JSONFOUND);
      }
    );
  }
  public _toggleOpened(): void {
    this._opened = !this._opened;
  }

  getAppData(appNO: any) {
    this.preAppID = 0;
    this.serviceService.getTodandAppNo(appNO).subscribe(
      (PreAppData: any) => {
        this.preAppID = PreAppData;
         this.PreAppData = PreAppData;
        console.log('PreAppData',PreAppData);

        console.log("PriveLicence", this.licenceService);
        for (let i = 0; i < this.licenceService.list.length; i++) {
          console.log("PriveLicence", this.licenceService);
          if (this.licenceService.list[i].Application_No == appNO) {
            this.SelectedpreApp = this.licenceService.list[i];
            this.serviceService.ApplicationNo= this.licenceService.list[i].Application_No 
             this.SelectedpreAppForHouse = this.licenceService.list[0];
            console.log("this.SelectedpreApp", this.SelectedpreApp);
          }
        }
        this.PreAppData = Object.assign([], this.PreAppData.Table);

        this.PreAppData.find(
          (          appData: { form_code: any; JsonData: any; }) => {
            if (appData.form_code === this.formcode) {
              this.FormData = appData.JsonData;
              console.log('json data pend and close :: ', appData.JsonData);
              return true;
            }
            return false;
          }
        );
        this.serviceEvent.emit(this.eventTypes.JSONFOUND);

        let allTasks = [];

        if (!this.appliedNow) {

          this.serviceService.getViewAspNetUsersWorkInfoDetail(
            environment._UserName
          ).subscribe(
            (           
               success: string | any[]) => {
              if (success.length > 0) {
                this.serviceService.getMytasks(success[0]['organization_code']).subscribe(
                  (   
                     tasks:any) => {
                    let applicationFound = false;
                    let isPickable = true;
                    let warningData = {
                      message: '',
                      type: 0
                    }
                    if (tasks['Table1']) {
                      allTasks = tasks['Table1'];

                      allTasks.find(
                        (                       
                           task: { [x: string]: any; }) => {
                          console.log('task :: ', task['step_no'], ' & ', task['todo_comment'], ' app number :: ', this.AppNo);
                          if (this.AppNo && task["todo_comment"] == this.AppNo) {
                            applicationFound = true;
                            this.PreAppData.find(
                              (                        
                                
                                  appData: { tasks_task_code: any; }) => {
                                if (appData.tasks_task_code == this.tskID) {
                                  console.warn('found already saved task :: ', appData);
                                  if (task['tasks_id'] != this.tskID) {
                                    console.warn('found already passed task');
                                    isPickable = false;
                                    warningData.message = 'you already have gone through this task! redirecting to my task';
                                    //warningData.type = this.errorType.TASKCOMPLETED;
                                    return true;
                                  }
                                  return true;
                                }
                                return false;
                              }
                            );
                          }
                          return false;
                        }
                      )
                      // if (!applicationFound) {
                      //   isPickable = false;
                      //   warningData.message = 'you have completed the application! redirecting to my task';
                      //   warningData.type = this.errorType.TASKCOMPLETED;
                      // }

                      if (!isPickable) {
                       // this.serviceEvent.emit(this.eventTypes.ALREADYAPPLIED, warningData);
                      }
                    }
                  }
                );
              }
            }
          );
        }


        // this.PreAppData = (Object.assign({}, this.PreAppData.Table));
        // console.log('PreAppData', this.PreAppData);
        this.ifTask = true;
        // if (appNO) {
        //   this.GetNotePrevius(appNO);
        // }
        if (this.TaskN) {
          this.getTaskData(this.TaskN);
        }
      },
      (error) => {
        console.log("error");
        this.serviceEvent.emit(this.eventTypes.JSONFOUND);
      }
    );
  }
  getTaskData(task: any) {
    this.preAppID = 0;
    this.PreTaskData = [];
    console.log("this.PreTaskData",this.PreTaskData);
    
    for (let i = 0; i < this.PreAppData.length; i++) {
      if (this.PreAppData[i].tasks_task_code == task) {
        console.log("this.PreAppData[i]", this.PreAppData[i]);
        this.PreTaskData.push(this.PreAppData[i]);
      }
    }
    console.log("PreTaskData", this.PreTaskData);
  }

  getRequiredDocspre(tskID: any) {
    this.serviceService.getRequerdDocs(tskID).subscribe((RequerdDocs: any) => {
      this.RequerdDocspre = RequerdDocs;
      console.log(this.RequerdDocspre,'RequerdDocs');
      
      if (this.RequerdDocs != null)
        for (let i = 0; i < this.RequerdDocs.length; i++) {
          if (this.RequerdDocs[i].description_en == "Dummy") {
            this.RequerdDocs.splice(i, 1);
            break;
          }
        }
      this.getAllDocument();
       console.log('RequerdDocs', this.RequerdDocs);
    }, (error: any) => {
      console.log('error');
    });
  }
  // getAllDocument() {
  //   this.serviceService.getAllDocument(this.serviceService.licenceservice, this.serviceService.docid).subscribe(SavedFiles => {
  //     this.SavedFiles = SavedFiles;
  //     console.log('SavedFiles',SavedFiles);
      
  //     if (this.RequerdDocs != null){
  //     for (let i = 0; i < this.RequerdDocs.length; i++) {
  //       for (let j = 0; j < SavedFiles.length; j++) {
  //         if (this.RequerdDocs[i].requirement_code == SavedFiles[j].requirement_code) {
  //           this.RequerdDocs[i].File = 'data:image/jpg;base64, ' + SavedFiles[j].document;
  //           this.RequerdDocs[i].File = this.sanitizer.bypassSecurityTrustResourceUrl(this.RequerdDocs[i].File);
  //           this.RequerdDocs[i].document_code = SavedFiles[j].document_code;
  //         }
  //       }
  //     }
  //     console.log('SavedFiles', this.SavedFiles);
  //   }}, error => {
  //     console.log('error');
  //   });
  // }
  public savee(){
   // this.backgroundForm.patchValue({
      //id:this.Volunteer.customer_ID,  
     // term_and_condition:this.terms.value['agreeTerms'],
     // is_approved:false
   // })
   // this.Organization=this.backgroundForm.value
    //console.log('testssss',this.Organization);
   // this.service.insertOrganization(this.Organization).subscribe((res:any)=>{
     // this.showToast('success', 'success', 'inserted!');
      {
        console.log(this.Service_ID,"leaseappppppp");        
        this.serviceService
      .saveFormm(
        this.serviceService.Licence_Service_ID ? this.serviceService.Licence_Service_ID :  "00000000-0000-0000-0000-000000000000",
        this.DocID,
        this.newtask,
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
          this.serviceService.todo = response[2]
          this.showToast('success', 'success', 'inserted!');
          if(this.licenceData.Application_No){
            this.showToast('success', 'Application Number', this.licenceData.Application_No);
          }
          
          // this.service.getAll(this.AppNo).subscribe((response: any) =>
          //   this.response = response
          // )
          console.log(this.AppNo,'this.AppNo');
          this.serviceService.licenceservice = this.AppNo
          this.serviceService.docid = this.DocID
          
          this.getAll(this.AppNo)
          this.getAllDocument()
          console.log('this.response', response);
          
          if (this.todoID == undefined) {
            this.todoID = response[2];
          }
  
          // this.getAll();
          // this.cannxtto2 = false;
          
        },
      
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
  public   getAllDocumentt() {
    this.serviceService.getAllDocument(this.serviceService.licenceservice, this.serviceService.docid).subscribe(SavedFiles => {
      this.SavedFiles = SavedFiles;
      console.log('SavedFiles',SavedFiles);
      
      if (this.RequerdDocs != null){
      for (let i = 0; i < this.RequerdDocs.length; i++) {
        for (let j = 0; j < SavedFiles.length; j++) {
          if (this.RequerdDocs[i].requirement_code == SavedFiles[j].requirement_code) {
            this.RequerdDocs[i].File = 'data:image/jpg;base64, ' + SavedFiles[j].document;
            this.RequerdDocs[i].File = this.sanitizer.bypassSecurityTrustResourceUrl(this.RequerdDocs[i].File);
            this.RequerdDocs[i].document_code = SavedFiles[j].document_code;
          }
        }
      }
      console.log('SavedFiles', this.SavedFiles);
    }}, error => {
      console.log('error');
    });
  }


  getAllDocument() {
    console.log('SavedFiles',this.licenceData.Licence_Service_ID, this.DocID);
    this.serviceService.getAllDocument(this.licenceData.Licence_Service_ID, this.DocID).subscribe(SavedFiles => {
      this.SavedFiles = SavedFiles;
      console.log('SavedFiles');
      
      if (this.RequerdDocs != null){
      for (let i = 0; i < this.RequerdDocs.length; i++) {
        for (let j = 0; j < SavedFiles.length; j++) {
          if (this.RequerdDocs[i].requirement_code == SavedFiles[j].requirement_code) {
            this.RequerdDocs[i].File = 'data:image/jpg;base64, ' + SavedFiles[j].document;
            this.RequerdDocs[i].File = this.sanitizer.bypassSecurityTrustResourceUrl(this.RequerdDocs[i].File);
            this.RequerdDocs[i].document_code = SavedFiles[j].document_code;
          }
        }
      }
      console.log('SavedFiles', this.SavedFiles);
    }}, error => {
      console.log('error');
    });
  }

  getAllDocumentpre(Licence_Service_ID: any, DocID: any) {
    this.loadingPreDoc = true;
    this.serviceService.getAllDocument(Licence_Service_ID, DocID).subscribe(
      (SavedFiles: any) => {
        this.loadingPreDoc = false;
        console.log("pdf file", SavedFiles)
        this.SavedFilespre = SavedFiles;
          for (let i = 0; i < this.RequerdDocspre.length; i++) {
            for (let j = 0; j < SavedFiles.length; j++) {
              if (
                this.RequerdDocspre[i].requirement_code ==
                SavedFiles[j].requirement_code
              ) {

                try {
                  let fileData = JSON.parse(atob(
                    SavedFiles[j].document
                  ));

                  let { type, data } = fileData;

                  this.RequerdDocspre[i].mimeType = type;
                  this.RequerdDocspre[i].File =
                    "data:" + type + ";base64, " + data;
                  this.RequerdDocspre[
                    i
                  ].File = this.sanitizer.bypassSecurityTrustResourceUrl(
                    this.RequerdDocspre[i].File
                  );

                  this.RequerdDocspre[i].document_code =
                    SavedFiles[j].document_code;
                }
                catch (e) {
                  console.error(e);
                }
              }

            }
          }
        console.log("SavedFiles", this.SavedFiles);
        console.log("SavedFilesPre", this.RequerdDocspre);
      },
      (error: any) => {
        this.loadingPreDoc = false;
        console.log("error");
      }
    );
  }
  // SavedFiles(arg0: string, SavedFiles: any) {
  //   throw new Error('Method not implemented.');
  // }

  SelectTask(task: any) {
    
    this.selectedpreTask = task;
    this.selectedTask = task;
    this.getRequiredDocspre(task.tasks_task_code);
    this.getAllDocumentpre(this.SelectedpreApp.Licence_Service_ID, task.docId);
    console.log("task", task.form_code);
 
     if (task.form_code == "a3dc2edb-1625-40ac-baa7-292b9e4a81da") {
      this.preAppID = 2;

    }
    else if(task.form_code == "f54a5678-bd5b-4119-a09e-df01e2c53b70"){
      this.preAppID =3;
      console.log("preeeeee", task);
    }
    else {
      this.preAppID = 1;
      console.log("pre", task);
    }
    
    console.log(
      "form_code => " + task.form_code + "  pre app id => " + this.preAppID
    );
    this.ifTaskDetail = true;
  }

  saveFormmjson(formData: any) {
     
      console.log("save-form", JSON.stringify(formData));
      this.serviceService
        .saveFormObj(
          this.licenceData
            ? this.licenceData.Licence_Service_ID
            : this.Service_ID,
          this.licenceData
            ? this.licenceData.Service_ID
            : "00000000-0000-0000-0000-000000000000",
        this.tasknew,
          this.SDP_ID,
          JSON.stringify(formData),
          this.DocID || "00000000-0000-0000-0000-000000000000",
          this.todoID || "00000000-0000-0000-0000-000000000000"
        )
        .subscribe(
          (response: any) => {
            console.log("save-from-response", response);
          //  this.showToast('success', 'success', 'inserted!');
            this.serviceService.disablefins = false;
            this.AppNo = response[0];
            this.DocID = response[1];
            //this.todoID = response[2];
            this.getAll(this.AppNo);
            this.showToast('success', 'success', 'inserted!');
            this.serviceService.disablefins = false
          // console.log(this.showToast('success', 'success', 'inserted!'), 'sssssssss');
            
           // const toast = this.notificationsService.success("Success", "Saved");
            this.validated = true;
            this.zone.run(() => {
              this.validated = true; // or whatever logic sets validated to true
              this.cdr.detectChanges(); // Manually trigger change detection
              console.log('this.validated',this.validated);
            });
            
          },
          (error) => {
            console.log("save-form-error", error);
            // const toast = this.notificationsService.error(
            //   "Error",
            //   "SomeThing Went Wrong"
            // );
          }
        );
    
  }
  saveFormm2(formData: any) {
    console.log("save-form", JSON.stringify(formData));
    this.serviceService
      .saveFormm(
        this.licenceData
          ? this.licenceData.Licence_Service_ID
          : this.Service_ID,
        this.licenceData
          ? this.licenceData.Service_ID
          : "00000000-0000-0000-0000-000000000000",
        this.tskID,
        this.SDP_ID,
        JSON.stringify(formData),
        this.DocID || "00000000-0000-0000-0000-000000000000",
        this.todoID || "00000000-0000-0000-0000-000000000000"
      )
      .subscribe(
        (response: any) => {
          console.log("save-from-response", response);

          this.serviceService.disablefins = false;
          this.AppNo = response[0];
          this.DocID = response[1];
          //  this.todoID = response[2];
          this.getAll(this.AppNo);
         // const toast = this.notificationsService.success("Success", "Saved");
          this.validated = true;
          console.log('this.validated',this.validated);
          
        },
        (error) => {
          console.log("save-form-error", error);
          // const toast = this.notificationsService.error(
          //   "Error",
          //   "SomeThing Went Wrong"
          // );
        }
      );
  }
  Close() {
    this.router.navigate(["/task/MyTask"]);
  }
  isvalidated(todoID: any, tskID: any, plotid: any, proid:any, DocID:any) {
    this.serviceService
      .isvalidated(todoID, tskID, plotid, proid, DocID)
      .subscribe(
        (Validated) => {
          // const toast = this.notificationsService.success("success", "successfull");
          console.log("validateing.... => " + Validated);

          if (Validated == "Validated") {
            this.validated = true;
          } else {
            this.validated = true;

            // this.disablefins = true;
            // this.validated = false;
            // const toast = this.notificationsService.warn("Warning", Validated);
          }
          // this.RequerdDocs = RequerdDocs;
          console.log('this.validated',this.validated);
          // this.getAllDocument();
          // console.log('RequerdDocs', this.RequerdDocs);
        },
        (error) => {
          console.log("error");
        }
      );
  }
  EnableFins() {
    this.serviceService.disablefins = false;
    console.log("enableningggg....", this.validated);

    // this.saveForm(this.jsonempty);
    this.validated = true;
    this.isvalidated(
      this.todoID,
      this.tskID,
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000000",
      this.DocID
    );

    // this.disablefins = false;
  }
  Submit(ruleid: any) {
    this.serviceService.disablefins = true;

    this.serviceService
      .Submit(this.AppNo, this.DocID, this.todoID, ruleid)
      .subscribe(
        (message) => {
          // console.log('message', message);
          if (message) {
            // const toast = this.notificationsService.success(
            //   "Sucess",
            //   "sucesss"
            // );
          } else {
            // const toast = this.notificationsService.error(
            //   "Error",
            //   "SomeThing Went Wrong"
            // );
          }
          this.Close();
          
        },

      );


  
  }
  getTaskRule2(tasksId: any) {
    this.serviceService.getTaskRule(tasksId).subscribe(
      (DropDownList: any) => {
        console.log(DropDownList, 'DropDownList');
        
        this.DropDownList = DropDownList;
        this.DropDownList = Object.assign([], this.DropDownList);
       
      },
      (error) => {
        console.log("error");
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(ServiceComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
    this.serviceService.getAll(AppNo).subscribe(
      (licenceService:any) => {
        this.licenceService = licenceService;
      
       
        if (this.licenceService.list.length > 0) {
          console.log("Licence Servicesssss", this.licenceService.list[0].CustomerID);
          this.serviceService.Licence_Service_ID = this.licenceService.list[0].Licence_Service_ID
          console.log("Licence Servicesssss", this.serviceService.Licence_Service_ID);
          this.serviceService.CustomerID = this.licenceService.list[0].CustomerID
          this.licenceData = this.licenceService.list[0];
          this.serviceService.reqorgg = this.licenceService.list[0].Created_By
          this.serviceService.licenceData = this.licenceData;
          this.SDP_ID = this.licenceData.SDP_ID;
          this.serviceService.currentsdpid = this.SDP_ID;
          this.Service_ID = this.licenceData.Service_ID;
          this.serviceService.Service_ID = this.licenceData.Service_ID;
          this.serviceService.Service_ID = this.SDP_ID;
          this.Licence_Service_ID = this.licenceData.Licence_Service_ID;
          this.AppCode = this.licenceData.Licence_Service_ID; //
          this.AppNo = this.licenceData.Application_No; //
          this.serviceService.appnoForRecord = this.licenceData.Application_No;
          this.serviceService.LicenceserviceID = this.Licence_Service_ID;
          console.log("licenceData", this.licenceData.Application_No);
          
          this.serviceService.ispicked = true
          this.orgassign = this.licenceService.list[0].Created_By
          this.serviceService.getOrganizationbyid(this.serviceService.CustomerID).subscribe(
            (response: any) => {
              this.orgDetails = response.procOrganization_Details[0];
              this.organizationData.emit(this.orgDetails);
              console.log(response.procOrganization_Details[0], "this.licenceData.CustomerID");
            },
            (error: any) => {
              console.error('Error fetching organization details:', error);
            }
          );
          console.log('this.serviceService.orgdata',this.serviceService.orgdata);
          
          
          console.log(this.serviceService , "this.licenceData.CustomerID")

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
  closeReviewDialog(): void {
    this.displayRivew = false;
  }
  getTaskRule(arg0: any) {
    throw new Error('Method not implemented.');
  }
  hideBackButton() {
    throw new Error('Method not implemented.');
  }
  getLookups() {
    throw new Error('Method not implemented.');
  }
    getRequiredDocs() {
      console.log('this.tskID',this.tskID);
      
    this.serviceService.getRequerdDocs(this.tskID).subscribe(
      (RequerdDocs) => {
        this.RequerdDocs = RequerdDocs;
console.log(this.RequerdDocs,'this.tskID');
  this.getAllDocument();
        // console.log('RequerdDocs', this.RequerdDocs);
      },
      (error) => {
        console.log("error");
      }
    );
  }
  GetPlot_Land_Grade_lookup() {
    throw new Error('Method not implemented.');
  }
  getLease_Stuts_Lookup() {
    throw new Error('Method not implemented.');
  }
}
type MimeExtension = {
  [key: string]: {
    extension: string;
    previewable: boolean;
  };
};
