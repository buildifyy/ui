export interface BasicInformation {
    readonly parent: string;
    readonly name: string;
    readonly externalId: string;
}

export interface Attribute {
    readonly name: string;
}
  
export interface CreateTemplateFormData {
    readonly basicInformation: BasicInformation;
    readonly attributes: Attribute[];
}