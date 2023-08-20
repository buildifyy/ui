export interface InstanceMetaDataField {
  readonly label: string;
  readonly infoText: string;
  readonly type: "string" | "select" | "integer" | "float" | "bool";
  readonly isRequired: boolean;
  readonly isHidden: boolean;
}

export interface InstanceMetaData {
  readonly fields: InstanceMetaDataField[];
}

export interface InstanceFormMetaData {
  readonly basicInformation: InstanceMetaData;
  readonly attributes: InstanceMetaData;
}
