export interface SeoFaqItem {
  faqId: number;
  seoCode: string;
  question: string;
  answer: string;
  sort: number;
}

export interface SeoFaqItemCreateRequest {
  seoCode: string;
  question: string;
  answer: string;
  sort?: number;
}

export interface SeoFaqItemUpdateRequest {
  faqId: number;
  seoCode?: string;
  question?: string;
  answer?: string;
  sort?: number;
}
