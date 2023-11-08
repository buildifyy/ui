export interface InstanceMetaDataField {
  readonly id: string;
  readonly label: string;
  readonly infoText: string;
  readonly typeLabel: string;
  readonly type: "string" | "select" | "integer" | "float" | "bool";
  readonly isRequired: boolean;
  readonly isHidden: boolean;
  readonly dropdownValues: string[];
  readonly manualValue?: string;
  readonly metrics: InstanceMetaDataField[];
}

export interface InstanceMetaData {
  readonly fields: InstanceMetaDataField[];
}

export interface InstanceFormMetaData {
  readonly basicInformation: InstanceMetaData;
  readonly attributes: InstanceMetaData;
  readonly metrics: InstanceMetaData;
}
