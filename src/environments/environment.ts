// Extend the Window interface
interface CustomWindow extends Window {
  _UserName: string;
  rootPath: string;
  rootPathlocal: string;
  rootpath2: string;
  rootpath3: string;
  subcity: string;
  lang: string;
  _imagepathclock: string;
  _imagepath: string;
  phisicalPath: string;
  Logo: string;
  formPath: string;
  appliction:string
}

// Cast window to the extended interface
const customWindow = window as unknown as CustomWindow;

// Use the properties with the correct types
export const Logo = customWindow.Logo;
export const rootPath = customWindow.rootPath;
export const rootpath3 = customWindow.rootpath3;
export const rootpath2 = customWindow.rootpath2;
export const _UserName = customWindow._UserName;
export const formPath = customWindow.formPath;
export const lang = customWindow.lang;
export const appliction =customWindow.appliction;

export const environment = {
  //0988776659
  //0945678945
  //org 0976338754
  // new 0955346789
  // new org 0934679080
  //ERCS_team_leader
  //ERCS_Info_mgr
  //0912346578
  //0988775533
  //0923678907
  //application
  production: false,
  _UserName:"0923678907",
 // phisicalPath: "/DesktopModules/MVC/DNNModule3/Views/Item/assets/assets/i18n/",
 phisicalPath: "./assets/i18n/",  
  imageUrl: Logo + "/photo_2021-12-28_11-36-08.jpg",
  imageUrl2: Logo + "/disaster.jpg",
  imageUrl3: Logo + "/blood.jpg",
  imageUrl4: Logo + "/pro.jpg",
  imageUrl5: Logo + "/firstaid.jpg",
  imageUrl6: Logo + "/disaster.jpg",
  imageUrl7: Logo + "/volun.jpg",
  imageUrl8: Logo + "/pro.jpg",
  imageUrl9: Logo + "/prod.jpg",
  imageUrl10: Logo + "/avatar1.png",
  rootPath: rootPath,
  rootpath3: rootpath3,
  rootpath2: rootpath2,
  formPath: formPath,
  Lang: lang,
  appliction: appliction,
  lang2:'10D04E8B-3361-E111-95D5-00E04C05559B'

};

// Ensure your HTML and Angular templates are correct
