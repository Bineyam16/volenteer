import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceServiceService {
  reqorg: any;
  ApplicationNo: any;
  RequiredDocs: any;
  taskID: any;
  task: any;
  ispicked: boolean = false;
  licenceservice: any;
  docid: any;
  todo: any;
  CustomerID: any;
  orgdata: any;
  reqorgg: any;
  flag: any;
  is_assigned: any = 1;
  Licence_Service_ID: any;
  actiontab: boolean = false;
  assigned_service: any;


  SubmitAR(AppCode: any, docID: any, todoID: any, ruleid: any) {
    return this.http.post(
      this.nextTaskAcceptOrRejectURl +
        "?ApplicationNo=" +
        AppCode +
        "&docid=" +
        docID +
        "&eid=00000000-0000-0000-0000-000000000000&isPending=false&todoid=" +
        todoID +
        "&userName=" +
        environment._UserName +
        "&status=C&taskruleid=" +
        ruleid,
      null
    );
  }
  licenceData: any;
  currentsdpid: any;
  Service_ID: any;
  appnoForRecord: any;
  cusst:any
  LicenceserviceID: any;
  checkassign: boolean = false
  isreview: boolean = false
  disablefins: any;
  activeTabIndices: number[] = [0];
  GetSuperviedUsers() {
    throw new Error('Method not implemented.');
  }
  getUserRole() {
    return 0;
  }
  private getTodandAppNoURL = environment.rootpath3 + "BPEL/TodandAppNo";
  private ViewAspNetUsersWorkInfoDetail = environment.rootpath3 + 'view/ViewAspNetUsersWorkInfoDetail';

  private nextTaskAcceptOrRejectURl =
  environment.rootpath3 + "BPEL/nextTaskAcceptOrReject";
  private updatelicence = environment.rootPath + "License_Service/procLicense_Service"
  private insertexpriance =environment.rootPath + "Previous_Volunteer_Experience/procPrevious_Volunteer_Experience"
private taskdropdown = environment.rootPath + "tasks/proctasks";
private saveFileLookUP = environment.rootpath3 + 'BPEL/SaveDocumentMaster';
private isvalidatedURL = environment.rootPath + "BPEL/isvalidated"; // URL to web api
private servicedropdwn =environment.rootPath + "services/procservices";
private user_98_97 =environment.rootPath + "User_98_97/procUser_98_97";
private View_user_98_97 =environment.rootPath + "view/View_User_98_97";
private woredaLookup =environment.rootPath + "Woreda_Lookup/procWoreda_Lookup/";
private service_group =environment.rootPath + "Service_Group/procService_Group";
private nextTaskCompleteURL = environment.rootpath3 + "BPEL/nextTaskComplete"; // URL to web api
private OrganizationRegistrationServices = environment.rootpath3 + "View_Topic_ERP"; // URL to web api
private SaveDataURL = environment.rootpath3 + "BPEL/SaveData"; 
private userRoleUrl = environment.rootpath3 + "BPEL/GetUserRole";

private cust =environment.rootPath + "Customer/procCustomer";
private view_for_vol = environment.rootPath + "view/View_FOR_VOL_ASSIGN"
private License_Service =environment.rootPath + "License_Service/procLicense_Service/";
private Backgroundstat =environment.rootPath + "Background_status/procBackground_status";
private Lang =environment.rootPath + "Language_skill/procLanguage_skill";
private Volunteership =environment.rootPath + "Volunteership/procVolunteership";
private Organization =environment.rootPath + "Organization_Detail/procOrganization_Detail";
private Organizationid =environment.rootPath + "Organization_Detail/procOrganization_Detail/";
private Request =environment.rootPath + "Request/procRequest";
private getTaskRuleURL = environment.rootpath3 + "BPEL/TaskRule"; // URL to web api
private contry = environment.rootPath + "Country/procCountry"
private  assinedlist =  environment.rootPath + "view/View_FOR_ASSIGN_TABLE/profession?"
private volist = environment.rootPath + "view/View_FOR_VOL_ASSIGN/profession?"
private zoneworweda = environment.rootPath + "view/View_ZONE_REGION_WOREDA/parent?"
private SaveDataObjURL = environment.rootpath3 + "BPEL/SaveDataObj"; // URL to web api
private MytasksUrl = environment.rootPath + "BPEL/GetlistofTodo";
private getRequerdURL = environment.rootpath3 + "BPEL/getRequrementDocumentOfTasks"; // URL to web api
private getAllDocumentURL = environment.rootpath3 + "BPEL/getAllDocument"; // URL to web api
private RemoveDocURL = environment.rootpath3 + 'BPEL/Remove_RequrementDocument';
private SaveNoteURL = environment.rootpath3 + "BPEL/Edit_postit_notes"; // URL to web api
private SendNoteURL = environment.rootpath3 + "BPEL/sendNot";
private orgform = environment.rootPath + "view/View_ORG";
private viewvolentir = environment.rootPath + "view/View_Volunteership"


private View_Volunteership =environment.rootPath + "view/View_Volunteership";


private License_ServiceURL = environment.rootpath3+  "License_Service";
  


  constructor(private http: HttpClient) { }
  getRequerdDocs(TaskID: any) {
    return this.http.get(this.getRequerdURL + "?TaskID=" + TaskID);
  }
  getallvol(){
    return this.http.get(this.view_for_vol)
  }
  insertvolexpriance(data: any){
    return this.http.post(this.insertexpriance, data)
  }
  getView_Volunteership() {
     return this.http.get(this.View_Volunteership
     );
   }
 
  getvolentirdata(){
    return this.http.get(this.viewvolentir)
  }
  public getUserRolee() {
    return this.http.get(
      this.userRoleUrl + "?userName=" + environment._UserName
    );
  }

  get_look_up_for(master: string) {
    return this.http.get(
      `${environment.rootpath3}BPEL/GetLookUp?DropGownName=${master}`
    );
  }
  getjsonform(){
    return this.http.get(this.orgform)
  }
  saveNotee(Msg: any, noteid: any) {
    return this.http.post(
      this.SaveNoteURL + "?Msg=" + Msg + "&postitid=" + noteid,
      null
    );
  }
  sendNotee(msg: any, AppNo: any, postit_note_code: any, todoid: any, orgid: any) {
    return this.http.post(
      this.SendNoteURL +
        "?meg=" +
        msg +
        "&Application_number=" +
        AppNo +
        "&todoid=" +
        todoid +
        "&postit_note_code=" +
        postit_note_code +
        "&orgid=" +
        orgid,
      null
    );
  }
  getzoneworeda(region: any){
    return this.http.get(this.zoneworweda +"parent=" + region)
  }
  getOrganizationbyid(id: any){
return this.http.get(this.Organizationid + id)
  }
  getAllDocument(ApplicationCode: any, DocID: any) {
    return this.http.get<any[]>(
      this.getAllDocumentURL +
      "?" +
      "ApplicationCode=" +
      ApplicationCode +
      "&DocID=" +
      DocID
    );
  }
  updateLicence(data: any){
    return this.http.put(this.updatelicence, data);
  }

  getMytasks(org: string) {
    return this.http.get(
      this.MytasksUrl +
      "?username=" +
      environment._UserName +
      "&orgid=" + org + "&lanid=" +
      environment.Lang +
      "&userroll" +
      "=00000000-0000-0000-0000-000000000000"
    );
  }
  RemoveDoc(DocCode: any) {
    return this.http.post(this.RemoveDocURL + '?currentUserId=' + environment._UserName
      + '&document_code=' +
      DocCode, null);
  }
  saveFile(DocData:any, FileType :any, ApplicationNo: any, RequrementID:any, TaskType:any, Requrement:any, DocID:any) {
    // console.log('File', File);



    return this.http.post(this.saveFileLookUP, {
      TaskType,
      ApplicationNo,
      DocData,
      uid: environment._UserName,
      FileType,
      RequrementID,
      Requrement,
      DocID,
    });
  }
  getvolist(Is_assigned: any ,proff: any, gender: any, region:any){
    return this.http.get(this.volist   + "Is_assigned="+ Is_assigned + "&profession="+ proff +"&gender=" + gender +"&stateRegion=" + region)
  }  getViewAspNetUsersWorkInfoDetail(User_ID: any) { 
    User_ID = this.removeSlash(User_ID);
    return this.http.get<any>(this.ViewAspNetUsersWorkInfoDetail + '/' + User_ID);
  }

  removeSlash(string: string | null) {
    if (string == null) return;
    return string.replace(/\//g, "%2F");
  }

  getTodandAppNo(AppNo: string) {
    return this.http.get<any[]>(
      this.getTodandAppNoURL + "?" + "ApplicationNo=" + AppNo
    );
  }
  getvolistass(Is_assigned: any, Assined_to: any,){
    return this.http.get(this.assinedlist + "Is_assigned=" + Is_assigned +"&Assined_to=" + Assined_to)
  }
  saveFormObj(ApplicationCode: any, serviceId: any, taskid:any, orgid: any, json: any, docid: any, todoID: any) {
    let body = {
      ApplicationCode,
      UserName: environment._UserName,
      docid,
      json,
      orgid,
      serviceId,
      taskid,
      todoID,
    };

    return this.http.post(this.SaveDataObjURL, body);
  }
  getcontry(){
    return this.http.get(this.contry)
  }
  getFormDataa(formcode: any, taskLevel:any): Observable<FormData> {
    if (!environment.production) {
      return this.http.get<any>(environment.formPath + formcode + ".json");
    } else {
      if (taskLevel != 1) {
        return this.http.get<any>(environment.formPath + formcode + ".json");
      } else {
        return this.http.get<any>(environment.formPath + formcode + ".json");
      }
    }
  }
  getTaskRule(tasksId: string) {
    return this.http.post(
      this.getTaskRuleURL +
        "?" +
        "taskid=" +
        tasksId +
        "&LangID=10D04E8B-3361-E111-95D5-00E04C05559B",
      null
    );
  }

  getOrganizationRegisterService(){
return this.http.get(this.OrganizationRegistrationServices)
  }
  getcust(_username: any) {
    return this.http.get(this.cust+'/'+_username);
  }
  getBackgroundstat() {
    return this.http.get(this.Backgroundstat);
  }
  getLicenseService(App_Number:any) {
    return this.http.get(this.License_Service+App_Number);
  }
  isvalidated(todoid:any, taskid:any, Plotid:any, ProperyID:any, DocID:any) {
    return this.http.get(
      this.isvalidatedURL +
        "?Username=" +
        environment._UserName +
        "&todoid=" +
        todoid +
        "&taskid=" +
        taskid +
        "&Plotid=" +
        Plotid +
        "&ProperyID=" +
        ProperyID +
        "&DocID=" +
        DocID
    );
  }
  getAll(AppNo:any) {
    return this.http.get<any[]>(
      this.License_ServiceURL +
        "?" +
        "sortOrder=test&currentFilter=" +
        AppNo +
        "&searchString&pageIndex&pageSize"
    );
  }
  getBackgroundstatById(id:any) {
    console.log('this.custid2',id);
    
    return this.http.get(this.Backgroundstat+'/'+id);
  }
  update_data(data: any) {
    return this.http.put(this.cust,
      data
    );
  }
  getFormData(formcode:any) {
    if (!environment.production) {
      return this.http.get<any>(environment.formPath + formcode + ".json");
    } else {
      return this.http.get<any>(environment.formPath + formcode + ".json");
    }
  }
  insertBackstat_data(data: any) {
    return this.http.post(this.Backgroundstat,
      data
    );
  }
  insertLang(data: any) {
    return this.http.post(this.Lang,
      data
    );
  }
  insertVolunteer(data: any) {
    return this.http.post(this.Volunteership,
      data
    );
  }
  insertOrganization(data: any) {
    return this.http.post(this.Organization,
      data
    );
  }
  insertRequest(data: any) {
    return this.http.post(this.Request,
      data
    );
  }
  updateRequest(data: any) {
    return this.http.put(this.Request,
      data
    );
  }
  getRequestById(data: any) {
    return this.http.get(this.Request+'/'+data
    );
  }
  getallre(){
    return this.http.get(this.Request)
  }
  updateOrganization(data: any) {
    return this.http.put(this.Organization,
      data
    );
  }
  getOrganizationById(data: any) {
    return this.http.get(this.Organization+'/'+
      data
    );
  }
  deletetVolunteer(id: any) {
    return this.http.delete(this.Volunteership+'/'+
      id
    );
  }
  updateVolunteer(data: any) {
    return this.http.put(this.Volunteership,data
    );
  }
  getVolunteer() {
    return this.http.get(this.Volunteership
    );
  }
  getland(){
    return this.http.get(this.Lang)
  }
  getlangbycustid(id: any){
    return this.http.get(this.Lang + '/'+ id)
  }
  updateBackstat_data(data: any) {
    return this.http.put(this.Backgroundstat,
      data
    );
  }
  sendNote(msg:any, AppNo:any, todoid:any, orgid:any) {
    return this.http.post(
      `${environment.rootpath2}sendNot?meg=${msg}&Application_number=${AppNo}&todoid=${todoid}&orgid=${orgid}`,
      null
    );
  }
  saveFormm(ApplicationCode:any, serviceId:any, taskid:any, orgid:any, json:any, docid:any, todoID:any) {
    // taskid = "0095300b-ffa8-4b74-b6e4-e4b984b85a31";
    //serviceId = "4c45e330-40a1-46d3-83ee-443eace0faf6";
    //orgid="df9d76cd-c5fe-49f3-8984-88b97985ff03";
    return this.http.post(
      this.SaveDataURL +
        "?ApplicationCode=" +
        ApplicationCode +
        "&serviceId=" +
        serviceId +
        "&taskid=" +
        taskid +
        "&orgid=" +
        orgid +
        "&UserName=" +
        environment._UserName +
        "&json=" +
        json +
        "&docid=" +
        docid +
        "&todoID=" +
        todoID,

      null
    );
  }
  Submit(AppCode:any, docID:any, todoID:any, ruleid:any) {
    return this.http.post(
      this.nextTaskCompleteURL +
        "?ApplicationNo=" +
        AppCode +
        "&docid=" +
        docID +
        "&todoid=" +
        todoID +
        "&userName=" +
        environment._UserName +
        "&status=C&Taskruleid=" +
        ruleid +
        "&ispending=false",
      null
    );
  }
  DeleteNote(ApplicationNo:any, noteid:any) {
    return this.http.post(
      `${environment.rootpath2}Delete_postit_notes?Application_number=${ApplicationNo}&postitid=${noteid}`,
      null
    );
  }

  addNote(ApplicationNumber:any,todo: any, Msg:any, docid:any) {
    return this.http.post(
      `${environment.rootpath2}Set_postit_notes?Application_number=${ApplicationNumber}&uid=${todo}&Msg=${Msg}&docid=${docid}`,
      null
    );
  }

  saveNote(msg:any, noteid:any, docid:any) {
    return this.http.post(
      `${environment.rootpath2}Edit_postit_notes?msg=${msg}&postitid=${noteid}&docid=${docid}`,
      null
    );
  }

  GetNote(ApplicationNo:any) {
    return this.http.post(
      `${environment.rootpath2}Get_postit_notes?Application_number=${ApplicationNo}`,
      null
    );
  }

}

