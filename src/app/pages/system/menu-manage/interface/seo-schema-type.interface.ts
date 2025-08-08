export interface SeoSchemaType {
  schemaTypeId: number;
  schemaTypeCode: string;
  schemaName: string;
}

export interface SeoSchemaTypeCreateRequest {
  schemaTypeCode: string;
  schemaName: string;
}

export interface SeoSchemaTypeUpdateRequest {
  schemaTypeId: number;
  schemaTypeCode?: string;
  schemaName?: string;
}
