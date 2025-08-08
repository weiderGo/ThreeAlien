export interface Page {
  pageId: number;
  pageCode: string;
  menuCode: string;
  tagCode: string;
  sort: number;
  isActive: boolean;
  creator: string;
  createDtm: Date;
  editor?: string;
  editDtm?: Date;
}

export interface PageCreateRequest {
  pageCode: string;
  menuCode: string;
  tagCode: string;
  sort?: number;
  isActive?: boolean;
  creator: string;
}

export interface PageUpdateRequest {
  pageId: number;
  pageCode?: string;
  menuCode?: string;
  tagCode?: string;
  sort?: number;
  isActive?: boolean;
  editor: string;
}
