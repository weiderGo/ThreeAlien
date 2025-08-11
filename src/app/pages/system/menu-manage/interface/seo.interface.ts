export interface SeoConfig {
  seoCode: string;
  pageCode: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  ogImage?: string;
  seoTagName: string;
  seoCanonicalUrl?: string;
  schemaTypeCode: string;
  seoAuthor?: string;
  seoPublishDate?: Date;
  seoLastModified?: Date;
  enableBreadcrumb: boolean;
  enableFAQ: boolean;
  enableHowTo: boolean;
  creator: string;
  createDtm: Date;
  editor?: string;
  editDtm?: Date;
}

export interface SeoConfigCreateRequest {
  seoCode: string;
  pageCode: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  ogImage?: string;
  seoTagName: string;
  seoCanonicalUrl?: string;
  schemaTypeCode: string;
  seoAuthor?: string;
  seoPublishDate?: Date;
  seoLastModified?: Date;
  enableBreadcrumb?: boolean;
  enableFAQ?: boolean;
  enableHowTo?: boolean;
  creator: string;
}

export interface SeoConfigUpdateRequest {
  seoId: number;
  seoCode?: string;
  pageCode?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
  seoTagName?: string;
  seoCanonicalUrl?: string;
  schemaTypeCode?: string;
  seoAuthor?: string;
  seoPublishDate?: Date;
  seoLastModified?: Date;
  enableBreadcrumb?: boolean;
  enableFAQ?: boolean;
  enableHowTo?: boolean;
  editor: string;
}
