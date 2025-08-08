export interface Tag {
  tagId: number;
  tagCode: string;
  tagName: string;
  isActive: boolean;
  creator: string;
  createDtm: Date;
  editor?: string;
  editDtm?: Date;
}

export interface TagCreateRequest {
  tagCode: string;
  tagName: string;
  isActive?: boolean;
  creator: string;
}

export interface TagUpdateRequest {
  tagId: number;
  tagCode?: string;
  tagName?: string;
  isActive?: boolean;
  editor: string;
}
