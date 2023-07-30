export interface BasicInformation {
    parent: string;
    name: string;
    externalId: string;
}
  
export interface CreateTemplateFormData {
    basicInformation: BasicInformation;
}