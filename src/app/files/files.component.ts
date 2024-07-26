import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ServiceComponent } from '../service/service.component';
import { ServiceServiceService } from '../service-service.service';
import { environment } from 'src/environments/environment.prod';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnChanges{
  @Output() updated = new EventEmitter();
  // @Input() RequiredDocs;
    @Input() AppNo: any;
    @Output() Upload: any;
    @Input() DocID: any;
    @Input() hide: any; 
     @Input() disabled: boolean = false;
     loading: boolean =false
    // RequiredDocs = [];
    File: any;
    uploading: boolean = false;
    language = 'english';
    constructor(public serviceService: ServiceServiceService, public serviceComponent: ServiceComponent,
      private sanitizer: DomSanitizer){

    }
    ngOnInit(): void {
      console.log(this.serviceService.RequiredDocs,'this.serviceService.RequiredDocs');
     }
    ngOnChanges() {
     
      
      this.serviceService.RequiredDocs = this.serviceComponent.RequerdDocs;
      console.log('this.RequiredDocs',this.serviceService.RequiredDocs);
   
      for (let i = 0; i < this.serviceService.RequiredDocs.length; i++) {
        console.log('this.RequiredDocs[i].description_en.indexOf(\'*\')', this.serviceService.RequiredDocs[i].description_en.indexOf('*'));
        if (this.serviceService.RequiredDocs[i].description_en.indexOf('*') !== -1) {
          this.serviceService.RequiredDocs[i].required = true;
        }
      }
      this.updated.emit({ docs: this.serviceService.RequiredDocs });
    }
    extractExtensionFromFileName(fileName: any) {
      if (fileName) {
        let fileNameSegment = (fileName as string).split('.');
        return `application/${fileNameSegment[fileNameSegment.length - 1]}`;
      }
      return '';
    }
    upload(event: any, RequiredDoc: any, fild: any) {
      this.loading = true; // Start loading
    
      this.Uploader(event.files[0], RequiredDoc, fild).then(() => {
        // Update the upload status in RequiredDocs
        for (let i = 0; i < this.serviceService.RequiredDocs.length; i++) {
          if (RequiredDoc.requirement_code === this.serviceService.RequiredDocs[i].requirement_code) {
            this.serviceService.RequiredDocs[i].uploded = 1;
          }
        }
        this.loading = false; // End loading
      }).catch(error => {
        console.error('Upload failed', error);
        this.loading = false; // End loading on error
      });
    }
    
    async Uploader(File: any, RequiredDoc: any, fild: any): Promise<void> {
      if (!File) {
        console.error('File is null or undefined');
        throw new Error('File is null or undefined');
      }
    
      let fullbase64: any;
      const reader = new FileReader();
      
      // Wrap the file reading in a Promise
      await new Promise<void>((resolve, reject) => {
        reader.readAsDataURL(File);
    
        reader.addEventListener('loadend', (e) => {
          const result = reader.result;
          if (!result) {
            reject(new Error('FileReader result is null'));
            return;
          }
          fullbase64 = result;
    
          // Extract the base64 content
          const base64Pattern = /^data:(.+);base64,(.*)$/;
          const matches = base64Pattern.exec(result as string);
    
          if (!matches) {
            reject(new Error('Failed to extract base64 content'));
            return;
          }
    
          const base64file = matches[2];
          const type = File.type !== '' ? File.type : this.extractExtensionFromFileName(File.name);
    
          const base64FileData = btoa(JSON.stringify({
            type,
            data: base64file
          }));
    
          // Perform the upload
          this.serviceService.saveFile(base64FileData, type, this.serviceService.licenceservice, RequiredDoc.requirement_code,
            'Start', RequiredDoc.description_en, this.serviceService.docid).subscribe(
            (message: any) => {
              if (message[0] || message[1] || message[2]) {
                RequiredDoc.File = this.sanitizer.bypassSecurityTrustResourceUrl(fullbase64);
                RequiredDoc.fileName = File.name;
                RequiredDoc.fileType = File.type;
                RequiredDoc.document_code = message[2];
                fild.clear();
                this.updated.emit({ docs: this.serviceService.RequiredDocs });
                resolve();
              } else {
                reject(new Error('Upload response contained empty messages'));
              }
            },
            error => reject(error)
          );
        });
    
        reader.addEventListener('error', (e) => {
          console.error('File reading failed', e);
          reject(e);
        });
      });
    }
    
    removeUpload(RequiredDoc: any) {
      this.serviceService.RemoveDoc(RequiredDoc.document_code).subscribe((message: any) => {
        //const toast = this.notificationsService.success('Sucess', message);
  
        for (let i = 0; i < this.serviceService.RequiredDocs.length; i++) {
          if (this.serviceService.RequiredDocs[i].requirement_code == RequiredDoc.requirement_code) {
            this.serviceService.RequiredDocs[i].File = '';
            this.serviceService.RequiredDocs[i].document_code = '';
          }
        }
        console.log('RequiredDocs', this.serviceService.RequiredDocs);
      }, (error: any) => {
        console.log('error');
       // const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
      });
    }
}
