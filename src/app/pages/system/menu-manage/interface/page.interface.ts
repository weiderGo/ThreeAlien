import { PageBlock, SeoConfig, TagModel } from ".";

export interface Page {
  pageCode: string;
  pageBlockDataList: PageBlock[];
  tagDataList: TagModel[];
  seoConfig: SeoConfig;
  sort: number;
  isActive: boolean;
}
