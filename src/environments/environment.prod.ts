import { _UserName } from "./environment";

// @ts-ignore: Suppress implicit any error
export const Logo = window['Logo'];
export const environment = {
  production: true,
  // rootPath: window["rootPath"],
  // rootPathlocal: window["rootPathlocal"],
  // username:window['_UserName'],
  // rootpath2:window['rootpath2'],
  // rootpath3: window["rootpath3"],
  // subcity:window["subcity"],
  // lang:window["lang"],
  // phisicalPath: window["phisicalPath"],
  // imagepathclock: window["_imagepathclock"],
  // imagepath: window["_imagepath"],
  // Logo: window['Logo'],
  username: _UserName,
  phisicalPath: "./assets/i18n/",
  imageUrl: Logo+"/photo_2021-12-28_11-36-08.jpg",
  imageUrl2: Logo+"/disaster.jpg",
  imageUrl3: Logo+"/blood.jpg",
  imageUrl4: Logo+"/pro.jpg",
  imageUrl5: Logo+"/firstaid.jpg",
  imageUrl6: Logo+"/disaster.jpg",
  imageUrl7: Logo+"/volun.jpg",
  imageUrl8: Logo+"/pro.jpg",
  imageUrl9: Logo+"/prod.jpg",
  imageUrl10: Logo+"/avatar1.png",
};
