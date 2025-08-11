import { ImageFileInfo } from ".";

export interface BlockContent {
  contentText?: string;
  url?:string;
  imageFileInfo: ImageFileInfo[];  
}
