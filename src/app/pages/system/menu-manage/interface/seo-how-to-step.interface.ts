export interface SeoHowToStep {
  stepId: number;
  seoCode: string;
  stepText: string;
  sort: number;
}

export interface SeoHowToStepCreateRequest {
  seoCode: string;
  stepText: string;
  sort?: number;
}

export interface SeoHowToStepUpdateRequest {
  stepId: number;
  seoCode?: string;
  stepText?: string;
  sort?: number;
}
