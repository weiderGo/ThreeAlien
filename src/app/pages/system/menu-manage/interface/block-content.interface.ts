export interface BlockContent {
  contentId: number;
  blockCode: string;
  contentText?: string;
  imageCode?: string;
  sort: number;
  creator: string;
  createDtm: Date;
  editor?: string;
  editDtm?: Date;
}

export interface BlockContentCreateRequest {
  blockCode: string;
  contentText?: string;
  imageCode?: string;
  sort?: number;
  creator: string;
}

export interface BlockContentUpdateRequest {
  contentId: number;
  blockCode?: string;
  contentText?: string;
  imageCode?: string;
  sort?: number;
  editor: string;
}
