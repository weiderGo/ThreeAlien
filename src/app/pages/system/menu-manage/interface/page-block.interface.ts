export interface PageBlock {
  blockId: number;
  blockCode: string;
  pageCode: string;
  templateCode: string;
  isActive: boolean;
  sort: number;
  creator: string;
  createDtm: Date;
  editor?: string;
  editDtm?: Date;
}

export interface PageBlockCreateRequest {
  blockCode: string;
  pageCode: string;
  templateCode: string;
  isActive?: boolean;
  sort?: number;
  creator: string;
}

export interface PageBlockUpdateRequest {
  blockId: number;
  blockCode?: string;
  pageCode?: string;
  templateCode?: string;
  isActive?: boolean;
  sort?: number;
  editor: string;
}
